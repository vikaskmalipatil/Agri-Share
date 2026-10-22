-- ============================================================
-- Migration 004: Academic DBMS Demonstration Views & Indexes
-- Project: Agri-Share
-- Description:
--   Demonstrates advanced PostgreSQL DBMS concepts:
--   - Relational joins across 3NF tables
--   - Materialized / regular aggregated views
--   - Performance indexes on foreign keys and search fields
-- ============================================================

-- ── 1. Composite Performance Indexes ────────────────────────
CREATE INDEX IF NOT EXISTS idx_equipment_owner_status ON public.equipment(owner_id, status);
CREATE INDEX IF NOT EXISTS idx_equipment_type_id ON public.equipment(type_id);
CREATE INDEX IF NOT EXISTS idx_bookings_equip_dates ON public.bookings(equipment_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_status ON public.bookings(renter_id, status);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON public.payments(booking_id);

-- ── 2. View: Comprehensive Available Machinery Catalog ───────
-- Joins equipment, categories, and owners into a single denormalized analytical view
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

-- ── 3. View: Owner Rental Revenue Summary ────────────────────
-- Demonstrates aggregation, grouping, and monetary calculation
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

-- ── 4. View: Equipment Utilization & Ratings ─────────────────
CREATE OR REPLACE VIEW public.view_equipment_performance AS
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  COUNT(DISTINCT b.booking_id) AS times_rented,
  ROUND(AVG(r.rating)::numeric, 2) AS average_rating,
  COUNT(DISTINCT r.review_id) AS total_reviews
FROM public.equipment e
LEFT JOIN public.bookings b ON e.equipment_id = b.equipment_id
LEFT JOIN public.reviews r ON b.booking_id = r.booking_id
GROUP BY e.equipment_id, e.model_name, e.daily_rate;
