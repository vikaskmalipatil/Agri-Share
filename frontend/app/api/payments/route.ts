import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

interface PaymentRow extends RowDataPacket {
  payment_id: number;
  booking_id: number;
  amount: string | number;
  payment_method: string;
  payment_status: string;
  transaction_time: string;
  renter_id: number;
  equipment_id: number;
  model_name: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    const conditions: string[] = [];
    const params: (string | number | boolean | null)[] = [];

    if (bookingId) {
      conditions.push('p.booking_id = ?');
      params.push(Number(bookingId));
    } else if (session.role_type === 'FARMER') {
      conditions.push('b.renter_id = ?');
      params.push(session.user_id);
    } else if (session.role_type === 'OWNER') {
      conditions.push('e.owner_id = ?');
      params.push(session.user_id);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        p.payment_id,
        p.booking_id,
        p.amount,
        p.payment_method,
        p.payment_status,
        p.transaction_time,
        b.renter_id,
        b.equipment_id,
        e.model_name
      FROM payments p
      JOIN bookings b ON p.booking_id = b.booking_id
      JOIN equipment e ON b.equipment_id = e.equipment_id
      ${whereClause}
      ORDER BY p.payment_id DESC
    `;

    const rows = await query<PaymentRow[]>(sql, params);

    const payments = rows.map((r) => ({
      payment_id: r.payment_id,
      booking_id: r.booking_id,
      amount: Number(r.amount),
      payment_method: r.payment_method,
      payment_status: r.payment_status,
      transaction_time: r.transaction_time,
      model_name: r.model_name,
    }));

    return NextResponse.json({ payments });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch payment records.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = await request.json();
    const { booking_id, amount, payment_method } = body;

    if (!booking_id || !amount) {
      return NextResponse.json(
        { error: 'Booking ID and amount are required.' },
        { status: 400 }
      );
    }

    const method = ['CARD', 'UPI', 'CASH', 'NET_BANKING'].includes(payment_method)
      ? payment_method
      : 'UPI';

    const result = await query<ResultSetHeader>(
      `INSERT INTO payments (booking_id, amount, payment_method, payment_status)
       VALUES (?, ?, ?, 'SUCCESSFUL')`,
      [Number(booking_id), Number(amount), method]
    );

    return NextResponse.json({
      success: true,
      payment_id: result.insertId,
      message: 'Payment recorded successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to process payment.' },
      { status: 500 }
    );
  }
}
