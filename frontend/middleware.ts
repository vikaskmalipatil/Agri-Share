import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase-middleware';

/** Routes that require an authenticated session */
const PROTECTED_PREFIXES = [
  '/dashboard/farmer',
  '/dashboard/owner',
  '/dashboard/driver',
  '/dashboard/admin',
];

/** Routes that authenticated users should be redirected away from */
const AUTH_ROUTES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Refresh the session and write updated auth cookies
  const supabase = createSupabaseMiddlewareClient(request, response);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (isProtected && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/signup to their dashboard
  if (session && AUTH_ROUTES.includes(pathname)) {
    // The role-based redirect happens client-side after login;
    // here we simply send them to the root — the client will redirect further.
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next.js internals.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
