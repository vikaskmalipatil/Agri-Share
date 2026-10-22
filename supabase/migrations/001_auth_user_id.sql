-- ============================================================
-- Migration 001: Safe Additive Auth User ID Linkage
-- Project: Agri-Share
-- Description:
--   Supabase Auth assigns UUID identifiers in auth.users(id).
--   The application public.users table uses an integer primary key (user_id).
--   This migration introduces a unique auth_user_id column referencing auth.users,
--   allowing 1-to-1 secure profile linking without mutating existing primary keys.
-- ============================================================

-- 1. Add auth_user_id column to public.users if not exists
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Indexes for high-performance lookup during authentication and session evaluation
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 3. Document column purpose for schema inspection
COMMENT ON COLUMN public.users.auth_user_id IS 'References Supabase Auth auth.users(id) UUID for secure session mapping';
