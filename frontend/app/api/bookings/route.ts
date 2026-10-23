import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

interface BookingRow extends RowDataPacket {
  booking_id: number;
  renter_id: number;
  equipment_id: number;
  driver_id: number | null;
  start_date: string;
  end_date: string;
  total_cost: string | number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  model_name: string;
  daily_rate: string | number;
  equipment_status: string;
  renter_name: string;
  renter_phone: string | null;
  renter_email: string;
  driver_name: string | null;
  driver_phone: string | null;
  owner_id: number;
  owner_name: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // 'farmer' | 'owner' | 'driver' | 'admin'

    const conditions: string[] = [];
    const params: (string | number | boolean | null)[] = [];

    if (role === 'farmer' || session.role_type === 'FARMER') {
      conditions.push('b.renter_id = ?');
      params.push(session.user_id);
    } else if (role === 'owner' || session.role_type === 'OWNER') {
      conditions.push('e.owner_id = ?');
      params.push(session.user_id);
    } else if (role === 'driver' || session.role_type === 'DRIVER') {
      conditions.push('b.driver_id = ?');
      params.push(session.user_id);
    } else if (session.role_type === 'ADMIN') {
      // Admin can see all bookings
    } else {
      conditions.push('b.renter_id = ?');
      params.push(session.user_id);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        b.booking_id,
        b.renter_id,
        b.equipment_id,
        b.driver_id,
        b.start_date,
        b.end_date,
        b.total_cost,
        b.status,
        b.created_at,
        e.model_name,
        e.daily_rate,
        e.status AS equipment_status,
        e.owner_id,
        renter.full_name AS renter_name,
        renter.phone AS renter_phone,
        renter.email AS renter_email,
        driver.full_name AS driver_name,
        driver.phone AS driver_phone,
        owner.full_name AS owner_name
      FROM bookings b
      JOIN equipment e ON b.equipment_id = e.equipment_id
      JOIN users renter ON b.renter_id = renter.user_id
      JOIN users owner ON e.owner_id = owner.user_id
      LEFT JOIN users driver ON b.driver_id = driver.user_id
      ${whereClause}
      ORDER BY b.booking_id DESC
    `;

    const rows = await query<BookingRow[]>(sql, params);

    const bookings = rows.map((r) => ({
      booking_id: r.booking_id,
      renter_id: r.renter_id,
      equipment_id: r.equipment_id,
      driver_id: r.driver_id,
      start_date: r.start_date,
      end_date: r.end_date,
      total_cost: Number(r.total_cost),
      status: r.status,
      created_at: r.created_at,
      equipment: {
        model_name: r.model_name,
        daily_rate: Number(r.daily_rate),
        status: r.equipment_status,
      },
      users: {
        full_name: r.renter_name,
        phone: r.renter_phone,
        email: r.renter_email,
      },
      driver: r.driver_name
        ? {
            full_name: r.driver_name,
            phone: r.driver_phone,
          }
        : null,
      owner: {
        owner_id: r.owner_id,
        full_name: r.owner_name,
      },
    }));

    return NextResponse.json({ bookings });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch bookings.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to create a rental booking.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { equipment_id, driver_id, start_date, end_date, total_cost } = body;

    if (!equipment_id || !start_date || !end_date || total_cost === undefined) {
      return NextResponse.json(
        { error: 'Equipment ID, start date, end date, and total cost are required.' },
        { status: 400 }
      );
    }

    const equipId = Number(equipment_id);
    const driverId = driver_id ? Number(driver_id) : null;
    const costNum = Number(total_cost);

    if (new Date(end_date) < new Date(start_date)) {
      return NextResponse.json(
        { error: 'Rental end date cannot precede start date.' },
        { status: 400 }
      );
    }

    // Try executing stored procedure create_booking_safe
    try {
      await query('SET @out_bid = NULL, @out_code = NULL, @out_msg = NULL');
      await query(
        'CALL create_booking_safe(?, ?, ?, ?, ?, ?, @out_bid, @out_code, @out_msg)',
        [session.user_id, equipId, driverId, start_date, end_date, costNum]
      );
      const outRows = await query<RowDataPacket[]>(
        'SELECT @out_bid AS booking_id, @out_code AS status_code, @out_msg AS status_message'
      );

      if (outRows.length > 0 && outRows[0].booking_id) {
        return NextResponse.json({
          success: true,
          booking_id: outRows[0].booking_id,
          message: outRows[0].status_message || 'Booking created successfully.',
        });
      } else if (outRows.length > 0 && outRows[0].status_code >= 400) {
        return NextResponse.json(
          { error: outRows[0].status_message || 'Booking conflict or error.' },
          { status: outRows[0].status_code }
        );
      }
    } catch {
      // If stored procedure is not yet created, execute direct safe transaction
      const conflicts = await query<RowDataPacket[]>(
        `SELECT booking_id FROM bookings
         WHERE equipment_id = ?
           AND status IN ('PENDING', 'CONFIRMED')
           AND NOT (? < start_date OR ? > end_date)`,
        [equipId, end_date, start_date]
      );

      if (conflicts.length > 0) {
        return NextResponse.json(
          { error: 'Equipment is already booked for these selected dates.' },
          { status: 409 }
        );
      }

      const insertRes = await query<ResultSetHeader>(
        `INSERT INTO bookings (renter_id, equipment_id, driver_id, start_date, end_date, total_cost, status)
         VALUES (?, ?, ?, ?, ?, ?, 'PENDING')`,
        [session.user_id, equipId, driverId, start_date, end_date, costNum]
      );

      const bookingId = insertRes.insertId;

      // Also create pending payment
      await query(
        `INSERT INTO payments (booking_id, amount, payment_method, payment_status)
         VALUES (?, ?, 'UPI', 'PENDING')`,
        [bookingId, costNum]
      );

      return NextResponse.json({
        success: true,
        booking_id: bookingId,
        message: 'Booking created successfully.',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to create booking.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = await request.json();
    const { booking_id, status } = body;

    if (!booking_id || !status) {
      return NextResponse.json(
        { error: 'Booking ID and status are required.' },
        { status: 400 }
      );
    }

    if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid booking status.' }, { status: 400 });
    }

    await query<ResultSetHeader>(
      'UPDATE bookings SET status = ? WHERE booking_id = ?',
      [status, Number(booking_id)]
    );

    // If trigger did not automatically update equipment status, ensure consistency:
    if (status === 'CONFIRMED') {
      await query(
        `UPDATE equipment e
         JOIN bookings b ON e.equipment_id = b.equipment_id
         SET e.status = 'RENTED'
         WHERE b.booking_id = ?`,
        [Number(booking_id)]
      );
    } else if (status === 'COMPLETED' || status === 'CANCELLED') {
      await query(
        `UPDATE equipment e
         JOIN bookings b ON e.equipment_id = b.equipment_id
         SET e.status = 'AVAILABLE'
         WHERE b.booking_id = ? AND e.status <> 'MAINTENANCE'`,
        [Number(booking_id)]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Booking #${booking_id} status updated to ${status}.`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to update booking status.' },
      { status: 500 }
    );
  }
}
