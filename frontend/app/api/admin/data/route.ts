import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role_type !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator access required.' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();

    // 1. All Users
    const { data: users, error: usersErr } = await supabase
      .from('users')
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .order('user_id', { ascending: false });

    if (usersErr) throw new Error(usersErr.message);

    // 2. All Equipment with category + owner name
    const { data: equipRows, error: equipErr } = await supabase
      .from('equipment')
      .select(`
        equipment_id,
        owner_id,
        type_id,
        model_name,
        daily_rate,
        status,
        equipment_types ( category_name ),
        users!fk_equipment_owner ( full_name )
      `)
      .order('equipment_id', { ascending: false });

    if (equipErr) throw new Error(equipErr.message);

    const equipment = (equipRows || []).map((r: Record<string, unknown>) => {
      const eqType = r.equipment_types as Record<string, unknown> | null;
      const owner = r.users as Record<string, unknown> | null;
      return {
        equipment_id: r.equipment_id,
        owner_id: r.owner_id,
        type_id: r.type_id,
        model_name: r.model_name,
        daily_rate: Number(r.daily_rate),
        status: r.status,
        equipment_types: { category_name: eqType?.category_name || null },
        users: { full_name: owner?.full_name || null },
      };
    });

    // 3. All Bookings with equipment name + renter
    const { data: bookingsRows, error: bookingsErr } = await supabase
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
        equipment!fk_booking_equipment ( model_name ),
        renter:users!fk_booking_renter ( full_name, email )
      `)
      .order('booking_id', { ascending: false });

    if (bookingsErr) throw new Error(bookingsErr.message);

    const bookings = (bookingsRows || []).map((r: Record<string, unknown>) => {
      const equip = r.equipment as Record<string, unknown> | null;
      const renter = r.renter as Record<string, unknown> | null;
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
        equipment: { model_name: equip?.model_name || null },
        users: {
          full_name: renter?.full_name || null,
          email: renter?.email || null,
        },
      };
    });

    // 4. All Payments
    const { data: paymentsRows, error: paymentsErr } = await supabase
      .from('payments')
      .select('payment_id, booking_id, amount, payment_method, payment_status, transaction_time')
      .order('payment_id', { ascending: false });

    if (paymentsErr) throw new Error(paymentsErr.message);

    const payments = (paymentsRows || []).map((p: Record<string, unknown>) => ({
      ...p,
      amount: Number(p.amount),
    }));

    // 5. All Reviews with reviewer name
    const { data: reviews, error: reviewsErr } = await supabase
      .from('reviews')
      .select(`
        review_id,
        booking_id,
        reviewer_id,
        rating,
        comments,
        created_at,
        users!fk_review_reviewer ( full_name )
      `)
      .order('review_id', { ascending: false });

    if (reviewsErr) throw new Error(reviewsErr.message);

    const formattedReviews = (reviews || []).map((r: Record<string, unknown>) => {
      const reviewer = r.users as Record<string, unknown> | null;
      return {
        review_id: r.review_id,
        booking_id: r.booking_id,
        reviewer_id: r.reviewer_id,
        rating: r.rating,
        comments: r.comments,
        created_at: r.created_at,
        reviewer_name: reviewer?.full_name || null,
      };
    });

    return NextResponse.json({
      currentUser: session,
      users,
      equipment,
      bookings,
      payments,
      reviews: formattedReviews,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch admin overview.' },
      { status: 500 }
    );
  }
}
