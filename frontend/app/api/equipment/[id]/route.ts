import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

interface EquipmentDetailRow extends RowDataPacket {
  equipment_id: number;
  owner_id: number;
  type_id: number;
  model_name: string;
  daily_rate: string | number;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  created_at: string;
  category_name: string;
  category_description: string | null;
  owner_name: string;
  owner_phone: string | null;
  owner_email: string;
}

interface DriverRow extends RowDataPacket {
  equipment_id: number;
  driver_id: number;
  driver_hr_rate: string | number;
  cert_date: string;
  driver_name: string;
  driver_phone: string | null;
  driver_email: string;
}

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

    // 1. Fetch equipment record with owner and type
    const equipRows = await query<EquipmentDetailRow[]>(
      `SELECT
        e.equipment_id,
        e.owner_id,
        e.type_id,
        e.model_name,
        e.daily_rate,
        e.status,
        e.created_at,
        t.category_name,
        t.description AS category_description,
        u.full_name AS owner_name,
        u.phone AS owner_phone,
        u.email AS owner_email
      FROM equipment e
      JOIN equipment_types t ON e.type_id = t.type_id
      JOIN users u ON e.owner_id = u.user_id
      WHERE e.equipment_id = ?
      LIMIT 1`,
      [equipId]
    );

    if (equipRows.length === 0) {
      return NextResponse.json({ error: 'Equipment not found.' }, { status: 404 });
    }

    const row = equipRows[0];
    const equipment = {
      equipment_id: row.equipment_id,
      owner_id: row.owner_id,
      type_id: row.type_id,
      model_name: row.model_name,
      daily_rate: Number(row.daily_rate),
      status: row.status,
      created_at: row.created_at,
      equipment_types: {
        category_name: row.category_name,
        description: row.category_description,
      },
      users: {
        full_name: row.owner_name,
        phone: row.owner_phone,
        email: row.owner_email,
      },
    };

    // 2. Fetch certified drivers for this equipment
    const driverRows = await query<DriverRow[]>(
      `SELECT
        ed.equipment_id,
        ed.driver_id,
        ed.driver_hr_rate,
        ed.cert_date,
        u.full_name AS driver_name,
        u.phone AS driver_phone,
        u.email AS driver_email
      FROM equipment_drivers ed
      JOIN users u ON ed.driver_id = u.user_id
      WHERE ed.equipment_id = ?`,
      [equipId]
    );

    const drivers = driverRows.map((d) => ({
      equipment_id: d.equipment_id,
      driver_id: d.driver_id,
      driver_hr_rate: Number(d.driver_hr_rate),
      cert_date: d.cert_date,
      users: {
        full_name: d.driver_name,
        phone: d.driver_phone,
        email: d.driver_email,
      },
    }));

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

    // Update status
    await query<ResultSetHeader>(
      'UPDATE equipment SET status = ? WHERE equipment_id = ?',
      [status, equipId]
    );

    return NextResponse.json({ success: true, message: 'Equipment status updated.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to update equipment.' },
      { status: 500 }
    );
  }
}
