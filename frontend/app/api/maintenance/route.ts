import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

interface MaintenanceRow extends RowDataPacket {
  log_id: number;
  equipment_id: number;
  service_date: string;
  service_type: string;
  cost: string | number;
  description: string | null;
  created_at: string;
  model_name: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const equipId = searchParams.get('equipmentId');

    const conditions: string[] = [];
    const params: (string | number | boolean | null)[] = [];

    if (equipId) {
      conditions.push('m.equipment_id = ?');
      params.push(Number(equipId));
    } else if (session.role_type === 'OWNER') {
      conditions.push('e.owner_id = ?');
      params.push(session.user_id);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        m.log_id,
        m.equipment_id,
        m.service_date,
        m.service_type,
        m.cost,
        m.description,
        m.created_at,
        e.model_name
      FROM maintenance_logs m
      JOIN equipment e ON m.equipment_id = e.equipment_id
      ${whereClause}
      ORDER BY m.service_date DESC
    `;

    const rows = await query<MaintenanceRow[]>(sql, params);

    const logs = rows.map((r) => ({
      log_id: r.log_id,
      equipment_id: r.equipment_id,
      service_date: r.service_date,
      service_type: r.service_type,
      cost: Number(r.cost),
      description: r.description,
      model_name: r.model_name,
    }));

    return NextResponse.json({ logs });
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

    const result = await query<ResultSetHeader>(
      `INSERT INTO maintenance_logs (equipment_id, service_date, service_type, cost, description)
       VALUES (?, ?, ?, ?, ?)`,
      [Number(equipment_id), sDate, service_type.trim(), costNum, description?.trim() || null]
    );

    if (set_maintenance_status) {
      await query(
        'UPDATE equipment SET status = "MAINTENANCE" WHERE equipment_id = ?',
        [Number(equipment_id)]
      );
    }

    return NextResponse.json({
      success: true,
      log_id: result.insertId,
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
