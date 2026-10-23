-- ============================================================
-- AGRI-SHARE: COMPREHENSIVE SEED DATA
-- Platform: MySQL 8.0
-- Database: agri_share
-- Note: Default password for all seed accounts is "Password123!"
-- (or test accounts can log in using their respective emails).
-- ============================================================

USE `agri_share`;

-- Disable FK checks for deterministic clean insertion
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `reviews`;
TRUNCATE TABLE `payments`;
TRUNCATE TABLE `bookings`;
TRUNCATE TABLE `maintenance_logs`;
TRUNCATE TABLE `equipment_drivers`;
TRUNCATE TABLE `equipment`;
TRUNCATE TABLE `equipment_types`;
TRUNCATE TABLE `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- 1. SEED USERS
-- Password used below: "Password123!" (stored as sha256 or verified)
-- ------------------------------------------------------------
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password_hash`, `phone`, `role_type`, `address`) VALUES
(1, 'AgriShare Administrator', 'admin@agrishare.com', 'Password123!', '+91-9845000001', 'ADMIN', 'AgriTech Hub, Bengaluru, Karnataka'),
(2, 'Ramesh Patil (Owner)', 'ramesh.owner@agrishare.com', 'Password123!', '+91-9845011002', 'OWNER', 'Plot 14, Dharwad Agricultural Belt, Karnataka'),
(3, 'Suresh Kulkarni (Owner)', 'suresh.owner@agrishare.com', 'Password123!', '+91-9845011003', 'OWNER', 'Near APMC Yard, Belagavi, Karnataka'),
(4, 'Anand Kumar (Driver)', 'anand.driver@agrishare.com', 'Password123!', '+91-9845022004', 'DRIVER', 'Post Haliyal, Uttara Kannada, Karnataka'),
(5, 'Manoj Gowda (Driver)', 'manoj.driver@agrishare.com', 'Password123!', '+91-9845022005', 'DRIVER', 'Mandya Rural, Karnataka'),
(6, 'Vikas Mali (Farmer)', 'vikas.farmer@agrishare.com', 'Password123!', '+91-9845033006', 'FARMER', 'Survey 45, Bagalkot Fields, Karnataka'),
(7, 'Priya Deshmukh (Farmer)', 'priya.farmer@agrishare.com', 'Password123!', '+91-9845033007', 'FARMER', 'Village Channagiri, Davanagere, Karnataka'),
(8, 'Amit Hegde (Farmer)', 'amit.farmer@agrishare.com', 'Password123!', '+91-9845033008', 'FARMER', 'Sirsi Taluk, Uttara Kannada, Karnataka');

-- ------------------------------------------------------------
-- 2. SEED EQUIPMENT TYPES (CATEGORIES)
-- ------------------------------------------------------------
INSERT INTO `equipment_types` (`type_id`, `category_name`, `description`) VALUES
(1, 'Tractors', 'Multi-purpose 4WD and 2WD tractors for heavy tilling, haulage, and farm implements.'),
(2, 'Harvesters', 'Self-propelled combine harvesters for paddy, wheat, corn, and grain crops.'),
(3, 'Tillers & Cultivators', 'Rotary tillers, power weeders, and soil preparation cultivators for seedbed readiness.'),
(4, 'Seed Drills & Planters', 'Precision tractor-mounted multi-crop seed drills for automated sowing.'),
(5, 'Sprayers & Protection', 'Tractor-mounted boom sprayers and high-pressure orchard crop protection sprayers.'),
(6, 'Irrigation Pumps', 'Portable diesel and solar-powered high-head water pumps for seasonal irrigation.');

-- ------------------------------------------------------------
-- 3. SEED EQUIPMENT
-- ------------------------------------------------------------
INSERT INTO `equipment` (`equipment_id`, `owner_id`, `type_id`, `model_name`, `daily_rate`, `status`) VALUES
(1, 2, 1, 'John Deere 5310 4WD (55 HP)', 2800.00, 'AVAILABLE'),
(2, 2, 2, 'Kubota DC-68G Combine Paddy Harvester', 6500.00, 'RENTED'),
(3, 2, 3, 'Shaktiman Semi-Champion Rotavator (7 Feet)', 1400.00, 'AVAILABLE'),
(4, 3, 1, 'Mahindra Arjun Novo 605 DI-i (57 HP)', 2500.00, 'AVAILABLE'),
(5, 3, 5, 'ASPEE High Pressure Tractor Boom Sprayer', 950.00, 'MAINTENANCE'),
(6, 3, 6, 'Kirloskar 7.5 HP Diesel High-Head Water Pump', 1200.00, 'AVAILABLE');

-- ------------------------------------------------------------
-- 4. SEED EQUIPMENT DRIVERS (QUALIFICATIONS)
-- ------------------------------------------------------------
INSERT INTO `equipment_drivers` (`equipment_id`, `driver_id`, `driver_hr_rate`, `cert_date`) VALUES
(1, 4, 250.00, '2025-01-15'),
(2, 4, 450.00, '2025-02-10'),
(4, 5, 220.00, '2025-03-01'),
(3, 5, 180.00, '2025-03-20');

-- ------------------------------------------------------------
-- 5. SEED MAINTENANCE LOGS
-- ------------------------------------------------------------
INSERT INTO `maintenance_logs` (`log_id`, `equipment_id`, `service_date`, `service_type`, `cost`, `description`) VALUES
(1, 1, '2026-08-10', 'Periodic 500-Hour Engine Overhaul', 5400.00, 'Replaced engine oil, hydraulic filter, and cleaned fuel injectors.'),
(2, 2, '2026-09-05', 'Cutter Bar Blade Replacement', 8200.00, 'Replaced serrated cutting blades and lubricated threshing drum bearings.'),
(3, 5, '2026-10-18', 'Nozzle De-clogging & Pump Seal Fix', 1500.00, 'Repaired chemical pressure relief valve and replaced 4 cracked spray nozzles.');

-- ------------------------------------------------------------
-- 6. SEED BOOKINGS
-- ------------------------------------------------------------
INSERT INTO `bookings` (`booking_id`, `renter_id`, `equipment_id`, `driver_id`, `start_date`, `end_date`, `total_cost`, `status`) VALUES
(1, 6, 1, 4, '2026-09-15', '2026-09-18', 8400.00, 'COMPLETED'),
(2, 7, 2, 4, '2026-10-25', '2026-10-28', 19500.00, 'CONFIRMED'),
(3, 8, 4, 5, '2026-11-01', '2026-11-03', 5000.00, 'PENDING');

-- ------------------------------------------------------------
-- 7. SEED PAYMENTS
-- ------------------------------------------------------------
INSERT INTO `payments` (`payment_id`, `booking_id`, `amount`, `payment_method`, `payment_status`, `transaction_time`) VALUES
(1, 1, 8400.00, 'UPI', 'SUCCESSFUL', '2026-09-14 18:30:00'),
(2, 2, 19500.00, 'NET_BANKING', 'SUCCESSFUL', '2026-10-20 11:15:00'),
(3, 3, 5000.00, 'CASH', 'PENDING', '2026-10-22 09:00:00');

-- ------------------------------------------------------------
-- 8. SEED REVIEWS
-- ------------------------------------------------------------
INSERT INTO `reviews` (`review_id`, `booking_id`, `reviewer_id`, `rating`, `comments`, `created_at`) VALUES
(1, 1, 6, 5, 'The John Deere tractor delivered stellar fuel economy during tilling. Driver Anand was highly punctual and skilled.', '2026-09-19 14:00:00');
