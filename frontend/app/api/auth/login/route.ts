import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, getSupabaseAuth } from '@/lib/db';
import { verifyPassword, setSession } from '@/lib/auth';
import type { AppUser } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const supabaseAuth = getSupabaseAuth();
    const cleanEmail = email.trim().toLowerCase();
    const { data: user, error: lookupError } = await supabase
      .from('users')
      .select('user_id, auth_user_id, full_name, email, role_type, phone, address, created_at, password_hash')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (lookupError) throw new Error(lookupError.message);
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 401 }
      );
    }

    if (user.auth_user_id) {
      const { data: authData, error: authError } = await supabaseAuth.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authError || authData.user?.id !== user.auth_user_id) {
        return NextResponse.json(
          { error: authError?.message === 'Email not confirmed'
            ? 'Please confirm your email before signing in.'
            : 'Incorrect email or password.' },
          { status: 401 }
        );
      }
    } else if (!verifyPassword(password, user.password_hash as string)) {
      // Legacy profiles predate Supabase Auth and remain usable.
      return NextResponse.json(
        { error: 'Incorrect email or password.' },
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

    return NextResponse.json({ success: true, user: appUser }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
