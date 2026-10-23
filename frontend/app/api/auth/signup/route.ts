import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, setSession } from '@/lib/auth';
import type { AppUser, UserRole } from '@/lib/types';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

const VALID_ROLES: UserRole[] = ['FARMER', 'OWNER', 'DRIVER', 'ADMIN'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, password, role_type, phone, address } = body;

    // Basic validation
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

    // Check if email already registered
    const existing = await query<RowDataPacket[]>(
      'SELECT user_id FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // Hash password with salted PBKDF2
    const passwordHash = hashPassword(password);

    // Insert new user into MySQL
    const result = await query<ResultSetHeader>(
      `INSERT INTO users (full_name, email, password_hash, phone, role_type, address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        full_name.trim(),
        cleanEmail,
        passwordHash,
        phone?.trim() || null,
        cleanRole,
        address?.trim() || null,
      ]
    );

    const newUser: AppUser = {
      user_id: result.insertId,
      full_name: full_name.trim(),
      email: cleanEmail,
      phone: phone?.trim() || null,
      role_type: cleanRole,
      address: address?.trim() || null,
      created_at: new Date().toISOString(),
    };

    // Establish session cookie
    await setSession(newUser);

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An error occurred during account registration.' },
      { status: 500 }
    );
  }
}
