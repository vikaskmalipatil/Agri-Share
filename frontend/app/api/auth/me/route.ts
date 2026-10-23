import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import type { AppUser } from '@/lib/types';
import type { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // Refresh user state from database
    const rows = await query<(RowDataPacket & AppUser)[]>(
      'SELECT user_id, full_name, email, role_type, phone, address, created_at FROM users WHERE user_id = ? LIMIT 1',
      [session.user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: rows[0] });
  } catch {
    // If DB is temporarily disconnected, fall back to session cookie info
    const session = await getSession();
    return NextResponse.json({ user: session });
  }
}
