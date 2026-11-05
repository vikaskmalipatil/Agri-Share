-- ============================================================
-- AGRI-SHARE: SAMPLE DATA (SEED DATA)
-- MySQL 8.0 | Database: agri_share
--
-- Run this file AFTER schema.sql.
--
-- INSERT IGNORE means: if a row with the same primary key
-- already exists, skip it (do not error, do not overwrite).
-- This makes the script safe to run more than once.
--
-- PASSWORDS:
--   All demo accounts use the plain string "Password123!"
--   The Next.js app's verifyPassword() function accepts a
--   plain-text match for demo accounts. Real signups through
--   the web app will store a hashed password automatically.
-- ============================================================

USE agri_share;


-- ── 1. USERS ──────────────────────────────────────────────────
-- We have 8 test users across all four roles.

INSERT IGNORE INTO users
  (user_id, full_name, email, password_hash, phone, role_type, address)
VALUES
  (1, 'AgriShare Admin',    'admin@agrishare.com',         'Password123!', '+91-9800000001', 'ADMIN',  'Bengaluru, Karnataka'),
  (2, 'Ramesh Patil',       'ramesh.owner@agrishare.com',  'Password123!', '+91-9800000002', 'OWNER',  'Dharwad, Karnataka'),
  (3, 'Suresh Kulkarni',    'suresh.owner@agrishare.com',  'Password123!', '+91-9800000003', 'OWNER',  'Belagavi, Karnataka'),
  (4, 'Anand Kumar',        'anand.driver@agrishare.com',  'Password123!', '+91-9800000004', 'DRIVER', 'Uttara Kannada, Karnataka'),
  (5, 'Manoj Gowda',        'manoj.driver@agrishare.com',  'Password123!', '+91-9800000005', 'DRIVER', 'Mandya, Karnataka'),
  (6, 'Vikas Mali',         'vikas.farmer@agrishare.com',  'Password123!', '+91-9800000006', 'FARMER', 'Bagalkot, Karnataka'),
  (7, 'Priya Deshmukh',     'priya.farmer@agrishare.com',  'Password123!', '+91-9800000007', 'FARMER', 'Davanagere, Karnataka'),
  (8, 'Amit Hegde',         'amit.farmer@agrishare.com',   'Password123!', '+91-9800000008', 'FARMER', 'Sirsi, Karnataka');


-- ── 2. EQUIPMENT TYPES ────────────────────────────────────────
-- These are the category options available on the platform.

INSERT IGNORE INTO equipment_types
  (type_id, category_name, description)
VALUES
  (1, 'Tractors',              'Multi-purpose tractors for tilling, haulage, and farm work.'),
  (2, 'Harvesters',            'Combine harvesters for paddy, wheat, and grain crops.'),
  (3, 'Tillers & Cultivators', 'Rotary tillers and cultivators for soil preparation.'),
  (4, 'Seed Drills',           'Tractor-mounted seed drills for automated sowing.'),
  (5, 'Sprayers',              'Boom sprayers for crop protection and pesticide application.'),
  (6, 'Irrigation Pumps',      'Diesel and solar-powered water pumps for irrigation.');


-- ── 3. EQUIPMENT ──────────────────────────────────────────────
-- Note: Equipment #2 is RENTED (booking #2 is CONFIRMED).
--       Equipment #5 is under MAINTENANCE.

INSERT IGNORE INTO equipment
  (equipment_id, owner_id, type_id, model_name, daily_rate, status)
VALUES
  (1, 2, 1, 'John Deere 5310 Tractor (55 HP)',         2800.00, 'AVAILABLE'),
  (2, 2, 2, 'Kubota DC-68G Combine Harvester',         6500.00, 'RENTED'),
  (3, 2, 3, 'Shaktiman Rotavator (7 Feet)',             1400.00, 'AVAILABLE'),
  (4, 3, 1, 'Mahindra Arjun Novo 605 Tractor (57 HP)', 2500.00, 'AVAILABLE'),
  (5, 3, 5, 'ASPEE Boom Sprayer',                       950.00, 'MAINTENANCE'),
  (6, 3, 6, 'Kirloskar 7.5 HP Diesel Water Pump',      1200.00, 'AVAILABLE');


-- ── 4. EQUIPMENT DRIVERS (CERTIFICATIONS) ─────────────────────
-- Anand (driver 4) is certified for machines 1 and 2.
-- Manoj (driver 5) is certified for machines 3 and 4.

INSERT IGNORE INTO equipment_drivers
  (equipment_id, driver_id, driver_hr_rate, cert_date)
VALUES
  (1, 4, 250.00, '2025-01-15'),
  (2, 4, 450.00, '2025-02-10'),
  (3, 5, 180.00, '2025-03-20'),
  (4, 5, 220.00, '2025-03-01');


-- ── 5. MAINTENANCE LOGS ───────────────────────────────────────
-- Service history for three machines.

INSERT IGNORE INTO maintenance_logs
  (log_id, equipment_id, service_date, service_type, cost, description)
VALUES
  (1, 1, '2026-08-10', 'Engine Overhaul',        5400.00, 'Oil change, hydraulic filter, fuel injector cleaning.'),
  (2, 2, '2026-09-05', 'Cutter Blade Replacement', 8200.00, 'Replaced cutting blades and lubricated threshing drum.'),
  (3, 5, '2026-10-18', 'Nozzle and Pump Repair',  1500.00, 'Fixed pressure relief valve and replaced cracked nozzles.');


-- ── 6. BOOKINGS ───────────────────────────────────────────────
-- Booking 1: Vikas rented the John Deere Tractor — COMPLETED.
--            3 days x Rs.2800 = Rs.8400
-- Booking 2: Priya is renting the Kubota Harvester — CONFIRMED.
--            This is why equipment #2 shows status = RENTED.
--            3 days x Rs.6500 = Rs.19500
-- Booking 3: Amit has a PENDING request for the Mahindra Tractor.
--            2 days x Rs.2500 = Rs.5000

INSERT IGNORE INTO bookings
  (booking_id, renter_id, equipment_id, driver_id,
   start_date, end_date, total_cost, status)
VALUES
  (1, 6, 1, 4, '2026-09-15', '2026-09-17',  8400.00, 'COMPLETED'),
  (2, 7, 2, 4, '2026-10-25', '2026-10-27', 19500.00, 'CONFIRMED'),
  (3, 8, 4, 5, '2026-11-01', '2026-11-02',  5000.00, 'PENDING');


-- ── 7. PAYMENTS ───────────────────────────────────────────────

INSERT IGNORE INTO payments
  (payment_id, booking_id, amount, payment_method, payment_status, transaction_time)
VALUES
  (1, 1,  8400.00, 'UPI',         'SUCCESSFUL', '2026-09-14 18:30:00'),
  (2, 2, 19500.00, 'NET_BANKING', 'SUCCESSFUL', '2026-10-20 11:15:00'),
  (3, 3,  5000.00, 'CASH',        'PENDING',    '2026-10-22 09:00:00');


-- ── 8. REVIEWS ────────────────────────────────────────────────
-- Only booking #1 is COMPLETED so only that can have a review.

INSERT IGNORE INTO reviews
  (review_id, booking_id, reviewer_id, rating, comments, created_at)
VALUES
  (1, 1, 6, 5,
   'John Deere tractor was in great condition. Driver Anand was punctual and professional.',
   '2026-09-19 14:00:00');
