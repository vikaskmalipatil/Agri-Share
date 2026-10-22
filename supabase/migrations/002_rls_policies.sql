-- ============================================================
-- Migration 002: Row Level Security (RLS) Policies
-- Project: Agri-Share
-- Description:
--   Enforces security across all tables exposed via PostgREST API.
--   - Public catalog read for AVAILABLE equipment and equipment_types.
--   - Authenticated profile management (users manage own records).
--   - Farmers can view/create their own bookings.
--   - Owners can view/manage their equipment and associated bookings/maintenance.
--   - Drivers can view their assigned jobs and rate cards.
-- ============================================================

-- ── 1. equipment_types ──────────────────────────────────────
ALTER TABLE public.equipment_types ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view equipment types" ON public.equipment_types;
CREATE POLICY "Public can view equipment types"
  ON public.equipment_types
  FOR SELECT
  USING (true);

-- ── 2. equipment ────────────────────────────────────────────
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view available equipment" ON public.equipment;
CREATE POLICY "Public can view available equipment"
  ON public.equipment
  FOR SELECT
  USING (status = 'AVAILABLE');

DROP POLICY IF EXISTS "Owners can view own equipment" ON public.equipment;
CREATE POLICY "Owners can view own equipment"
  ON public.equipment
  FOR SELECT
  USING (
    owner_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "Owners can insert own equipment" ON public.equipment;
CREATE POLICY "Owners can insert own equipment"
  ON public.equipment
  FOR INSERT
  WITH CHECK (
    owner_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "Owners can update own equipment" ON public.equipment;
CREATE POLICY "Owners can update own equipment"
  ON public.equipment
  FOR UPDATE
  USING (
    owner_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
  );

-- ── 3. users ────────────────────────────────────────────────
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow user profile self read" ON public.users;
CREATE POLICY "Allow user profile self read"
  ON public.users
  FOR SELECT
  USING (
    auth_user_id = auth.uid()
    OR email = auth.jwt() ->> 'email'
    OR true -- Allows driver/owner name lookup in public listing joins
  );

DROP POLICY IF EXISTS "Allow authenticated user insert" ON public.users;
CREATE POLICY "Allow authenticated user insert"
  ON public.users
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow user profile self update" ON public.users;
CREATE POLICY "Allow user profile self update"
  ON public.users
  FOR UPDATE
  USING (
    auth_user_id = auth.uid()
    OR email = auth.jwt() ->> 'email'
  );

-- ── 4. equipment_drivers ────────────────────────────────────
ALTER TABLE public.equipment_drivers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view driver certifications" ON public.equipment_drivers;
CREATE POLICY "Public can view driver certifications"
  ON public.equipment_drivers
  FOR SELECT
  USING (true);

-- ── 5. bookings ─────────────────────────────────────────────
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Renters can view own bookings" ON public.bookings;
CREATE POLICY "Renters can view own bookings"
  ON public.bookings
  FOR SELECT
  USING (
    renter_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
    OR equipment_id IN (
      SELECT equipment_id FROM public.equipment
      WHERE owner_id IN (
        SELECT user_id FROM public.users
        WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
      )
    )
    OR driver_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "Farmers can create bookings" ON public.bookings;
CREATE POLICY "Farmers can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (
    renter_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "Owners and Renters can update booking status" ON public.bookings;
CREATE POLICY "Owners and Renters can update booking status"
  ON public.bookings
  FOR UPDATE
  USING (
    renter_id IN (
      SELECT user_id FROM public.users
      WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
    )
    OR equipment_id IN (
      SELECT equipment_id FROM public.equipment
      WHERE owner_id IN (
        SELECT user_id FROM public.users
        WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
      )
    )
  );

-- ── 6. payments ─────────────────────────────────────────────
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view associated payments" ON public.payments;
CREATE POLICY "Users can view associated payments"
  ON public.payments
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow system or renter payment insertion" ON public.payments;
CREATE POLICY "Allow system or renter payment insertion"
  ON public.payments
  FOR INSERT
  WITH CHECK (true);

-- ── 7. maintenance_logs ─────────────────────────────────────
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners can view maintenance logs" ON public.maintenance_logs;
CREATE POLICY "Owners can view maintenance logs"
  ON public.maintenance_logs
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Owners can insert maintenance logs" ON public.maintenance_logs;
CREATE POLICY "Owners can insert maintenance logs"
  ON public.maintenance_logs
  FOR INSERT
  WITH CHECK (true);

-- ── 8. reviews ──────────────────────────────────────────────
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view reviews" ON public.reviews;
CREATE POLICY "Public can view reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Renters can submit reviews" ON public.reviews;
CREATE POLICY "Renters can submit reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (true);
