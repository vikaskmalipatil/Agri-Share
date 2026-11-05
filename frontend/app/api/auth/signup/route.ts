import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { setSession } from '@/lib/auth';
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
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      );
    }
    if (typeof email !== 'string' || typeof full_name !== 'string') {
      return NextResponse.json(
        { error: 'Full name and email must be valid strings.' },
        { status: 400 }
      );
    }

    const cleanRole: UserRole = VALID_ROLES.includes(role_type) ? role_type : 'FARMER';
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = full_name.trim();
    if (!cleanEmail || !cleanName) {
      return NextResponse.json(
        { error: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: existing, error: lookupError } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (lookupError) throw new Error(lookupError.message);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // Create and confirm the Auth identity without sending a verification email.
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: cleanEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: cleanName,
        role_type: cleanRole,
        phone: typeof phone === 'string' ? phone.trim() || null : null,
        address: typeof address === 'string' ? address.trim() || null : null,
      },
    });

    if (authError) {
      const isDuplicate = authError.message.toLowerCase().includes('already');
      return NextResponse.json(
        { error: authError.message },
        { status: isDuplicate ? 409 : 400 }
      );
    }
    if (!authData.user?.id) {
      return NextResponse.json(
        { error: 'Supabase Auth did not return a user UUID.' },
        { status: 500 }
      );
    }

    // The API owns profile creation; auth_user_id is always populated here.
    const { data: newUser, error: profileError } = await supabase
      .from('users')
      .upsert({
        auth_user_id: authData.user.id,
        full_name: cleanName,
        email: cleanEmail,
        phone: typeof phone === 'string' ? phone.trim() || null : null,
        role_type: cleanRole,
        address: typeof address === 'string' ? address.trim() || null : null,
      }, { onConflict: 'email' })
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .single();

    if (profileError || !newUser) {
      // Cleanup is best-effort; never hide the profile/database error behind a network failure.
      try {
        const { error: cleanupError } = await supabase.auth.admin.deleteUser(authData.user.id);
        if (cleanupError) console.error('Failed to remove temporary Auth user after profile creation failed:', cleanupError.message);
      } catch (cleanupError) {
        console.error('Failed to remove temporary Auth user after profile creation failed:', cleanupError);
      }
      throw new Error(profileError?.message || 'Failed to create account profile.');
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

    return NextResponse.json({ success: true, user: appUser }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An error occurred during account registration.' },
      { status: 500 }
    );
  }
}
