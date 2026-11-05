import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

type RouteContext = { params: Promise<{ id: string }> };

async function getOwnedEquipmentId(id: string, ownerId: number) {
  const equipmentId = Number(id);
  if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
    return { error: NextResponse.json({ error: 'Invalid equipment ID.' }, { status: 400 }) };
  }

  const supabase = getSupabaseAdmin();
  const { data: equipment, error } = await supabase
    .from('equipment')
    .select('equipment_id')
    .eq('equipment_id', equipmentId)
    .eq('owner_id', ownerId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!equipment) {
    return { error: NextResponse.json({ error: 'Equipment not found or you do not own it.' }, { status: 404 }) };
  }
  return { equipmentId, supabase };
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    if (session.role_type !== 'OWNER') {
      return NextResponse.json({ error: 'Only equipment owners can manage operators.' }, { status: 403 });
    }

    const { id } = await params;
    const owned = await getOwnedEquipmentId(id, session.user_id);
    if ('error' in owned) return owned.error;
    const { equipmentId, supabase } = owned;

    const [assignedResult, driverResult] = await Promise.all([
      supabase
        .from('equipment_drivers')
        .select('equipment_id, driver_id, driver_hr_rate, cert_date, users!fk_eqd_driver ( user_id, full_name, email )')
        .eq('equipment_id', equipmentId)
        .order('driver_id'),
      supabase
        .from('users')
        .select('user_id, full_name, email')
        .eq('role_type', 'DRIVER')
        .order('full_name'),
    ]);

    if (assignedResult.error) throw new Error(assignedResult.error.message);
    if (driverResult.error) throw new Error(driverResult.error.message);

    return NextResponse.json({ assignedDrivers: assignedResult.data || [], drivers: driverResult.data || [] });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Failed to load equipment operators.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    if (session.role_type !== 'OWNER') {
      return NextResponse.json({ error: 'Only equipment owners can manage operators.' }, { status: 403 });
    }

    const { id } = await params;
    const owned = await getOwnedEquipmentId(id, session.user_id);
    if ('error' in owned) return owned.error;
    const { equipmentId, supabase } = owned;

    let body: { driver_id?: unknown; driver_hr_rate?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
    }

    const driverId = Number(body.driver_id);
    const hourlyRate = Number(body.driver_hr_rate);
    if (!Number.isInteger(driverId) || driverId <= 0) {
      return NextResponse.json({ error: 'Select a valid driver.' }, { status: 400 });
    }
    if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
      return NextResponse.json({ error: 'Hourly charge must be greater than zero.' }, { status: 400 });
    }

    const { data: driver, error: driverError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', driverId)
      .eq('role_type', 'DRIVER')
      .maybeSingle();
    if (driverError) throw new Error(driverError.message);
    if (!driver) return NextResponse.json({ error: 'Registered driver not found.' }, { status: 404 });

    const { data: assignment, error: assignmentError } = await supabase
      .from('equipment_drivers')
      .upsert({
        equipment_id: equipmentId,
        driver_id: driverId,
        driver_hr_rate: hourlyRate,
        cert_date: new Date().toISOString().slice(0, 10),
      }, { onConflict: 'equipment_id,driver_id' })
      .select('equipment_id, driver_id, driver_hr_rate, cert_date')
      .single();

    if (assignmentError) throw new Error(assignmentError.message);
    return NextResponse.json({ success: true, assignment }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Failed to add equipment operator.' }, { status: 500 });
  }
}