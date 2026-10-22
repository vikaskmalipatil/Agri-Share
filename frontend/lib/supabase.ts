/**
 * Browser-side Supabase client (safe for client components).
 * Uses createBrowserClient from @supabase/ssr for proper session
 * management with cookies, replacing the plain createClient approach.
 */
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '[Agri-Share] Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local'
  );
}

/**
 * Singleton browser client — import this in Client Components.
 * Do NOT use this in Server Components or Route Handlers.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseKey!);

/**
 * Factory function — useful when a fresh client instance is needed
 * (e.g., inside a hook that runs in strict mode).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseKey!);
}
