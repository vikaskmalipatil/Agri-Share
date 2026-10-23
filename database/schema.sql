-- ============================================================
-- AGRI-SHARE: FARM EQUIPMENT SHARING PLATFORM
-- Database Schema | MySQL 8.0 | Normalization: 3NF
-- ============================================================
--
-- EXECUTION ORDER (in MySQL Workbench):
--   1. schema.sql   ← this file (creates tables, views, trigger, procedure)
--   2. seeds.sql    ← sample data
--   3. demo_queries.sql ← demonstration queries for viva
--
-- WHAT IS 3NF?
--   Third Normal Form means:
--   (a) Every table has a primary key.
--   (b) Every column depends on the whole primary key (no partial dependency).
--   (c) No column depends on another non-key column (no transitive dependency).
--   Example: owner details are in the 'users' table, not repeated in 'equipment'.
-- ============================================================


-- ── CREATE DATABASE ───────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS agri_share;
USE agri_share;


-- ============================================================
-- TABLE 1: users
--
-- Stores every person who uses the platform.
-- A user can be a FARMER (rents equipment), OWNER (lists
-- equipment), DRIVER (operates the machine), or ADMIN.
--
-- Why separate from equipment?
--   If we stored the owner's name inside the equipment table,
--   we would have to update it in many rows if the name changed.
--   Keeping it in users avoids this update anomaly (3NF).
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  user_id       INT           NOT NULL AUTO_INCREMENT,
  full_name     VARCHAR(120)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL  COMMENT 'Plain text for demo; PBKDF2 for real signups',
  phone         VARCHAR(25),
  role_type     ENUM('FARMER','OWNER','DRIVER','ADMIN') NOT NULL DEFAULT 'FARMER',
  address       TEXT,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (user_id),
  UNIQUE KEY uq_users_email (email)   -- no two users can share an email
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 2: equipment_types
--
-- A simple lookup (reference) table for equipment categories
-- such as Tractors, Harvesters, Irrigation Pumps, etc.
--
-- Why a separate table?
--   If we wrote "Tractors" as a plain text string inside each
--   equipment row, a typo would create a new category.
--   Having a lookup table enforces valid categories and lets us
--   rename a category in one place (3NF benefit).
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment_types (
  type_id       INT           NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(100)  NOT NULL,
  description   TEXT,

  PRIMARY KEY (type_id),
  UNIQUE KEY uq_type_name (category_name)
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 3: equipment
--
-- Lists every machine available for rent on the platform.
-- Links to 'users' (owner) and 'equipment_types' (category).
--
-- Status values:
--   AVAILABLE  - can be booked right now
--   RENTED     - currently out on a confirmed booking
--   MAINTENANCE - being repaired, cannot be booked
--
-- Constraint: daily_rate must be greater than zero.
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment (
  equipment_id INT           NOT NULL AUTO_INCREMENT,
  owner_id     INT           NOT NULL,   -- FK → users.user_id
  type_id      INT           NOT NULL,   -- FK → equipment_types.type_id
  model_name   VARCHAR(150)  NOT NULL,
  daily_rate   DECIMAL(10,2) NOT NULL,
  status       ENUM('AVAILABLE','RENTED','MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (equipment_id),

  -- Foreign keys enforce referential integrity
  CONSTRAINT fk_equip_owner
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
    ON DELETE CASCADE,    -- if owner deleted, their equipment is also removed

  CONSTRAINT fk_equip_type
    FOREIGN KEY (type_id) REFERENCES equipment_types(type_id)
    ON DELETE RESTRICT,   -- cannot delete a category that still has machines

  CONSTRAINT chk_daily_rate CHECK (daily_rate > 0)
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 4: equipment_drivers
--
-- Records which drivers are certified to operate which machine.
-- This is a MANY-TO-MANY relationship:
--   - One driver can be certified for many machines.
--   - One machine can have many certified drivers.
-- The solution is a bridge table with a composite primary key.
--
-- Viva tip: Explain why a bridge table is needed and what
--           "composite primary key" means.
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment_drivers (
  equipment_id   INT           NOT NULL,
  driver_id      INT           NOT NULL,
  driver_hr_rate DECIMAL(10,2) NOT NULL,   -- driver's hourly charge
  cert_date      DATE          NOT NULL,

  PRIMARY KEY (equipment_id, driver_id),  -- composite PK: each pair is unique

  CONSTRAINT fk_ed_equipment
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_ed_driver
    FOREIGN KEY (driver_id) REFERENCES users(user_id)
    ON DELETE CASCADE,

  CONSTRAINT chk_driver_rate CHECK (driver_hr_rate > 0)
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 5: maintenance_logs
--
-- Tracks each service or repair done on a machine.
-- One machine can have many maintenance records (1:Many).
--
-- Constraint: cost must be >= 0 (a free inspection is allowed).
-- ============================================================
CREATE TABLE IF NOT EXISTS maintenance_logs (
  log_id        INT           NOT NULL AUTO_INCREMENT,
  equipment_id  INT           NOT NULL,   -- FK → equipment
  service_date  DATE          NOT NULL,
  service_type  VARCHAR(100)  NOT NULL,
  cost          DECIMAL(10,2) NOT NULL,
  description   TEXT,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (log_id),

  CONSTRAINT fk_maint_equipment
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
    ON DELETE CASCADE,

  CONSTRAINT chk_maint_cost CHECK (cost >= 0)
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 6: bookings
--
-- A booking is a rental agreement between a farmer and a machine.
-- An optional driver can be assigned.
--
-- Status flow:
--   PENDING → CONFIRMED → COMPLETED
--   PENDING → CANCELLED
--   CONFIRMED → CANCELLED
--
-- Constraint: end_date must be >= start_date (no backwards dates).
-- Constraint: total_cost must be >= 0.
--
-- The AFTER UPDATE trigger (below) automatically changes
-- equipment.status when a booking is confirmed or cancelled.
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  booking_id   INT           NOT NULL AUTO_INCREMENT,
  renter_id    INT           NOT NULL,   -- FK → users (the farmer)
  equipment_id INT           NOT NULL,   -- FK → equipment
  driver_id    INT,                      -- FK → users (optional driver)
  start_date   DATE          NOT NULL,
  end_date     DATE          NOT NULL,
  total_cost   DECIMAL(10,2) NOT NULL,
  status       ENUM('PENDING','CONFIRMED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (booking_id),

  CONSTRAINT fk_booking_renter
    FOREIGN KEY (renter_id) REFERENCES users(user_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_booking_equipment
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_booking_driver
    FOREIGN KEY (driver_id) REFERENCES users(user_id)
    ON DELETE SET NULL,   -- if the driver is removed, keep the booking but clear the driver

  CONSTRAINT chk_dates  CHECK (end_date >= start_date),
  CONSTRAINT chk_cost   CHECK (total_cost >= 0)
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 7: payments
--
-- One payment record per booking.
-- Tracks how the farmer paid and whether it went through.
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  payment_id      INT           NOT NULL AUTO_INCREMENT,
  booking_id      INT           NOT NULL,
  amount          DECIMAL(10,2) NOT NULL,
  payment_method  ENUM('CARD','UPI','CASH','NET_BANKING') NOT NULL DEFAULT 'UPI',
  payment_status  ENUM('PENDING','SUCCESSFUL','FAILED')   NOT NULL DEFAULT 'PENDING',
  transaction_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (payment_id),

  CONSTRAINT fk_payment_booking
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
    ON DELETE CASCADE,

  CONSTRAINT chk_payment_amount CHECK (amount >= 0)
) ENGINE=InnoDB;


-- ============================================================
-- TABLE 8: reviews
--
-- A farmer can leave one review per completed booking.
-- UNIQUE KEY on booking_id enforces the one-review-per-booking rule.
-- Rating must be between 1 and 5.
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  review_id   INT       NOT NULL AUTO_INCREMENT,
  booking_id  INT       NOT NULL,
  reviewer_id INT       NOT NULL,   -- FK → users (the farmer who reviewed)
  rating      TINYINT   NOT NULL,
  comments    TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (review_id),
  UNIQUE KEY uq_review_per_booking (booking_id),  -- one review per booking only

  CONSTRAINT fk_review_booking
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_review_reviewer
    FOREIGN KEY (reviewer_id) REFERENCES users(user_id)
    ON DELETE CASCADE,

  CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;


-- ============================================================
-- VIEWS
--
-- A VIEW is a saved SELECT query that behaves like a table.
-- It does NOT store data — it reads from the base tables
-- every time you query it.
--
-- Benefits:
--   1. Simplifies complex queries — write once, use many times.
--   2. Controls what data is visible (e.g. hide owner's phone).
--
-- Viva tip: "A view is a virtual table defined by a query."
-- ============================================================


-- ------------------------------------------------------------
-- VIEW 1: view_available_equipment
--
-- Shows all machines that are currently AVAILABLE for booking.
-- Owner phone and email are NOT shown here on purpose —
-- the platform controls communication through the app.
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW view_available_equipment AS
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  e.status,
  t.category_name,
  u.full_name   AS owner_name
  -- owner phone/email intentionally excluded for privacy
FROM equipment       e
JOIN equipment_types t ON e.type_id  = t.type_id
JOIN users           u ON e.owner_id = u.user_id
WHERE e.status = 'AVAILABLE';


-- ------------------------------------------------------------
-- VIEW 2: view_booking_details
--
-- A convenient summary of every booking joined with farmer,
-- equipment, category, and driver names.
-- Useful for the admin dashboard and reports.
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW view_booking_details AS
SELECT
  b.booking_id,
  farmer.full_name              AS farmer_name,
  e.model_name                  AS equipment_name,
  t.category_name,
  owner.full_name               AS owner_name,
  driver.full_name              AS driver_name,   -- NULL if no driver
  b.start_date,
  b.end_date,
  DATEDIFF(b.end_date, b.start_date) + 1  AS rental_days,
  b.total_cost,
  b.status                      AS booking_status
FROM bookings        b
JOIN users           farmer ON b.renter_id    = farmer.user_id
JOIN equipment       e      ON b.equipment_id = e.equipment_id
JOIN equipment_types t      ON e.type_id      = t.type_id
JOIN users           owner  ON e.owner_id     = owner.user_id
LEFT JOIN users      driver ON b.driver_id    = driver.user_id;
-- LEFT JOIN for driver because the field is optional (can be NULL)


-- ------------------------------------------------------------
-- VIEW 3: view_equipment_summary
--
-- Shows each machine with:
--   - Total number of bookings
--   - Average customer rating
--   - Total maintenance money spent
--
-- FIX: maintenance cost is calculated in a separate subquery
-- BEFORE joining. If we joined bookings + maintenance_logs
-- together, each maintenance row would be repeated for every
-- booking row on the same machine, inflating the SUM.
-- Separate subqueries prevent this duplication.
--
-- Viva tip: Explain "join inflation" — this is a common
-- mistake in college projects. Show you know the fix.
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW view_equipment_summary AS
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  e.status,
  t.category_name,
  owner.full_name                    AS owner_name,

  -- Booking stats: from a subquery on bookings + reviews
  bk.total_bookings,
  bk.avg_rating,

  -- Maintenance cost: from a completely separate subquery
  -- This avoids counting maintenance rows multiple times
  mnt.total_maintenance_cost

FROM equipment       e
JOIN equipment_types t     ON e.type_id  = t.type_id
JOIN users           owner ON e.owner_id = owner.user_id

-- Subquery A: count bookings and average rating per machine
LEFT JOIN (
  SELECT
    b.equipment_id,
    COUNT(b.booking_id)      AS total_bookings,
    ROUND(AVG(r.rating), 1)  AS avg_rating
  FROM bookings b
  LEFT JOIN reviews r ON b.booking_id = r.booking_id
  GROUP BY b.equipment_id
) bk ON e.equipment_id = bk.equipment_id

-- Subquery B: sum up maintenance costs per machine (separate from bookings!)
LEFT JOIN (
  SELECT
    equipment_id,
    SUM(cost)  AS total_maintenance_cost
  FROM maintenance_logs
  GROUP BY equipment_id
) mnt ON e.equipment_id = mnt.equipment_id;


-- ============================================================
-- TRIGGER: trg_booking_status_change
--
-- A TRIGGER runs automatically when a specified event happens.
-- This trigger fires AFTER UPDATE on the bookings table, but
-- ONLY when the status column actually changes value.
--
-- What it does:
--   IF status changes TO 'CONFIRMED'
--     → mark the equipment as RENTED
--   IF status changes FROM 'CONFIRMED' TO 'COMPLETED'/'CANCELLED'
--     → check if any other booking on that machine is CONFIRMED
--     → if not, mark the equipment as AVAILABLE again
--
-- FIX: Added "NEW.status <> OLD.status" guard so the trigger
-- body only runs when the status column actually changed.
-- Without this guard, any UPDATE on the bookings row (e.g.
-- correcting a date) would incorrectly re-fire the equipment
-- status logic even though the booking status did not change.
--
-- Viva tip: "A trigger is automatic code that runs in response
--            to a database event (INSERT, UPDATE, or DELETE).
--            NEW refers to the row after the change;
--            OLD refers to the row before the change."
-- ============================================================
DROP TRIGGER IF EXISTS trg_booking_status_change;

DELIMITER //

CREATE TRIGGER trg_booking_status_change
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN

  -- Only act when the status column actually changed
  IF NEW.status <> OLD.status THEN

    -- Booking just became CONFIRMED → mark equipment RENTED
    IF NEW.status = 'CONFIRMED' THEN
      UPDATE equipment
      SET    status = 'RENTED'
      WHERE  equipment_id = NEW.equipment_id;

    -- A previously CONFIRMED booking is now COMPLETED or CANCELLED
    ELSEIF (NEW.status = 'CANCELLED' OR NEW.status = 'COMPLETED')
       AND  OLD.status = 'CONFIRMED'
    THEN
      -- Only revert to AVAILABLE if no other CONFIRMED booking exists
      -- for the same machine (handles accidental double-confirmation)
      IF NOT EXISTS (
        SELECT 1
        FROM   bookings
        WHERE  equipment_id = NEW.equipment_id
          AND  booking_id   <> NEW.booking_id
          AND  status       = 'CONFIRMED'
      ) THEN
        UPDATE equipment
        SET    status = 'AVAILABLE'
        WHERE  equipment_id = NEW.equipment_id
          AND  status <> 'MAINTENANCE';  -- never overwrite MAINTENANCE
      END IF;

    END IF;

  END IF; -- end NEW.status <> OLD.status guard

END //

DELIMITER ;


-- ============================================================
-- STORED PROCEDURE: create_booking
--
-- A STORED PROCEDURE is a saved block of SQL code that runs
-- on the database server. It accepts input parameters, does
-- validation, and returns output parameters.
--
-- This procedure:
--   1. Checks that the dates are valid (end >= start, not past).
--   2. Verifies the renter has the FARMER role.
--   3. Locks the equipment row (SELECT … FOR UPDATE) so that
--      two people cannot book the same machine simultaneously.
--   4. Checks the equipment exists and is not under MAINTENANCE.
--   5. Checks for overlapping PENDING or CONFIRMED bookings.
--   6. If a driver is supplied, checks they are certified for
--      that machine in the equipment_drivers table.
--   7. Calculates total_cost = rental_days × daily_rate.
--   8. Inserts the booking + a matching PENDING payment inside
--      a TRANSACTION (all-or-nothing).
--   9. Returns the new booking_id and a result message.
--
-- WHY "LEAVE booking_block"?
--   MySQL stored procedures exit early using LEAVE + a label.
--   We label the BEGIN...END block "booking_block" and call
--   LEAVE booking_block to jump straight to END — like a
--   simple return statement in other languages.
--
-- WHY SELECT … FOR UPDATE before the overlap check?
--   The row lock makes the database wait if another session
--   is already processing the same equipment_id. This prevents
--   two farmers from both passing the overlap check at exactly
--   the same moment and creating a double-booking.
--
-- Parameters:
--   IN  p_renter_id    - user_id of the farmer making the booking
--   IN  p_equipment_id - equipment_id to book
--   IN  p_driver_id    - driver's user_id; pass 0 for no driver
--   IN  p_start_date   - rental start date
--   IN  p_end_date     - rental end date
--   OUT p_booking_id   - returns the new booking ID (NULL on error)
--   OUT p_message      - returns a plain-English result message
--
-- Example call:
--   CALL create_booking(8, 6, 5, '2027-03-01', '2027-03-02', @bid, @msg);
--   SELECT @bid AS new_booking_id, @msg AS result;
-- ============================================================
DROP PROCEDURE IF EXISTS create_booking;

DELIMITER //

CREATE PROCEDURE create_booking (
  IN  p_renter_id    INT,
  IN  p_equipment_id INT,
  IN  p_driver_id    INT,      -- pass 0 if no driver needed
  IN  p_start_date   DATE,
  IN  p_end_date     DATE,
  OUT p_booking_id   INT,
  OUT p_message      VARCHAR(255)
)
booking_block: BEGIN   -- label the block so LEAVE can exit early

  -- Local variables
  DECLARE v_renter_role  VARCHAR(20);
  DECLARE v_status       VARCHAR(20);
  DECLARE v_daily_rate   DECIMAL(10,2);
  DECLARE v_days         INT;
  DECLARE v_cost         DECIMAL(10,2);
  DECLARE v_overlaps     INT DEFAULT 0;
  DECLARE v_cert_count   INT DEFAULT 0;
  DECLARE v_driver       INT DEFAULT NULL;

  -- Default output values
  SET p_booking_id = NULL;
  SET p_message    = '';

  -- ── Validation 1: Dates ───────────────────────────────────
  IF p_end_date < p_start_date THEN
    SET p_message = 'ERROR: End date cannot be before start date.';
    LEAVE booking_block;
  END IF;

  IF p_start_date < CURRENT_DATE() THEN
    SET p_message = 'ERROR: Start date cannot be in the past.';
    LEAVE booking_block;
  END IF;

  -- ── Validation 2: Renter must be a FARMER ────────────────
  -- Only users with role_type = 'FARMER' are allowed to rent.
  SELECT role_type INTO v_renter_role
  FROM   users
  WHERE  user_id = p_renter_id;

  IF v_renter_role IS NULL THEN
    SET p_message = 'ERROR: Renter account not found.';
    LEAVE booking_block;
  END IF;

  IF v_renter_role <> 'FARMER' THEN
    SET p_message = 'ERROR: Only users with the FARMER role can make bookings.';
    LEAVE booking_block;
  END IF;

  -- ── Validation 3: Resolve driver (0 → NULL) ──────────────
  IF p_driver_id > 0 THEN
    SET v_driver = p_driver_id;
  END IF;

  -- ── Step 4: Start transaction and lock the equipment row ──
  -- SELECT … FOR UPDATE locks this specific equipment row.
  -- Any other session trying the same equipment_id will wait
  -- here until this transaction commits or rolls back.
  -- This prevents two farmers double-booking the same machine.
  START TRANSACTION;

  SELECT status, daily_rate
  INTO   v_status, v_daily_rate
  FROM   equipment
  WHERE  equipment_id = p_equipment_id
  FOR UPDATE;   -- row-level lock acquired here

  IF v_status IS NULL THEN
    ROLLBACK;
    SET p_message = 'ERROR: Equipment not found.';
    LEAVE booking_block;
  END IF;

  IF v_status = 'MAINTENANCE' THEN
    ROLLBACK;
    SET p_message = 'ERROR: Equipment is under maintenance and cannot be booked.';
    LEAVE booking_block;
  END IF;

  -- ── Validation 5: No overlapping bookings ─────────────────
  -- This check runs AFTER the row lock so no concurrent
  -- session can sneak past with the same dates.
  -- Two date ranges [A,B] and [C,D] overlap when A<=D AND B>=C.
  SELECT COUNT(*) INTO v_overlaps
  FROM   bookings
  WHERE  equipment_id = p_equipment_id
    AND  status IN ('PENDING', 'CONFIRMED')
    AND  start_date   <= p_end_date
    AND  end_date     >= p_start_date;

  IF v_overlaps > 0 THEN
    ROLLBACK;
    SET p_message = 'ERROR: Equipment is already booked for those dates.';
    LEAVE booking_block;
  END IF;

  -- ── Validation 6: Driver certification check ─────────────
  -- If a driver was requested, verify they are listed in
  -- equipment_drivers for this specific machine.
  IF v_driver IS NOT NULL THEN
    SELECT COUNT(*) INTO v_cert_count
    FROM   equipment_drivers
    WHERE  equipment_id = p_equipment_id
      AND  driver_id    = v_driver;

    IF v_cert_count = 0 THEN
      ROLLBACK;
      SET p_message = 'ERROR: The selected driver is not certified for this equipment.';
      LEAVE booking_block;
    END IF;
  END IF;

  -- ── Step 7: Calculate total cost ──────────────────────────
  -- DATEDIFF + 1 → both the start and end days are counted.
  -- Example: Sep 1 to Sep 3 = 3 days, not 2.
  SET v_days = DATEDIFF(p_end_date, p_start_date) + 1;
  SET v_cost = v_days * v_daily_rate;

  -- ── Step 8: Insert booking and payment ───────────────────
  INSERT INTO bookings
    (renter_id, equipment_id, driver_id, start_date, end_date, total_cost, status)
  VALUES
    (p_renter_id, p_equipment_id, v_driver, p_start_date, p_end_date, v_cost, 'PENDING');

  SET p_booking_id = LAST_INSERT_ID();

  INSERT INTO payments
    (booking_id, amount, payment_method, payment_status)
  VALUES
    (p_booking_id, v_cost, 'UPI', 'PENDING');

  COMMIT;

  SET p_message = CONCAT(
    'SUCCESS: Booking #', p_booking_id,
    ' created for ', v_days, ' day(s). Total cost: Rs.', v_cost
  );

END booking_block //  -- label must match the BEGIN label above

DELIMITER ;
