import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data: categories, error } = await supabase
      .from('equipment_types')
      .select('type_id, category_name, description')
      .order('category_name', { ascending: true });

    if (error) throw new Error(error.message);

    return NextResponse.json({ categories });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch equipment categories.' },
      { status: 500 }
    );
  }
}
