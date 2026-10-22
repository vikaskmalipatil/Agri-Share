-- ============================================================
-- AGRI-SHARE: COMPLETE DATABASE SCHEMA FROM SCRATCH
-- Platform: Supabase / PostgreSQL (Full DDL Script)
-- ============================================================

-- ── 1. CUSTOM ENUM TYPES ────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('FARMER', 'OWNER', 'DRIVER', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.equipment_status AS ENUM ('AVAILABLE', 'RENTED', 'MAINTENANCE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.booking_status AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_method AS ENUM ('CARD', 'UPI', 'CASH', 'NET_BANKING');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_status AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ── 2. TABLES DEFINITIONS ───────────────────────────────────

-- TABLE 1: USERS
CREATE TABLE IF NOT EXISTS public.users (
  user_id SERIAL PRIMARY KEY,
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(25),
  email VARCHAR(255) UNIQUE NOT NULL,
  role_type public.user_role NOT NULL DEFAULT 'FARMER',
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 2: EQUIPMENT TYPES (CATEGORIES)
CREATE TABLE IF NOT EXISTS public.equipment_types (
  type_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

-- TABLE 3: EQUIPMENT
CREATE TABLE IF NOT EXISTS public.equipment (
  equipment_id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
  type_id INT NOT NULL REFERENCES public.equipment_types(type_id) ON DELETE RESTRICT,
  model_name VARCHAR(150) NOT NULL,
  daily_rate NUMERIC(10,2) NOT NULL CHECK (daily_rate > 0),
  status public.equipment_status NOT NULL DEFAULT 'AVAILABLE'
);

-- TABLE 4: EQUIPMENT DRIVERS (MANY-TO-MANY QUALIFICATION)
CREATE TABLE IF NOT EXISTS public.equipment_drivers (
  equipment_id INT NOT NULL REFERENCES public.equipment(equipment_id) ON DELETE CASCADE,
  driver_id INT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
  driver_hr_rate NUMERIC(10,2) NOT NULL CHECK (driver_hr_rate > 0),
  cert_date DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (equipment_id, driver_id)
);

-- TABLE 5: MAINTENANCE LOGS
CREATE TABLE IF NOT EXISTS public.maintenance_logs (
  log_id SERIAL PRIMARY KEY,
  equipment_id INT NOT NULL REFERENCES public.equipment(equipment_id) ON DELETE CASCADE,
  service_date DATE NOT NULL DEFAULT CURRENT_DATE,
  service_type VARCHAR(100) NOT NULL,
  cost NUMERIC(10,2) NOT NULL CHECK (cost >= 0),
  description TEXT
);

-- TABLE 6: BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
  booking_id SERIAL PRIMARY KEY,
  renter_id INT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
  equipment_id INT NOT NULL REFERENCES public.equipment(equipment_id) ON DELETE CASCADE,
  driver_id INT REFERENCES public.users(user_id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_cost NUMERIC(10,2) NOT NULL CHECK (total_cost >= 0),
  status public.booking_status NOT NULL DEFAULT 'PENDING',
  CONSTRAINT chk_booking_dates CHECK (end_date >= start_date)
);

-- TABLE 7: PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
  payment_id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL REFERENCES public.bookings(booking_id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  payment_method public.payment_method NOT NULL DEFAULT 'UPI',
  payment_status public.payment_status NOT NULL DEFAULT 'PENDING',
  transaction_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 8: REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  review_id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL UNIQUE REFERENCES public.bookings(booking_id) ON DELETE CASCADE,
  reviewer_id INT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. PERFORMANCE INDEXES ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_equipment_owner_status ON public.equipment(owner_id, status);
CREATE INDEX IF NOT EXISTS idx_equipment_type_id ON public.equipment(type_id);
CREATE INDEX IF NOT EXISTS idx_bookings_equip_dates ON public.bookings(equipment_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_status ON public.bookings(renter_id, status);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON public.payments(booking_id);

-- ── 4. ANALYTICAL DATABASE VIEWS ────────────────────────────
CREATE OR REPLACE VIEW public.view_available_equipment AS
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  e.status,
  t.type_id,
  t.category_name,
  t.description AS category_description,
  u.user_id AS owner_id,
  u.full_name AS owner_name,
  u.phone AS owner_phone
FROM public.equipment e
JOIN public.equipment_types t ON e.type_id = t.type_id
JOIN public.users u ON e.owner_id = u.user_id
WHERE e.status = 'AVAILABLE';

CREATE OR REPLACE VIEW public.view_owner_revenue_summary AS
SELECT
  u.user_id AS owner_id,
  u.full_name AS owner_name,
  COUNT(DISTINCT e.equipment_id) AS total_machinery_count,
  COUNT(DISTINCT b.booking_id) AS total_bookings_received,
  COALESCE(SUM(p.amount) FILTER (WHERE p.payment_status = 'SUCCESSFUL'), 0) AS total_revenue_earned
FROM public.users u
LEFT JOIN public.equipment e ON u.user_id = e.owner_id
LEFT JOIN public.bookings b ON e.equipment_id = b.equipment_id
LEFT JOIN public.payments p ON b.booking_id = p.booking_id
WHERE u.role_type = 'OWNER'
GROUP BY u.user_id, u.full_name;

-- ── 5. CONCURRENCY-SAFE STORED PROCEDURE ────────────────────
CREATE OR REPLACE FUNCTION public.create_booking_safe(
  p_renter_id INTEGER,
  p_equipment_id INTEGER,
  p_driver_id INTEGER,
  p_start_date DATE,
  p_end_date DATE,
  p_total_cost NUMERIC
)
RETURNS TABLE (
  booking_id INTEGER,
  error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_booking_id INTEGER;
  v_conflict_count INTEGER;
  v_current_status public.equipment_status;
BEGIN
  IF p_end_date < p_start_date THEN
    RETURN QUERY SELECT NULL::INTEGER, 'End date cannot precede start date.'::TEXT;
    RETURN;
  END IF;

  IF p_start_date < CURRENT_DATE THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Cannot create booking for past dates.'::TEXT;
    RETURN;
  END IF;

  -- Row-level locking to prevent simultaneous double booking
  SELECT status INTO v_current_status
  FROM public.equipment
  WHERE equipment_id = p_equipment_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Specified equipment does not exist.'::TEXT;
    RETURN;
  END IF;

  IF v_current_status <> 'AVAILABLE' THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Equipment is currently unavailable or under maintenance.'::TEXT;
    RETURN;
  END IF;

  -- Overlap validation for active bookings
  SELECT COUNT(*) INTO v_conflict_count
  FROM public.bookings
  WHERE equipment_id = p_equipment_id
    AND status IN ('PENDING', 'CONFIRMED')
    AND NOT (end_date < p_start_date OR start_date > p_end_date);

  IF v_conflict_count > 0 THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Equipment is already reserved for overlapping dates.'::TEXT;
    RETURN;
  END IF;

  INSERT INTO public.bookings (
    renter_id, equipment_id, driver_id, start_date, end_date, total_cost, status
  )
  VALUES (
    p_renter_id, p_equipment_id, p_driver_id, p_start_date, p_end_date, p_total_cost, 'PENDING'
  )
  RETURNING bookings.booking_id INTO v_booking_id;

  RETURN QUERY SELECT v_booking_id, NULL::TEXT;
END;
$$;

-- ── 6. ROW LEVEL SECURITY (RLS) POLICIES ────────────────────
ALTER TABLE public.equipment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- equipment_types policies
DROP POLICY IF EXISTS "Public can view equipment types" ON public.equipment_types;
CREATE POLICY "Public can view equipment types" ON public.equipment_types FOR SELECT USING (true);

-- equipment policies
DROP POLICY IF EXISTS "Public can view available equipment" ON public.equipment;
CREATE POLICY "Public can view available equipment" ON public.equipment FOR SELECT USING (status = 'AVAILABLE');

DROP POLICY IF EXISTS "Owners can view own equipment" ON public.equipment;
CREATE POLICY "Owners can view own equipment" ON public.equipment FOR SELECT USING (
  owner_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
);

DROP POLICY IF EXISTS "Owners can insert own equipment" ON public.equipment;
CREATE POLICY "Owners can insert own equipment" ON public.equipment FOR INSERT WITH CHECK (
  owner_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
);

DROP POLICY IF EXISTS "Owners can update own equipment" ON public.equipment;
CREATE POLICY "Owners can update own equipment" ON public.equipment FOR UPDATE USING (
  owner_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
);

-- users policies
DROP POLICY IF EXISTS "Allow user profile read" ON public.users;
CREATE POLICY "Allow user profile read" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated user insert" ON public.users;
CREATE POLICY "Allow authenticated user insert" ON public.users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow user profile self update" ON public.users;
CREATE POLICY "Allow user profile self update" ON public.users FOR UPDATE USING (
  auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email'
);

-- equipment_drivers policies
DROP POLICY IF EXISTS "Public can view driver certifications" ON public.equipment_drivers;
CREATE POLICY "Public can view driver certifications" ON public.equipment_drivers FOR SELECT USING (true);

-- bookings policies
DROP POLICY IF EXISTS "Users can view relevant bookings" ON public.bookings;
CREATE POLICY "Users can view relevant bookings" ON public.bookings FOR SELECT USING (
  renter_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
  OR equipment_id IN (
    SELECT equipment_id FROM public.equipment
    WHERE owner_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
  )
  OR driver_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
);

DROP POLICY IF EXISTS "Farmers can create bookings" ON public.bookings;
CREATE POLICY "Farmers can create bookings" ON public.bookings FOR INSERT WITH CHECK (
  renter_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
);

DROP POLICY IF EXISTS "Owners and Renters can update booking status" ON public.bookings;
CREATE POLICY "Owners and Renters can update booking status" ON public.bookings FOR UPDATE USING (
  renter_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
  OR equipment_id IN (
    SELECT equipment_id FROM public.equipment
    WHERE owner_id IN (SELECT user_id FROM public.users WHERE auth_user_id = auth.uid() OR email = auth.jwt() ->> 'email')
  )
);

-- payments policies
DROP POLICY IF EXISTS "Users can view payments" ON public.payments;
CREATE POLICY "Users can view payments" ON public.payments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow payment insertion" ON public.payments;
CREATE POLICY "Allow payment insertion" ON public.payments FOR INSERT WITH CHECK (true);

-- maintenance_logs policies
DROP POLICY IF EXISTS "Owners can view maintenance logs" ON public.maintenance_logs;
CREATE POLICY "Owners can view maintenance logs" ON public.maintenance_logs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owners can insert maintenance logs" ON public.maintenance_logs;
CREATE POLICY "Owners can insert maintenance logs" ON public.maintenance_logs FOR INSERT WITH CHECK (true);

-- reviews policies
DROP POLICY IF EXISTS "Public can view reviews" ON public.reviews;
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Renters can submit reviews" ON public.reviews;
CREATE POLICY "Renters can submit reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- ── 7. STARTER AGRICULTURAL CATEGORIES SEED ─────────────────
INSERT INTO public.equipment_types (type_id, category_name, description)
VALUES
  (1, 'Tractors & Heavy Machinery', 'Compact to high-horsepower tractors for plowing, tilling, and heavy field haulage.'),
  (2, 'Harvesters & Combines', 'High-efficiency crop cutting, threshing, and grain gathering machinery.'),
  (3, 'Seeders & Planters', 'Precision seed drills and planting equipment for uniform crop germination.'),
  (4, 'Irrigation & Sprayers', 'High-pressure water pumps, boom sprayers, and fertilizer application units.'),
  (5, 'Soil Prep & Attachments', 'Rotavators, disc harrows, cultivators, and laser land levelers.')
ON CONFLICT (type_id) DO UPDATE SET
  category_name = EXCLUDED.category_name,
  description = EXCLUDED.description;
