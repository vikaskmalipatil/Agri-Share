-- ============================================================
-- AGRI-SHARE: FRESH DATABASE RESET SCRIPT
-- Platform: Supabase (PostgreSQL)
--
-- PURPOSE: Completely drops all Agri-Share tables, views,
-- functions, and triggers. Run this ONLY when starting over.
--
-- WARNING: ALL DATA WILL BE PERMANENTLY DELETED.
--
-- HOW TO USE (Supabase SQL Editor):
--   1. Go to Supabase project → SQL Editor → New Query
--   2. Paste this script and click "Run"
--   3. Then run supabase_schema.sql, then supabase_seeds.sql
-- ============================================================

-- Drop views first (they depend on base tables)
DROP VIEW IF EXISTS view_equipment_summary  CASCADE;
DROP VIEW IF EXISTS view_booking_details    CASCADE;
DROP VIEW IF EXISTS view_available_equipment CASCADE;

-- Drop trigger before dropping its function
DROP TRIGGER IF EXISTS trg_booking_status_change ON bookings;

-- Drop functions
DROP FUNCTION IF EXISTS fn_booking_status_change() CASCADE;
DROP FUNCTION IF EXISTS create_booking(INT, INT, INT, DATE, DATE) CASCADE;

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS reviews            CASCADE;
DROP TABLE IF EXISTS payments           CASCADE;
DROP TABLE IF EXISTS bookings           CASCADE;
DROP TABLE IF EXISTS maintenance_logs   CASCADE;
DROP TABLE IF EXISTS equipment_drivers  CASCADE;
DROP TABLE IF EXISTS equipment          CASCADE;
DROP TABLE IF EXISTS equipment_types    CASCADE;
DROP TABLE IF EXISTS users              CASCADE;
