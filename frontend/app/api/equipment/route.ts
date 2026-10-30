import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const maxPrice = searchParams.get('maxPrice');
    const status = searchParams.get('status');
    const ownerId = searchParams.get('ownerId');

    const supabase = getSupabaseAdmin();

    // Build the query with Supabase's select + join syntax
    // equipment_types!inner(...) and users!fk_equipment_owner(...)
    let q = supabase
      .from('equipment')
      .select(`
        equipment_id,
        owner_id,
        type_id,
        model_name,
        daily_rate,
        status,
        equipment_types ( type_id, category_name, description ),
        users!fk_equipment_owner ( full_name, phone, email )
      `)
      .order('equipment_id', { ascending: false });

    // Filter by status
    if (status && status !== 'ALL') {
      q = q.eq('status', status);
    } else if (!status && !ownerId) {
      // Default catalog view: only AVAILABLE machines
      q = q.eq('status', 'AVAILABLE');
    }

    if (ownerId) {
      q = q.eq('owner_id', Number(ownerId));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      q = q.lte('daily_rate', Number(maxPrice));
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      q = q.or(`model_name.ilike.${term}`);
    }

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    // Filter by category name in-memory if requested
    // (Supabase doesn't easily filter by joined table column in .or())
    let equipment = (rows || []).map((r: Record<string, unknown>) => {
      const eqType = r.equipment_types as Record<string, unknown> | null;
      const owner = r.users as Record<string, unknown> | null;
      return {
        equipment_id: r.equipment_id,
        owner_id: r.owner_id,
        type_id: r.type_id,
        model_name: r.model_name,
        daily_rate: Number(r.daily_rate),
        status: r.status,
        equipment_types: eqType
          ? {
              type_id: eqType.type_id,
              category_name: eqType.category_name,
              description: eqType.description,
            }
          : null,
        users: owner
          ? {
              full_name: owner.full_name,
              phone: owner.phone,
              email: owner.email,
            }
          : null,
      };
    });

    // Category filter (applied post-fetch since it's on a joined table)
    if (category && category !== 'ALL') {
      equipment = equipment.filter(
        (e) => e.equipment_types?.category_name === category
      );
    }

    // Search in category_name too (in addition to model_name filtered above)
    if (search && search.trim()) {
      const lowerSearch = search.trim().toLowerCase();
      equipment = equipment.filter(
        (e) =>
          e.model_name?.toString().toLowerCase().includes(lowerSearch) ||
          e.equipment_types?.category_name?.toString().toLowerCase().includes(lowerSearch)
      );
    }

    return NextResponse.json({ equipment });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to query equipment list.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role_type !== 'OWNER' && session.role_type !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Only registered owners and admins can list machinery.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { model_name, type_id, daily_rate } = body;

    if (!model_name || !type_id || !daily_rate) {
      return NextResponse.json(
        { error: 'Model name, equipment category, and daily rental rate are required.' },
        { status: 400 }
      );
    }

    const rateNum = Number(daily_rate);
    if (isNaN(rateNum) || rateNum <= 0) {
      return NextResponse.json(
        { error: 'Daily rate must be a positive number.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: newEquip, error } = await supabase
      .from('equipment')
      .insert({
        owner_id: session.user_id,
        type_id: Number(type_id),
        model_name: model_name.trim(),
        daily_rate: rateNum,
        status: 'AVAILABLE',
      })
      .select('equipment_id')
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      equipment_id: newEquip?.equipment_id,
      message: 'Machinery listed successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to insert equipment record.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    if (session.role_type !== 'OWNER') {
      return NextResponse.json({ error: 'Only equipment owners can update listings.' }, { status: 403 });
    }

    let body: {
      equipment_id?: unknown;
      model_name?: unknown;
      type_id?: unknown;
      daily_rate?: unknown;
      status?: unknown;
    };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
    }

    const equipmentId = Number(body.equipment_id);
    if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
      return NextResponse.json({ error: 'A valid equipment_id is required.' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (body.model_name !== undefined) {
      if (typeof body.model_name !== 'string' || !body.model_name.trim()) {
        return NextResponse.json({ error: 'model_name must be a non-empty string.' }, { status: 400 });
      }
      updates.model_name = body.model_name.trim();
    }
    if (body.type_id !== undefined) {
      const typeId = Number(body.type_id);
      if (!Number.isInteger(typeId) || typeId <= 0) {
        return NextResponse.json({ error: 'type_id must be a positive integer.' }, { status: 400 });
      }
      updates.type_id = typeId;
    }
    if (body.daily_rate !== undefined) {
      const dailyRate = Number(body.daily_rate);
      if (!Number.isFinite(dailyRate) || dailyRate <= 0) {
        return NextResponse.json({ error: 'daily_rate must be a positive number.' }, { status: 400 });
      }
      updates.daily_rate = dailyRate;
    }
    if (body.status !== undefined) {
      if (!['AVAILABLE', 'RENTED', 'MAINTENANCE'].includes(String(body.status))) {
        return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
      }
      updates.status = body.status;
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Provide at least one equipment field to update.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: equipment, error } = await supabase
      .from('equipment')
      .update(updates)
      .eq('equipment_id', equipmentId)
      .eq('owner_id', session.user_id)
      .select('equipment_id, owner_id, type_id, model_name, daily_rate, status')
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found or you do not own it.' }, { status: 404 });
    }

    return NextResponse.json({ equipment }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Failed to update equipment.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    if (session.role_type !== 'OWNER') {
      return NextResponse.json({ error: 'Only equipment owners can delete listings.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    let equipmentIdValue: unknown = searchParams.get('id');
    if (equipmentIdValue === null) {
      let body: { equipment_id?: unknown };
      try {
        body = await request.json();
      } catch {
        return NextResponse.json({ error: 'Provide equipment id in the query or a valid JSON body.' }, { status: 400 });
      }
      equipmentIdValue = body.equipment_id;
    }
    const equipmentId = Number(equipmentIdValue);
    if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
      return NextResponse.json({ error: 'A valid equipment id is required.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment')
      .select('equipment_id')
      .eq('equipment_id', equipmentId)
      .eq('owner_id', session.user_id)
      .maybeSingle();

    if (equipmentError) throw new Error(equipmentError.message);
    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found or you do not own it.' }, { status: 404 });
    }

    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('booking_id')
      .eq('equipment_id', equipmentId)
      .in('status', ['PENDING', 'CONFIRMED'])
      .limit(1);

    if (bookingsError) throw new Error(bookingsError.message);
    if (bookings && bookings.length > 0) {
      return NextResponse.json(
        { error: 'Machinery cannot be deleted while it has pending or active bookings.' },
        { status: 400 }
      );
    }

    const { error: deleteError } = await supabase
      .from('equipment')
      .delete()
      .eq('equipment_id', equipmentId)
      .eq('owner_id', session.user_id);

    if (deleteError) throw new Error(deleteError.message);

    return NextResponse.json({ success: true, equipment_id: equipmentId, message: 'Equipment listing deleted.' }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Failed to delete equipment.' }, { status: 500 });
  }
}
