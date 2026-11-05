import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data: rows, error } = await supabase
      .from('equipment_drivers')
      .select(`
        equipment_id,
        driver_id,
        driver_hr_rate,
        cert_date,
        equipment!fk_eqd_equipment ( model_name, daily_rate )
      `)
      .eq('driver_id', session.user_id);

    if (error) throw new Error(error.message);

    const eligibleEquipment = (rows || []).map((r: Record<string, unknown>) => {
      const equip = r.equipment as Record<string, unknown> | null;
      return {
        equipment_id: r.equipment_id,
        driver_id: r.driver_id,
        driver_hr_rate: Number(r.driver_hr_rate),
        cert_date: r.cert_date,
        equipment: equip
          ? {
              model_name: equip.model_name,
              daily_rate: Number(equip.daily_rate),
            }
          : null,
      };
    });

    return NextResponse.json({ eligibleEquipment });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch driver eligible equipment.' },
      { status: 500 }
    );
  }
}
