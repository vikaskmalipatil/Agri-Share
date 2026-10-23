import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

interface EquipmentRow extends RowDataPacket {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const maxPrice = searchParams.get('maxPrice');
    const status = searchParams.get('status');
    const ownerId = searchParams.get('ownerId');

    const conditions: string[] = [];
    const params: (string | number | boolean | null)[] = [];

    // Filter by status (default to AVAILABLE for customer catalog, or 'ALL')
    if (status && status !== 'ALL') {
      conditions.push('e.status = ?');
      params.push(status);
    } else if (!status && !ownerId) {
      // Default catalog view: only AVAILABLE machines
      conditions.push('e.status = "AVAILABLE"');
    }

    if (ownerId) {
      conditions.push('e.owner_id = ?');
      params.push(Number(ownerId));
    }

    if (category && category !== 'ALL') {
      conditions.push('t.category_name = ?');
      params.push(category);
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      conditions.push('e.daily_rate <= ?');
      params.push(Number(maxPrice));
    }

    if (search && search.trim()) {
      conditions.push('(e.model_name LIKE ? OR t.category_name LIKE ?)');
      const term = `%${search.trim()}%`;
      params.push(term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
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
      ${whereClause}
      ORDER BY e.equipment_id DESC
    `;

    const rows = await query<EquipmentRow[]>(sql, params);

    // Format output with joined relationship structure
    const equipment = rows.map((r) => ({
      equipment_id: r.equipment_id,
      owner_id: r.owner_id,
      type_id: r.type_id,
      model_name: r.model_name,
      daily_rate: Number(r.daily_rate),
      status: r.status,
      created_at: r.created_at,
      equipment_types: {
        type_id: r.type_id,
        category_name: r.category_name,
        description: r.category_description,
      },
      users: {
        full_name: r.owner_name,
        phone: r.owner_phone,
        email: r.owner_email,
      },
    }));

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

    const result = await query<ResultSetHeader>(
      `INSERT INTO equipment (owner_id, type_id, model_name, daily_rate, status)
       VALUES (?, ?, ?, ?, 'AVAILABLE')`,
      [session.user_id, Number(type_id), model_name.trim(), rateNum]
    );

    return NextResponse.json({
      success: true,
      equipment_id: result.insertId,
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
