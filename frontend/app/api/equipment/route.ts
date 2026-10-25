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
