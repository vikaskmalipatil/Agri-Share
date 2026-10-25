// ============================================================
// Agri-Share – Supabase Client (Server-Side)
// Uses the service role key for trusted server-side API routes.
// NEVER import this file in client components.
// ============================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singleton admin client (service role – bypasses Row Level Security)
let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Missing Supabase environment variables. ' +
        'Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local'
      );
    }

    adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return adminClient;
}

// Re-export for convenience
export { SupabaseClient };
