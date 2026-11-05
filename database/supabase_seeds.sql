-- ============================================================
-- AGRI-SHARE: SAMPLE SEED DATA
-- Supabase (PostgreSQL) | Run AFTER supabase_schema.sql
--
-- HOW TO RUN:
--   Supabase project → SQL Editor → New Query → Paste → Run
--
-- INSERT ... ON CONFLICT DO NOTHING = safe to run multiple times
-- ============================================================


-- ── 1. USERS ──────────────────────────────────────────────────
-- All demo accounts use the plain password "Password123!"
-- The app's verifyPassword() accepts a plain-text match for demo accounts.

INSERT INTO users
  (user_id, full_name, email, password_hash, phone, role_type, address)
VALUES
  (1, 'AgriShare Admin',    'admin@agrishare.com',         'Password123!', '+91-9800000001', 'ADMIN',  'Bengaluru, Karnataka'),
  (2, 'Ramesh Patil',       'ramesh.owner@agrishare.com',  'Password123!', '+91-9800000002', 'OWNER',  'Dharwad, Karnataka'),
  (3, 'Suresh Kulkarni',    'suresh.owner@agrishare.com',  'Password123!', '+91-9800000003', 'OWNER',  'Belagavi, Karnataka'),
  (4, 'Anand Kumar',        'anand.driver@agrishare.com',  'Password123!', '+91-9800000004', 'DRIVER', 'Uttara Kannada, Karnataka'),
  (5, 'Manoj Gowda',        'manoj.driver@agrishare.com',  'Password123!', '+91-9800000005', 'DRIVER', 'Mandya, Karnataka'),
  (6, 'Vikas Mali',         'vikas.farmer@agrishare.com',  'Password123!', '+91-9800000006', 'FARMER', 'Bagalkot, Karnataka'),
  (7, 'Priya Deshmukh',     'priya.farmer@agrishare.com',  'Password123!', '+91-9800000007', 'FARMER', 'Davanagere, Karnataka'),
  (8, 'Amit Hegde',         'amit.farmer@agrishare.com',   'Password123!', '+91-9800000008', 'FARMER', 'Sirsi, Karnataka')
ON CONFLICT (user_id) DO NOTHING;

-- Reset the serial sequence so future INSERTs don't collide with our manual IDs
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));


-- ── 2. EQUIPMENT TYPES ────────────────────────────────────────

INSERT INTO equipment_types
  (type_id, category_name, description)
VALUES
  (1, 'Tractors',              'Multi-purpose tractors for tilling, haulage, and farm work.'),
  (2, 'Harvesters',            'Combine harvesters for paddy, wheat, and grain crops.'),
  (3, 'Tillers & Cultivators', 'Rotary tillers and cultivators for soil preparation.'),
  (4, 'Seed Drills',           'Tractor-mounted seed drills for automated sowing.'),
  (5, 'Sprayers',              'Boom sprayers for crop protection and pesticide application.'),
  (6, 'Irrigation Pumps',      'Diesel and solar-powered water pumps for irrigation.')
ON CONFLICT (type_id) DO NOTHING;

SELECT setval('equipment_types_type_id_seq', (SELECT MAX(type_id) FROM equipment_types));


-- ── 3. EQUIPMENT ──────────────────────────────────────────────
-- Equipment #2 is RENTED (booking #2 is CONFIRMED).
-- Equipment #5 is under MAINTENANCE.

INSERT INTO equipment
  (equipment_id, owner_id, type_id, model_name, daily_rate, status)
VALUES
  (1, 2, 1, 'John Deere 5310 Tractor (55 HP)',         2800.00, 'AVAILABLE'),
  (2, 2, 2, 'Kubota DC-68G Combine Harvester',         6500.00, 'RENTED'),
  (3, 2, 3, 'Shaktiman Rotavator (7 Feet)',             1400.00, 'AVAILABLE'),
  (4, 3, 1, 'Mahindra Arjun Novo 605 Tractor (57 HP)', 2500.00, 'AVAILABLE'),
  (5, 3, 5, 'ASPEE Boom Sprayer',                        950.00, 'MAINTENANCE'),
  (6, 3, 6, 'Kirloskar 7.5 HP Diesel Water Pump',      1200.00, 'AVAILABLE')
ON CONFLICT (equipment_id) DO NOTHING;

SELECT setval('equipment_equipment_id_seq', (SELECT MAX(equipment_id) FROM equipment));


-- ── 4. EQUIPMENT DRIVERS (CERTIFICATIONS) ─────────────────────

INSERT INTO equipment_drivers
  (equipment_id, driver_id, driver_hr_rate, cert_date)
VALUES
  (1, 4, 250.00, '2025-01-15'),
  (2, 4, 450.00, '2025-02-10'),
  (3, 5, 180.00, '2025-03-20'),
  (4, 5, 220.00, '2025-03-01')
ON CONFLICT (equipment_id, driver_id) DO NOTHING;


-- ── 5. MAINTENANCE LOGS ───────────────────────────────────────

INSERT INTO maintenance_logs
  (log_id, equipment_id, service_date, service_type, cost, description)
VALUES
  (1, 1, '2026-08-10', 'Engine Overhaul',          5400.00, 'Oil change, hydraulic filter, fuel injector cleaning.'),
  (2, 2, '2026-09-05', 'Cutter Blade Replacement', 8200.00, 'Replaced cutting blades and lubricated threshing drum.'),
  (3, 5, '2026-10-18', 'Nozzle and Pump Repair',   1500.00, 'Fixed pressure relief valve and replaced cracked nozzles.')
ON CONFLICT (log_id) DO NOTHING;

SELECT setval('maintenance_logs_log_id_seq', (SELECT MAX(log_id) FROM maintenance_logs));


-- ── 6. BOOKINGS ───────────────────────────────────────────────
-- Booking 1: Vikas rented the John Deere Tractor — COMPLETED  (3 days × Rs.2800 = Rs.8400)
-- Booking 2: Priya renting the Kubota Harvester  — CONFIRMED  (3 days × Rs.6500 = Rs.19500)
-- Booking 3: Amit has a PENDING request           — PENDING   (2 days × Rs.2500 = Rs.5000)

INSERT INTO bookings
  (booking_id, renter_id, equipment_id, driver_id,
   start_date, end_date, total_cost, status)
VALUES
  (1, 6, 1, 4, '2026-09-15', '2026-09-17',  8400.00, 'COMPLETED'),
  (2, 7, 2, 4, '2026-10-25', '2026-10-27', 19500.00, 'CONFIRMED'),
  (3, 8, 4, 5, '2026-11-01', '2026-11-02',  5000.00, 'PENDING')
ON CONFLICT (booking_id) DO NOTHING;

SELECT setval('bookings_booking_id_seq', (SELECT MAX(booking_id) FROM bookings));


-- ── 7. PAYMENTS ───────────────────────────────────────────────

INSERT INTO payments
  (payment_id, booking_id, amount, payment_method, payment_status, transaction_time)
VALUES
  (1, 1,  8400.00, 'UPI',         'SUCCESSFUL', '2026-09-14 18:30:00+05:30'),
  (2, 2, 19500.00, 'NET_BANKING', 'SUCCESSFUL', '2026-10-20 11:15:00+05:30'),
  (3, 3,  5000.00, 'CASH',        'PENDING',    '2026-10-22 09:00:00+05:30')
ON CONFLICT (payment_id) DO NOTHING;

SELECT setval('payments_payment_id_seq', (SELECT MAX(payment_id) FROM payments));


-- ── 8. REVIEWS ────────────────────────────────────────────────

INSERT INTO reviews
  (review_id, booking_id, reviewer_id, rating, comments, created_at)
VALUES
  (1, 1, 6, 5,
   'John Deere tractor was in great condition. Driver Anand was punctual and professional.',
   '2026-09-19 14:00:00+05:30')
ON CONFLICT (review_id) DO NOTHING;

SELECT setval('reviews_review_id_seq', (SELECT MAX(review_id) FROM reviews));
