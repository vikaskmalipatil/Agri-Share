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
    const equipId = searchParams.get('equipmentId');

    const supabase = getSupabaseAdmin();

    if (equipId) {
      // Filter by specific equipment
      const { data: rows, error } = await supabase
        .from('maintenance_logs')
        .select(`
          log_id,
          equipment_id,
          service_date,
          service_type,
          cost,
          description,
          equipment!fk_maint_equipment ( model_name )
        `)
        .eq('equipment_id', Number(equipId))
        .order('service_date', { ascending: false });

      if (error) throw new Error(error.message);

      const logs = (rows || []).map((r: Record<string, unknown>) => {
        const equip = r.equipment as Record<string, unknown> | null;
        return {
          log_id: r.log_id,
          equipment_id: r.equipment_id,
          service_date: r.service_date,
          service_type: r.service_type,
          cost: Number(r.cost),
          description: r.description,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ logs });
    } else if (session.role_type === 'OWNER') {
      // Owner: get maintenance for their own equipment only
      // First get their equipment IDs
      const { data: equipRows } = await supabase
        .from('equipment')
        .select('equipment_id')
        .eq('owner_id', session.user_id);

      const ownerEquipIds = (equipRows || []).map(
        (e: Record<string, unknown>) => e.equipment_id as number
      );

      if (ownerEquipIds.length === 0) {
        return NextResponse.json({ logs: [] });
      }

      const { data: rows, error } = await supabase
        .from('maintenance_logs')
        .select(`
          log_id,
          equipment_id,
          service_date,
          service_type,
          cost,
          description,
          equipment!fk_maint_equipment ( model_name )
        `)
        .in('equipment_id', ownerEquipIds)
        .order('service_date', { ascending: false });

      if (error) throw new Error(error.message);

      const logs = (rows || []).map((r: Record<string, unknown>) => {
        const equip = r.equipment as Record<string, unknown> | null;
        return {
          log_id: r.log_id,
          equipment_id: r.equipment_id,
          service_date: r.service_date,
          service_type: r.service_type,
          cost: Number(r.cost),
          description: r.description,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ logs });
    } else {
      // Admin or others: all logs
      const { data: rows, error } = await supabase
        .from('maintenance_logs')
        .select(`
          log_id,
          equipment_id,
          service_date,
          service_type,
          cost,
          description,
          equipment!fk_maint_equipment ( model_name )
        `)
        .order('service_date', { ascending: false });

      if (error) throw new Error(error.message);

      const logs = (rows || []).map((r: Record<string, unknown>) => {
        const equip = r.equipment as Record<string, unknown> | null;
        return {
          log_id: r.log_id,
          equipment_id: r.equipment_id,
          service_date: r.service_date,
          service_type: r.service_type,
          cost: Number(r.cost),
          description: r.description,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ logs });
    }
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch maintenance logs.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role_type !== 'OWNER' && session.role_type !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Only owners or admins can log maintenance.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { equipment_id, service_type, cost, description, service_date, set_maintenance_status } = body;

    if (!equipment_id || !service_type || cost === undefined) {
      return NextResponse.json(
        { error: 'Equipment ID, service type, and cost are required.' },
        { status: 400 }
      );
    }

    const costNum = Number(cost);
    if (isNaN(costNum) || costNum < 0) {
      return NextResponse.json(
        { error: 'Maintenance cost must be a non-negative number.' },
        { status: 400 }
      );
    }

    const sDate = service_date || new Date().toISOString().slice(0, 10);

    const supabase = getSupabaseAdmin();

    const { data: newLog, error } = await supabase
      .from('maintenance_logs')
      .insert({
        equipment_id: Number(equipment_id),
        service_date: sDate,
        service_type: service_type.trim(),
        cost: costNum,
        description: description?.trim() || null,
      })
      .select('log_id')
      .single();

    if (error) throw new Error(error.message);

    // Optionally set equipment to MAINTENANCE status
    if (set_maintenance_status) {
      await supabase
        .from('equipment')
        .update({ status: 'MAINTENANCE' })
        .eq('equipment_id', Number(equipment_id));
    }

    return NextResponse.json({
      success: true,
      log_id: newLog?.log_id,
      message: 'Maintenance log recorded successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to record maintenance log.' },
      { status: 500 }
    );
  }
}
