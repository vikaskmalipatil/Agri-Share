import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipId = parseInt(id, 10);

    if (isNaN(equipId) || equipId <= 0) {
      return NextResponse.json({ error: 'Invalid equipment ID.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Fetch equipment record with owner and type
    const { data: row, error } = await supabase
      .from('equipment')
      .select(`
        equipment_id,
        owner_id,
        type_id,
        model_name,
        daily_rate,
        status,
        equipment_types ( category_name, description ),
        users!fk_equipment_owner ( full_name, phone, email )
      `)
      .eq('equipment_id', equipId)
      .single();

    if (error || !row) {
      return NextResponse.json({ error: 'Equipment not found.' }, { status: 404 });
    }

    const eqType = row.equipment_types as unknown as Record<string, unknown> | null;
    const owner = row.users as unknown as Record<string, unknown> | null;

    const equipment = {
      equipment_id: row.equipment_id,
      owner_id: row.owner_id,
      type_id: row.type_id,
      model_name: row.model_name,
      daily_rate: Number(row.daily_rate),
      status: row.status,
      equipment_types: eqType
        ? { category_name: eqType.category_name, description: eqType.description }
        : null,
      users: owner
        ? { full_name: owner.full_name, phone: owner.phone, email: owner.email }
        : null,
    };

    // 2. Fetch certified drivers for this equipment
    const { data: driverRows, error: driverErr } = await supabase
      .from('equipment_drivers')
      .select(`
        equipment_id,
        driver_id,
        driver_hr_rate,
        cert_date,
        users!fk_eqd_driver ( full_name, phone, email )
      `)
      .eq('equipment_id', equipId);

    if (driverErr) throw new Error(driverErr.message);

    const drivers = (driverRows || []).map((d: Record<string, unknown>) => {
      const driverUser = d.users as Record<string, unknown> | null;
      return {
        equipment_id: d.equipment_id,
        driver_id: d.driver_id,
        driver_hr_rate: Number(d.driver_hr_rate),
        cert_date: d.cert_date,
        users: driverUser
          ? { full_name: driverUser.full_name, phone: driverUser.phone, email: driverUser.email }
          : null,
      };
    });

    return NextResponse.json({ equipment, drivers });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch equipment details.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { id } = await params;
    const equipId = parseInt(id, 10);
    const body = await request.json();
    const { status } = body;

    if (!['AVAILABLE', 'RENTED', 'MAINTENANCE'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('equipment')
      .update({ status })
      .eq('equipment_id', equipId);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, message: 'Equipment status updated.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to update equipment.' },
      { status: 500 }
    );
  }
}
