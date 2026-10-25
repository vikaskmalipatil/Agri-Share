import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const supabase = getSupabaseAdmin();
    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .eq('user_id', session.user_id)
      .single();

    if (error || !user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch {
    // If DB is temporarily disconnected, fall back to session cookie info
    const session = await getSession();
    return NextResponse.json({ user: session });
  }
}
