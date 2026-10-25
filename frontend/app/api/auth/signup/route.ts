import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { hashPassword, setSession } from '@/lib/auth';
import type { AppUser, UserRole } from '@/lib/types';

const VALID_ROLES: UserRole[] = ['FARMER', 'OWNER', 'DRIVER', 'ADMIN'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, password, role_type, phone, address } = body;

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { error: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const cleanRole: UserRole = VALID_ROLES.includes(role_type) ? role_type : 'FARMER';
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabaseAdmin();

    // Check for existing account
    const { data: existing } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        full_name: full_name.trim(),
        email: cleanEmail,
        password_hash: passwordHash,
        phone: phone?.trim() || null,
        role_type: cleanRole,
        address: address?.trim() || null,
      })
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .single();

    if (insertError || !newUser) {
      throw new Error(insertError?.message || 'Failed to create account.');
    }

    const appUser: AppUser = {
      user_id: newUser.user_id,
      full_name: newUser.full_name,
      email: newUser.email,
      role_type: newUser.role_type,
      phone: newUser.phone,
      address: newUser.address,
      created_at: newUser.created_at,
    };

    await setSession(appUser);

    return NextResponse.json({ success: true, user: appUser });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An error occurred during account registration.' },
      { status: 500 }
    );
  }
}
