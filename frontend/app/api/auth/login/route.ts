import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, setSession } from '@/lib/auth';
import type { AppUser } from '@/lib/types';
import type { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket, AppUser {
  password_hash: string;
}

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

    // Query user by email
    const rows = await query<UserRow[]>(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Verify password (supports PBKDF2 hash or plain string for viva)
    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please verify your credentials.' },
        { status: 401 }
      );
    }

    // Set HTTP-only session cookie
    await setSession(user);

    return NextResponse.json({
      success: true,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role_type: user.role_type,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
