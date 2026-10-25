import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { verifyPassword, setSession } from '@/lib/auth';
import type { AppUser } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, full_name, email, role_type, phone, address, created_at, password_hash')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.password_hash as string);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please verify your credentials.' },
        { status: 401 }
      );
    }

    const appUser: AppUser = {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_type: user.role_type,
      phone: user.phone,
      address: user.address,
      created_at: user.created_at,
    };

    await setSession(appUser);

    return NextResponse.json({
      success: true,
      user: appUser,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
