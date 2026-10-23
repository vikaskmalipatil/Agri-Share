import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket } from 'mysql2';

interface DriverEquipRow extends RowDataPacket {
  equipment_id: number;
  driver_id: number;
  driver_hr_rate: string | number;
  cert_date: string;
  model_name: string;
  daily_rate: string | number;
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const rows = await query<DriverEquipRow[]>(
      `SELECT
        ed.equipment_id,
        ed.driver_id,
        ed.driver_hr_rate,
        ed.cert_date,
        e.model_name,
        e.daily_rate
       FROM equipment_drivers ed
       JOIN equipment e ON ed.equipment_id = e.equipment_id
       WHERE ed.driver_id = ?`,
      [session.user_id]
    );

    const eligibleEquipment = rows.map((r) => ({
      equipment_id: r.equipment_id,
      driver_id: r.driver_id,
      driver_hr_rate: Number(r.driver_hr_rate),
      cert_date: r.cert_date,
      equipment: {
        model_name: r.model_name,
        daily_rate: Number(r.daily_rate),
      },
    }));

    return NextResponse.json({ eligibleEquipment });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch driver eligible equipment.' },
      { status: 500 }
    );
  }
}
