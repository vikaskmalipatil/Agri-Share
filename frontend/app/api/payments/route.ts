import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    const supabase = getSupabaseAdmin();

    if (bookingId) {
      // Filter by specific booking
      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .eq('booking_id', Number(bookingId))
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    }

    // Role-based filtering
    if (session.role_type === 'FARMER') {
      // Get farmer's booking IDs first
      const { data: farmerBookings } = await supabase
        .from('bookings')
        .select('booking_id')
        .eq('renter_id', session.user_id);

      const bookingIds = (farmerBookings || []).map(
        (b: Record<string, unknown>) => b.booking_id as number
      );

      if (bookingIds.length === 0) {
        return NextResponse.json({ payments: [] });
      }

      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .in('booking_id', bookingIds)
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    } else if (session.role_type === 'OWNER') {
      // Get owner's equipment IDs, then bookings, then payments
      const { data: ownerEquip } = await supabase
        .from('equipment')
        .select('equipment_id')
        .eq('owner_id', session.user_id);

      const equipIds = (ownerEquip || []).map(
        (e: Record<string, unknown>) => e.equipment_id as number
      );

      if (equipIds.length === 0) {
        return NextResponse.json({ payments: [] });
      }

      const { data: ownerBookings } = await supabase
        .from('bookings')
        .select('booking_id')
        .in('equipment_id', equipIds);

      const bookingIds = (ownerBookings || []).map(
        (b: Record<string, unknown>) => b.booking_id as number
      );

      if (bookingIds.length === 0) {
        return NextResponse.json({ payments: [] });
      }

      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .in('booking_id', bookingIds)
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    } else {
      // ADMIN or others: all payments
      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    }
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

    const supabase = getSupabaseAdmin();

    const { data: newPayment, error } = await supabase
      .from('payments')
      .insert({
        booking_id: Number(booking_id),
        amount: Number(amount),
        payment_method: method,
        payment_status: 'SUCCESSFUL',
      })
      .select('payment_id')
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      payment_id: newPayment?.payment_id,
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
