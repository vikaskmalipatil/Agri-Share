import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role_type !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator access required.' },
        { status: 403 }
      );
    }

    // 1. All Users
    const users = await query<RowDataPacket[]>(
      'SELECT user_id, full_name, email, role_type, phone, address, created_at FROM users ORDER BY user_id DESC'
    );

    // 2. All Equipment
    const equipmentRows = await query<RowDataPacket[]>(
      `SELECT
        e.equipment_id,
        e.owner_id,
        e.type_id,
        e.model_name,
        e.daily_rate,
        e.status,
        e.created_at,
        t.category_name,
        u.full_name AS owner_name
       FROM equipment e
       JOIN equipment_types t ON e.type_id = t.type_id
       JOIN users u ON e.owner_id = u.user_id
       ORDER BY e.equipment_id DESC`
    );

    const equipment = equipmentRows.map((r) => ({
      equipment_id: r.equipment_id,
      owner_id: r.owner_id,
      type_id: r.type_id,
      model_name: r.model_name,
      daily_rate: Number(r.daily_rate),
      status: r.status,
      created_at: r.created_at,
      equipment_types: { category_name: r.category_name },
      users: { full_name: r.owner_name },
    }));

    // 3. All Bookings
    const bookingsRows = await query<RowDataPacket[]>(
      `SELECT
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
        renter.full_name AS renter_name,
        renter.email AS renter_email
       FROM bookings b
       JOIN equipment e ON b.equipment_id = e.equipment_id
       JOIN users renter ON b.renter_id = renter.user_id
       ORDER BY b.booking_id DESC`
    );

    const bookings = bookingsRows.map((r) => ({
      booking_id: r.booking_id,
      renter_id: r.renter_id,
      equipment_id: r.equipment_id,
      driver_id: r.driver_id,
      start_date: r.start_date,
      end_date: r.end_date,
      total_cost: Number(r.total_cost),
      status: r.status,
      created_at: r.created_at,
      equipment: { model_name: r.model_name },
      users: { full_name: r.renter_name, email: r.renter_email },
    }));

    // 4. All Payments
    const paymentsRows = await query<RowDataPacket[]>(
      'SELECT payment_id, booking_id, amount, payment_method, payment_status, transaction_time FROM payments ORDER BY payment_id DESC'
    );

    const payments = paymentsRows.map((p) => ({
      ...p,
      amount: Number(p.amount),
    }));

    // 5. All Reviews
    const reviews = await query<RowDataPacket[]>(
      `SELECT
        r.review_id,
        r.booking_id,
        r.reviewer_id,
        r.rating,
        r.comments,
        r.created_at,
        u.full_name AS reviewer_name
       FROM reviews r
       JOIN users u ON r.reviewer_id = u.user_id
       ORDER BY r.review_id DESC`
    );

    return NextResponse.json({
      currentUser: session,
      users,
      equipment,
      bookings,
      payments,
      reviews,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch admin overview.' },
      { status: 500 }
    );
  }
}
