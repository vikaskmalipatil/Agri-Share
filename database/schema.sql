-- ============================================================
-- AGRI-SHARE: FARM EQUIPMENT SHARING PLATFORM
-- Database Management System Mini-Project Schema
-- Engine: MySQL 8.0 (InnoDB) | Normalization: 3NF
-- Database Name: agri_share
-- ============================================================

-- 1. DATABASE INITIALIZATION
CREATE DATABASE IF NOT EXISTS `agri_share`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `agri_share`;

-- Disable foreign key checks during cleanup if re-running
SET FOREIGN_KEY_CHECKS = 0;
DROP VIEW IF EXISTS `view_equipment_performance`;
DROP VIEW IF EXISTS `view_owner_revenue_summary`;
DROP VIEW IF EXISTS `view_available_equipment`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `maintenance_logs`;
DROP TABLE IF EXISTS `equipment_drivers`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `equipment_types`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- 2. TABLE DEFINITIONS (3NF COMPLIANT)
-- ============================================================

-- ------------------------------------------------------------
-- TABLE 1: users
-- Purpose: Central user store for all platform roles.
-- Roles: FARMER, OWNER, DRIVER, ADMIN
-- 3NF: Stores only direct attributes of a user; no transitively
-- dependent attributes or composite groups.
-- ------------------------------------------------------------
CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(25) NULL,
  `role_type` ENUM('FARMER', 'OWNER', 'DRIVER', 'ADMIN') NOT NULL DEFAULT 'FARMER',
  `address` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role_type`),
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 2: equipment_types
-- Purpose: Lookup table for equipment categories.
-- 3NF: Normalizes machinery categories out of the equipment table,
-- preventing update/deletion anomalies.
-- ------------------------------------------------------------
CREATE TABLE `equipment_types` (
  `type_id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 3: equipment
-- Purpose: Machinery inventory listed by equipment owners.
-- 3NF: References users (owner) and equipment_types (category).
-- Constraints: Positive rental rate, valid status enum.
-- ------------------------------------------------------------
CREATE TABLE `equipment` (
  `equipment_id` INT AUTO_INCREMENT PRIMARY KEY,
  `owner_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  `model_name` VARCHAR(150) NOT NULL,
  `daily_rate` DECIMAL(10,2) NOT NULL,
  `status` ENUM('AVAILABLE', 'RENTED', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_equip_owner`
    FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_equip_type`
    FOREIGN KEY (`type_id`) REFERENCES `equipment_types` (`type_id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_equip_daily_rate`
    CHECK (`daily_rate` > 0.00),
  INDEX `idx_equip_status` (`status`),
  INDEX `idx_equip_owner` (`owner_id`),
  INDEX `idx_equip_type` (`type_id`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 4: equipment_drivers
-- Purpose: Many-to-Many bridge table between qualified drivers
-- and the equipment they are certified to operate.
-- 3NF: Composite primary key (equipment_id, driver_id); all
-- non-key attributes (hourly rate, cert date) functionally depend
-- on the entire primary key.
-- ------------------------------------------------------------
CREATE TABLE `equipment_drivers` (
  `equipment_id` INT NOT NULL,
  `driver_id` INT NOT NULL,
  `driver_hr_rate` DECIMAL(10,2) NOT NULL,
  `cert_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (`equipment_id`, `driver_id`),
  CONSTRAINT `fk_ed_equipment`
    FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ed_driver`
    FOREIGN KEY (`driver_id`) REFERENCES `users` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_driver_rate`
    CHECK (`driver_hr_rate` > 0.00),
  INDEX `idx_ed_driver` (`driver_id`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 5: maintenance_logs
-- Purpose: Service and repair records for equipment.
-- 3NF: Directly associated with equipment; costs must be non-negative.
-- ------------------------------------------------------------
CREATE TABLE `maintenance_logs` (
  `log_id` INT AUTO_INCREMENT PRIMARY KEY,
  `equipment_id` INT NOT NULL,
  `service_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `service_type` VARCHAR(100) NOT NULL,
  `cost` DECIMAL(10,2) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_maint_equipment`
    FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_maint_cost`
    CHECK (`cost` >= 0.00),
  INDEX `idx_maint_equipment` (`equipment_id`),
  INDEX `idx_maint_date` (`service_date`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 6: bookings
-- Purpose: Rental agreements between farmers and equipment.
-- 3NF: References renter, equipment, and optional driver.
-- Constraints: Prevents end date occurring before start date,
-- negative rental costs, and invalid booking states.
-- ------------------------------------------------------------
CREATE TABLE `bookings` (
  `booking_id` INT AUTO_INCREMENT PRIMARY KEY,
  `renter_id` INT NOT NULL,
  `equipment_id` INT NOT NULL,
  `driver_id` INT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `total_cost` DECIMAL(10,2) NOT NULL,
  `status` ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_booking_renter`
    FOREIGN KEY (`renter_id`) REFERENCES `users` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_booking_equipment`
    FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_booking_driver`
    FOREIGN KEY (`driver_id`) REFERENCES `users` (`user_id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chk_booking_cost`
    CHECK (`total_cost` >= 0.00),
  CONSTRAINT `chk_booking_dates`
    CHECK (`end_date` >= `start_date`),
  INDEX `idx_booking_renter` (`renter_id`),
  INDEX `idx_booking_equipment` (`equipment_id`),
  INDEX `idx_booking_driver` (`driver_id`),
  INDEX `idx_booking_status` (`status`),
  INDEX `idx_booking_dates` (`equipment_id`, `start_date`, `end_date`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 7: payments
-- Purpose: Monetary transactions linked to a booking.
-- 3NF: Each payment is uniquely tied to a booking transaction.
-- ------------------------------------------------------------
CREATE TABLE `payments` (
  `payment_id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_id` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_method` ENUM('CARD', 'UPI', 'CASH', 'NET_BANKING') NOT NULL DEFAULT 'UPI',
  `payment_status` ENUM('PENDING', 'SUCCESSFUL', 'FAILED') NOT NULL DEFAULT 'PENDING',
  `transaction_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_payment_booking`
    FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_payment_amount`
    CHECK (`amount` >= 0.00),
  INDEX `idx_payment_booking` (`booking_id`),
  INDEX `idx_payment_status` (`payment_status`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TABLE 8: reviews
-- Purpose: Farmer ratings and feedback for completed bookings.
-- 3NF: 1:1 with booking (UNIQUE constraint on booking_id).
-- Rating constrained strictly between 1 and 5.
-- ------------------------------------------------------------
CREATE TABLE `reviews` (
  `review_id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_id` INT NOT NULL UNIQUE,
  `reviewer_id` INT NOT NULL,
  `rating` TINYINT NOT NULL,
  `comments` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_review_booking`
    FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_review_reviewer`
    FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_review_rating`
    CHECK (`rating` BETWEEN 1 AND 5),
  INDEX `idx_review_rating` (`rating`),
  INDEX `idx_review_reviewer` (`reviewer_id`)
) ENGINE=InnoDB;

-- ============================================================
-- 3. DATABASE VIEWS (FOR REPORTING & UI EFFICIENCY)
-- ============================================================

-- View 1: Available equipment with category and owner details
CREATE OR REPLACE VIEW `view_available_equipment` AS
SELECT
  e.`equipment_id`,
  e.`model_name`,
  e.`daily_rate`,
  e.`status`,
  t.`type_id`,
  t.`category_name`,
  t.`description` AS `category_description`,
  u.`user_id` AS `owner_id`,
  u.`full_name` AS `owner_name`,
  u.`phone` AS `owner_phone`,
  u.`email` AS `owner_email`
FROM `equipment` e
JOIN `equipment_types` t ON e.`type_id` = t.`type_id`
JOIN `users` u ON e.`owner_id` = u.`user_id`
WHERE e.`status` = 'AVAILABLE';

-- View 2: Aggregated owner revenue summary
CREATE OR REPLACE VIEW `view_owner_revenue_summary` AS
SELECT
  u.`user_id` AS `owner_id`,
  u.`full_name` AS `owner_name`,
  u.`email` AS `owner_email`,
  COUNT(DISTINCT e.`equipment_id`) AS `total_machinery_count`,
  COUNT(DISTINCT b.`booking_id`) AS `total_bookings_received`,
  COALESCE(SUM(CASE WHEN p.`payment_status` = 'SUCCESSFUL' THEN p.`amount` ELSE 0 END), 0.00) AS `total_revenue_earned`
FROM `users` u
LEFT JOIN `equipment` e ON u.`user_id` = e.`owner_id`
LEFT JOIN `bookings` b ON e.`equipment_id` = b.`equipment_id`
LEFT JOIN `payments` p ON b.`booking_id` = p.`booking_id`
WHERE u.`role_type` = 'OWNER'
GROUP BY u.`user_id`, u.`full_name`, u.`email`;

-- View 3: Equipment operational performance & health summary
CREATE OR REPLACE VIEW `view_equipment_performance` AS
SELECT
  e.`equipment_id`,
  e.`model_name`,
  t.`category_name`,
  u.`full_name` AS `owner_name`,
  COUNT(DISTINCT b.`booking_id`) AS `total_rentals`,
  COALESCE(ROUND(AVG(r.`rating`), 2), 0.00) AS `avg_rating`,
  COUNT(DISTINCT r.`review_id`) AS `total_reviews`,
  COALESCE(SUM(m.`cost`), 0.00) AS `total_maintenance_expenditure`
FROM `equipment` e
JOIN `equipment_types` t ON e.`type_id` = t.`type_id`
JOIN `users` u ON e.`owner_id` = u.`user_id`
LEFT JOIN `bookings` b ON e.`equipment_id` = b.`equipment_id`
LEFT JOIN `reviews` r ON b.`booking_id` = r.`booking_id`
LEFT JOIN `maintenance_logs` m ON e.`equipment_id` = m.`equipment_id`
GROUP BY e.`equipment_id`, e.`model_name`, t.`category_name`, u.`full_name`;

-- ============================================================
-- 4. STORED PROCEDURE: CONCURRENCY-SAFE BOOKING
-- Purpose: Prevents race conditions and double bookings using
-- transactional locking (SELECT ... FOR UPDATE).
-- ============================================================
DROP PROCEDURE IF EXISTS `create_booking_safe`;

DELIMITER //

CREATE PROCEDURE `create_booking_safe`(
  IN p_renter_id INT,
  IN p_equipment_id INT,
  IN p_driver_id INT,
  IN p_start_date DATE,
  IN p_end_date DATE,
  IN p_total_cost DECIMAL(10,2),
  OUT p_booking_id INT,
  OUT p_status_code INT,
  OUT p_status_message VARCHAR(255)
)
proc_label: BEGIN
  DECLARE v_conflict_count INT DEFAULT 0;
  DECLARE v_equipment_status VARCHAR(20);
  DECLARE v_renter_role VARCHAR(20);

  -- Standard error handling rollback
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_booking_id = NULL;
    SET p_status_code = 500;
    SET p_status_message = 'Internal database error during booking creation.';
  END;

  -- 1. Date validity validation
  IF p_end_date < p_start_date THEN
    SET p_booking_id = NULL;
    SET p_status_code = 400;
    SET p_status_message = 'End date cannot be prior to start date.';
    LEAVE proc_label;
  END IF;

  IF p_start_date < CURRENT_DATE() THEN
    SET p_booking_id = NULL;
    SET p_status_code = 400;
    SET p_status_message = 'Cannot create a booking starting in the past.';
    LEAVE proc_label;
  END IF;

  -- 2. Validate renter role
  SELECT `role_type` INTO v_renter_role
  FROM `users`
  WHERE `user_id` = p_renter_id;

  IF v_renter_role IS NULL THEN
    SET p_booking_id = NULL;
    SET p_status_code = 404;
    SET p_status_message = 'Renter user profile not found.';
    LEAVE proc_label;
  END IF;

  -- 3. Begin transaction with row-level lock
  START TRANSACTION;

  SELECT `status` INTO v_equipment_status
  FROM `equipment`
  WHERE `equipment_id` = p_equipment_id
  FOR UPDATE;

  IF v_equipment_status IS NULL THEN
    ROLLBACK;
    SET p_booking_id = NULL;
    SET p_status_code = 404;
    SET p_status_message = 'Specified equipment does not exist.';
    LEAVE proc_label;
  END IF;

  IF v_equipment_status = 'MAINTENANCE' THEN
    ROLLBACK;
    SET p_booking_id = NULL;
    SET p_status_code = 409;
    SET p_status_message = 'Machinery is currently undergoing maintenance.';
    LEAVE proc_label;
  END IF;

  -- Check for date collisions with active bookings
  SELECT COUNT(*) INTO v_conflict_count
  FROM `bookings`
  WHERE `equipment_id` = p_equipment_id
    AND `status` IN ('PENDING', 'CONFIRMED')
    AND NOT (p_end_date < `start_date` OR p_start_date > `end_date`);

  IF v_conflict_count > 0 THEN
    ROLLBACK;
    SET p_booking_id = NULL;
    SET p_status_code = 409;
    SET p_status_message = 'Machinery is already booked for the selected date range.';
    LEAVE proc_label;
  END IF;

  -- Insert the new booking record
  INSERT INTO `bookings` (
    `renter_id`,
    `equipment_id`,
    `driver_id`,
    `start_date`,
    `end_date`,
    `total_cost`,
    `status`
  ) VALUES (
    p_renter_id,
    p_equipment_id,
    p_driver_id,
    p_start_date,
    p_end_date,
    p_total_cost,
    'PENDING'
  );

  SET p_booking_id = LAST_INSERT_ID();

  -- Automatically initialize pending payment record
  INSERT INTO `payments` (
    `booking_id`,
    `amount`,
    `payment_method`,
    `payment_status`
  ) VALUES (
    p_booking_id,
    p_total_cost,
    'UPI',
    'PENDING'
  );

  COMMIT;

  SET p_status_code = 200;
  SET p_status_message = 'Booking and payment initialized successfully.';
END //

DELIMITER ;

-- ============================================================
-- 5. TRIGGER: AUTOMATIC EQUIPMENT STATUS SYNCHRONIZATION
-- When a booking becomes CONFIRMED, mark equipment RENTED.
-- When a booking becomes COMPLETED or CANCELLED, revert to AVAILABLE.
-- ============================================================
DROP TRIGGER IF EXISTS `trg_after_booking_status_update`;

DELIMITER //

CREATE TRIGGER `trg_after_booking_status_update`
AFTER UPDATE ON `bookings`
FOR EACH ROW
BEGIN
  IF NEW.`status` = 'CONFIRMED' AND OLD.`status` <> 'CONFIRMED' THEN
    UPDATE `equipment`
    SET `status` = 'RENTED'
    WHERE `equipment_id` = NEW.`equipment_id`;
  ELSEIF (NEW.`status` = 'COMPLETED' OR NEW.`status` = 'CANCELLED')
     AND OLD.`status` = 'CONFIRMED' THEN
    -- Check if other confirmed overlapping bookings exist before marking AVAILABLE
    IF NOT EXISTS (
      SELECT 1 FROM `bookings`
      WHERE `equipment_id` = NEW.`equipment_id`
        AND `booking_id` <> NEW.`booking_id`
        AND `status` = 'CONFIRMED'
    ) THEN
      UPDATE `equipment`
      SET `status` = 'AVAILABLE'
      WHERE `equipment_id` = NEW.`equipment_id`
        AND `status` <> 'MAINTENANCE';
    END IF;
  END IF;
END //

DELIMITER ;
