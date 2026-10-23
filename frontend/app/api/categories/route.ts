import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { EquipmentType } from '@/lib/types';
import type { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const categories = await query<(RowDataPacket & EquipmentType)[]>(
      'SELECT type_id, category_name, description FROM equipment_types ORDER BY category_name ASC'
    );
    return NextResponse.json({ categories });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch equipment categories.' },
      { status: 500 }
    );
  }
}
