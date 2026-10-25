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
    const role = searchParams.get('role'); // 'farmer' | 'owner' | 'driver' | 'admin'

    const supabase = getSupabaseAdmin();

    // We need multiple joins: equipment (+ its owner), renter user, driver user
    // Supabase relation embedding handles this via foreign-key names
    let q = supabase
      .from('bookings')
      .select(`
        booking_id,
        renter_id,
        equipment_id,
        driver_id,
        start_date,
        end_date,
        total_cost,
        status,
        created_at,
        equipment!fk_booking_equipment (
          equipment_id,
          model_name,
          daily_rate,
          status,
          owner_id,
          users!fk_equipment_owner ( full_name )
        ),
        renter:users!fk_booking_renter ( full_name, phone, email ),
        driver:users!fk_booking_driver ( full_name, phone )
      `)
      .order('booking_id', { ascending: false });

    // Role-based filtering
    if (role === 'farmer' || session.role_type === 'FARMER') {
      q = q.eq('renter_id', session.user_id);
    } else if (role === 'driver' || session.role_type === 'DRIVER') {
      q = q.eq('driver_id', session.user_id);
    } else if (role === 'owner' || session.role_type === 'OWNER') {
      // For owner filtering we need to filter by equipment.owner_id
      // Supabase can filter on joined columns with the !inner modifier
      q = supabase
        .from('bookings')
        .select(`
          booking_id,
          renter_id,
          equipment_id,
          driver_id,
          start_date,
          end_date,
          total_cost,
          status,
          created_at,
          equipment!inner (
            equipment_id,
            model_name,
            daily_rate,
            status,
            owner_id,
            users!fk_equipment_owner ( full_name )
          ),
          renter:users!fk_booking_renter ( full_name, phone, email ),
          driver:users!fk_booking_driver ( full_name, phone )
        `)
        .eq('equipment.owner_id', session.user_id)
        .order('booking_id', { ascending: false });
    }
    // ADMIN sees all — no additional filter

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const bookings = (rows || []).map((r: Record<string, unknown>) => {
      const equip = r.equipment as Record<string, unknown> | null;
      const renter = r.renter as Record<string, unknown> | null;
      const driver = r.driver as Record<string, unknown> | null;
      const equipOwner = equip?.users as Record<string, unknown> | null;

      return {
        booking_id: r.booking_id,
        renter_id: r.renter_id,
        equipment_id: r.equipment_id,
        driver_id: r.driver_id,
        start_date: r.start_date,
        end_date: r.end_date,
        total_cost: Number(r.total_cost),
        status: r.status,
        created_at: r.created_at,
        equipment: equip
          ? {
              model_name: equip.model_name,
              daily_rate: Number(equip.daily_rate),
              status: equip.status,
            }
          : null,
        users: renter
          ? {
              full_name: renter.full_name,
              phone: renter.phone,
              email: renter.email,
            }
          : null,
        driver: driver?.full_name
          ? { full_name: driver.full_name, phone: driver.phone }
          : null,
        owner: {
          owner_id: equip?.owner_id,
          full_name: equipOwner?.full_name || null,
        },
      };
    });

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
    const { equipment_id, driver_id, start_date, end_date } = body;

    if (!equipment_id || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Equipment ID, start date, and end date are required.' },
        { status: 400 }
      );
    }

    const equipId = Number(equipment_id);
    const driverId = driver_id ? Number(driver_id) : null;

    if (new Date(end_date) < new Date(start_date)) {
      return NextResponse.json(
        { error: 'Rental end date cannot precede start date.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Try calling the create_booking RPC function first (if it exists in Supabase)
    const { data: rpcResult, error: rpcError } = await supabase.rpc('create_booking', {
      p_renter_id: session.user_id,
      p_equipment_id: equipId,
      p_driver_id: driverId ?? 0,
      p_start_date: start_date,
      p_end_date: end_date,
    });

    if (!rpcError && rpcResult) {
      const result = typeof rpcResult === 'string' ? JSON.parse(rpcResult) : rpcResult;

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 409 });
      }

      return NextResponse.json({
        success: true,
        booking_id: result.booking_id,
        message: result.message || 'Booking created successfully.',
      });
    }

    // Fallback: manual insert if the RPC function doesn't exist
    // 1. Get daily rate from equipment
    const { data: equipRow, error: equipErr } = await supabase
      .from('equipment')
      .select('daily_rate, status')
      .eq('equipment_id', equipId)
      .single();

    if (equipErr || !equipRow) {
      return NextResponse.json({ error: 'Equipment not found.' }, { status: 404 });
    }

    if (equipRow.status === 'MAINTENANCE') {
      return NextResponse.json(
        { error: 'Equipment is under maintenance and cannot be booked.' },
        { status: 409 }
      );
    }

    const dailyRate = Number(equipRow.daily_rate);
    const rentalDays =
      Math.ceil(
        (new Date(end_date).getTime() - new Date(start_date).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    const computedCost = dailyRate * rentalDays;

    // 2. Check for overlapping bookings
    const { data: conflicts } = await supabase
      .from('bookings')
      .select('booking_id')
      .eq('equipment_id', equipId)
      .in('status', ['PENDING', 'CONFIRMED'])
      .lte('start_date', end_date)
      .gte('end_date', start_date);

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'Equipment is already booked for these selected dates.' },
        { status: 409 }
      );
    }

    // 3. Insert booking
    const { data: newBooking, error: insertErr } = await supabase
      .from('bookings')
      .insert({
        renter_id: session.user_id,
        equipment_id: equipId,
        driver_id: driverId,
        start_date,
        end_date,
        total_cost: computedCost,
        status: 'PENDING',
      })
      .select('booking_id')
      .single();

    if (insertErr) throw new Error(insertErr.message);

    // 4. Insert matching pending payment
    await supabase.from('payments').insert({
      booking_id: newBooking!.booking_id,
      amount: computedCost,
      payment_method: 'UPI',
      payment_status: 'PENDING',
    });

    return NextResponse.json({
      success: true,
      booking_id: newBooking!.booking_id,
      message: 'Booking created successfully.',
    });
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

    const supabase = getSupabaseAdmin();
    const bookingIdNum = Number(booking_id);

    // Update booking status (the DB trigger will handle equipment status automatically)
    const { error: updateErr } = await supabase
      .from('bookings')
      .update({ status })
      .eq('booking_id', bookingIdNum);

    if (updateErr) throw new Error(updateErr.message);

    // Safety net: if the trigger isn't installed, manually sync equipment status
    // First get the equipment_id for this booking
    const { data: bookingRow } = await supabase
      .from('bookings')
      .select('equipment_id')
      .eq('booking_id', bookingIdNum)
      .single();

    if (bookingRow) {
      if (status === 'CONFIRMED') {
        await supabase
          .from('equipment')
          .update({ status: 'RENTED' })
          .eq('equipment_id', bookingRow.equipment_id);
      } else if (status === 'COMPLETED' || status === 'CANCELLED') {
        // Only revert if the equipment isn't under MAINTENANCE
        await supabase
          .from('equipment')
          .update({ status: 'AVAILABLE' })
          .eq('equipment_id', bookingRow.equipment_id)
          .neq('status', 'MAINTENANCE');
      }
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
