// ============================================================
// Agri-Share – Server-Side Authentication & Session Management
// Pure Node.js crypto + HTTP-only cookies. No third-party lock-in.
// ============================================================

import crypto from 'crypto';
import { cookies } from 'next/headers';
import type { AppUser } from './types';

const SESSION_COOKIE_NAME = 'agri_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'agri_share_super_secret_college_dbms_key_2026';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// ------------------------------------------------------------
// Password Hashing & Verification
// Supports both PBKDF2 hashed passwords and direct strings
// for effortless professor viva verification in MySQL Workbench.
// ------------------------------------------------------------

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;

  // 1. Direct plain match (allows professors or students to insert demo rows in Workbench)
  if (storedHash === password) {
    return true;
  }

  // 2. Salted PBKDF2 hash verification
  const parts = storedHash.split(':');
  if (parts.length === 2) {
    const [salt, expectedHash] = parts;
    const computed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(expectedHash));
  }

  return false;
}

// ------------------------------------------------------------
// Signed Session Token Generation & Verification
// ------------------------------------------------------------

export interface SessionPayload {
  user_id: number;
  full_name: string;
  email: string;
  role_type: AppUser['role_type'];
  phone?: string | null;
  address?: string | null;
  exp: number;
}

function signPayload(payloadString: string): string {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadString)
    .digest('hex');
}

export function createSessionToken(user: AppUser): string {
  const payload: SessionPayload = {
    user_id: user.user_id,
    full_name: user.full_name,
    email: user.email,
    role_type: user.role_type,
    phone: user.phone || null,
    address: user.address || null,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    if (!payloadBase64 || !signature) return null;

    const expectedSignature = signPayload(payloadBase64);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const json = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const payload = JSON.parse(json) as SessionPayload;

    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// Next.js Server-Side Cookie Handlers
// ------------------------------------------------------------

export async function setSession(user: AppUser): Promise<void> {
  const token = createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };
