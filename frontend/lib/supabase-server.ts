/**
 * Server-side Supabase client for Server Components, Route Handlers,
 * and Server Actions. Reads/writes cookies via next/headers.
 *
 * NEVER import this in Client Components – it uses next/headers which
 * is server-only.
 */
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component – cookies are read-only
            // there; the middleware will handle session refresh.
          }
        },
      },
    }
  );
}
