-- ============================================================
-- AGRI-SHARE: FARM EQUIPMENT SHARING PLATFORM
-- Database Schema | Supabase (PostgreSQL) | Normalization: 3NF
-- ============================================================
--
-- EXECUTION ORDER (paste into Supabase SQL Editor):
--   1. supabase_schema.sql  ← this file
--   2. supabase_seeds.sql   ← sample data
--
-- HOW TO RUN:
--   1. Go to your Supabase project → SQL Editor
--   2. Click "New Query"
--   3. Paste this entire file and click "Run"
-- ============================================================


-- ============================================================
-- TABLE 1: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  user_id       SERIAL        PRIMARY KEY,
  full_name     VARCHAR(120)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  phone         VARCHAR(25),
  role_type     TEXT          NOT NULL DEFAULT 'FARMER'
                  CHECK (role_type IN ('FARMER','OWNER','DRIVER','ADMIN')),
  address       TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN users.password_hash IS 'Plain text for demo; PBKDF2 for real signups';


-- ============================================================
-- TABLE 2: equipment_types
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment_types (
  type_id       SERIAL        PRIMARY KEY,
  category_name VARCHAR(100)  NOT NULL UNIQUE,
  description   TEXT
);


-- ============================================================
-- TABLE 3: equipment
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment (
  equipment_id SERIAL         PRIMARY KEY,
  owner_id     INT            NOT NULL REFERENCES users(user_id)           ON DELETE CASCADE,
  type_id      INT            NOT NULL REFERENCES equipment_types(type_id) ON DELETE RESTRICT,
  model_name   VARCHAR(150)   NOT NULL,
  daily_rate   NUMERIC(10,2)  NOT NULL CHECK (daily_rate > 0),
  status       TEXT           NOT NULL DEFAULT 'AVAILABLE'
                 CHECK (status IN ('AVAILABLE','RENTED','MAINTENANCE')),
  created_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);


-- ============================================================
-- TABLE 4: equipment_drivers  (many-to-many bridge table)
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment_drivers (
  equipment_id   INT            NOT NULL REFERENCES equipment(equipment_id) ON DELETE CASCADE,
  driver_id      INT            NOT NULL REFERENCES users(user_id)          ON DELETE CASCADE,
  driver_hr_rate NUMERIC(10,2)  NOT NULL CHECK (driver_hr_rate > 0),
  cert_date      DATE           NOT NULL,

  PRIMARY KEY (equipment_id, driver_id)
);


-- ============================================================
-- TABLE 5: maintenance_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS maintenance_logs (
  log_id        SERIAL         PRIMARY KEY,
  equipment_id  INT            NOT NULL REFERENCES equipment(equipment_id) ON DELETE CASCADE,
  service_date  DATE           NOT NULL,
  service_type  VARCHAR(100)   NOT NULL,
  cost          NUMERIC(10,2)  NOT NULL CHECK (cost >= 0),
  description   TEXT,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);


-- ============================================================
-- TABLE 6: bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  booking_id   SERIAL         PRIMARY KEY,
  renter_id    INT            NOT NULL REFERENCES users(user_id)      ON DELETE CASCADE,
  equipment_id INT            NOT NULL REFERENCES equipment(equipment_id) ON DELETE CASCADE,
  driver_id    INT                     REFERENCES users(user_id)      ON DELETE SET NULL,
  start_date   DATE           NOT NULL,
  end_date     DATE           NOT NULL,
  total_cost   NUMERIC(10,2)  NOT NULL CHECK (total_cost >= 0),
  status       TEXT           NOT NULL DEFAULT 'PENDING'
                 CHECK (status IN ('PENDING','CONFIRMED','COMPLETED','CANCELLED')),
  created_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_dates CHECK (end_date >= start_date)
);


-- ============================================================
-- TABLE 7: payments
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  payment_id       SERIAL         PRIMARY KEY,
  booking_id       INT            NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
  amount           NUMERIC(10,2)  NOT NULL CHECK (amount >= 0),
  payment_method   TEXT           NOT NULL DEFAULT 'UPI'
                     CHECK (payment_method IN ('CARD','UPI','CASH','NET_BANKING')),
  payment_status   TEXT           NOT NULL DEFAULT 'PENDING'
                     CHECK (payment_status IN ('PENDING','SUCCESSFUL','FAILED')),
  transaction_time TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);


-- ============================================================
-- TABLE 8: reviews
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  review_id   SERIAL      PRIMARY KEY,
  booking_id  INT         NOT NULL UNIQUE REFERENCES bookings(booking_id) ON DELETE CASCADE,
  reviewer_id INT         NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comments    TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- VIEWS
-- ============================================================

-- VIEW 1: view_available_equipment
CREATE OR REPLACE VIEW view_available_equipment AS
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  e.status,
  t.category_name,
  u.full_name AS owner_name
FROM  equipment       e
JOIN  equipment_types t ON e.type_id  = t.type_id
JOIN  users           u ON e.owner_id = u.user_id
WHERE e.status = 'AVAILABLE';


-- VIEW 2: view_booking_details
CREATE OR REPLACE VIEW view_booking_details AS
SELECT
  b.booking_id,
  farmer.full_name                          AS farmer_name,
  e.model_name                              AS equipment_name,
  t.category_name,
  owner.full_name                           AS owner_name,
  driver.full_name                          AS driver_name,
  b.start_date,
  b.end_date,
  (b.end_date - b.start_date) + 1          AS rental_days,   -- PostgreSQL date arithmetic
  b.total_cost,
  b.status                                  AS booking_status
FROM  bookings        b
JOIN  users           farmer ON b.renter_id    = farmer.user_id
JOIN  equipment       e      ON b.equipment_id = e.equipment_id
JOIN  equipment_types t      ON e.type_id      = t.type_id
JOIN  users           owner  ON e.owner_id     = owner.user_id
LEFT JOIN users       driver ON b.driver_id    = driver.user_id;


-- VIEW 3: view_equipment_summary
CREATE OR REPLACE VIEW view_equipment_summary AS
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  e.status,
  t.category_name,
  owner.full_name            AS owner_name,
  bk.total_bookings,
  bk.avg_rating,
  mnt.total_maintenance_cost
FROM  equipment       e
JOIN  equipment_types t     ON e.type_id  = t.type_id
JOIN  users           owner ON e.owner_id = owner.user_id

LEFT JOIN (
  SELECT
    b.equipment_id,
    COUNT(b.booking_id)     AS total_bookings,
    ROUND(AVG(r.rating), 1) AS avg_rating
  FROM  bookings b
  LEFT JOIN reviews r ON b.booking_id = r.booking_id
  GROUP BY b.equipment_id
) bk  ON e.equipment_id = bk.equipment_id

LEFT JOIN (
  SELECT
    equipment_id,
    SUM(cost) AS total_maintenance_cost
  FROM  maintenance_logs
  GROUP BY equipment_id
) mnt ON e.equipment_id = mnt.equipment_id;


-- ============================================================
-- TRIGGER: trg_booking_status_change
--
-- In PostgreSQL, triggers require:
--   1. A TRIGGER FUNCTION (returns TRIGGER type)
--   2. A TRIGGER declaration that calls the function
-- ============================================================

-- Step 1: The trigger function
CREATE OR REPLACE FUNCTION fn_booking_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only act when the status column actually changed
  IF NEW.status <> OLD.status THEN

    -- Booking confirmed → mark equipment as RENTED
    IF NEW.status = 'CONFIRMED' THEN
      UPDATE equipment
      SET    status = 'RENTED'
      WHERE  equipment_id = NEW.equipment_id;

    -- Previously CONFIRMED booking is now COMPLETED or CANCELLED
    ELSIF (NEW.status = 'CANCELLED' OR NEW.status = 'COMPLETED')
       AND OLD.status = 'CONFIRMED'
    THEN
      -- Only revert to AVAILABLE if no other CONFIRMED booking exists for this machine
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
          AND  status       <> 'MAINTENANCE';  -- never overwrite MAINTENANCE
      END IF;
    END IF;

  END IF;

  RETURN NEW;
END;
$$;

-- Step 2: Attach the trigger to the bookings table
DROP TRIGGER IF EXISTS trg_booking_status_change ON bookings;

CREATE TRIGGER trg_booking_status_change
  AFTER UPDATE OF status ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION fn_booking_status_change();


-- ============================================================
-- FUNCTION: create_booking  (replaces MySQL stored procedure)
--
-- PostgreSQL uses PL/pgSQL functions instead of stored procedures.
-- Called from Next.js via: supabase.rpc('create_booking', { ... })
--
-- Parameters:
--   p_renter_id    - user_id of the farmer making the booking
--   p_equipment_id - equipment_id to book
--   p_driver_id    - driver's user_id; pass 0 for no driver
--   p_start_date   - rental start date (text 'YYYY-MM-DD')
--   p_end_date     - rental end date   (text 'YYYY-MM-DD')
--
-- Returns JSON: { booking_id, message }
-- ============================================================
CREATE OR REPLACE FUNCTION create_booking(
  p_renter_id    INT,
  p_equipment_id INT,
  p_driver_id    INT,
  p_start_date   DATE,
  p_end_date     DATE
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_renter_role  TEXT;
  v_status       TEXT;
  v_daily_rate   NUMERIC(10,2);
  v_days         INT;
  v_cost         NUMERIC(10,2);
  v_overlaps     INT;
  v_cert_count   INT;
  v_driver       INT := NULL;
  v_booking_id   INT;
BEGIN

  -- Validation 1: Dates
  IF p_end_date < p_start_date THEN
    RETURN json_build_object('error', 'ERROR: End date cannot be before start date.');
  END IF;

  IF p_start_date < CURRENT_DATE THEN
    RETURN json_build_object('error', 'ERROR: Start date cannot be in the past.');
  END IF;

  -- Validation 2: Renter must be a FARMER
  SELECT role_type INTO v_renter_role
  FROM   users
  WHERE  user_id = p_renter_id;

  IF v_renter_role IS NULL THEN
    RETURN json_build_object('error', 'ERROR: Renter account not found.');
  END IF;

  IF v_renter_role <> 'FARMER' THEN
    RETURN json_build_object('error', 'ERROR: Only users with the FARMER role can make bookings.');
  END IF;

  -- Validation 3: Resolve driver (0 → NULL)
  IF p_driver_id > 0 THEN
    v_driver := p_driver_id;
  END IF;

  -- Step 4: Lock the equipment row and check availability
  SELECT status, daily_rate
  INTO   v_status, v_daily_rate
  FROM   equipment
  WHERE  equipment_id = p_equipment_id
  FOR UPDATE;

  IF v_status IS NULL THEN
    RETURN json_build_object('error', 'ERROR: Equipment not found.');
  END IF;

  IF v_status = 'MAINTENANCE' THEN
    RETURN json_build_object('error', 'ERROR: Equipment is under maintenance and cannot be booked.');
  END IF;

  -- Validation 5: No overlapping bookings
  SELECT COUNT(*) INTO v_overlaps
  FROM   bookings
  WHERE  equipment_id = p_equipment_id
    AND  status       IN ('PENDING', 'CONFIRMED')
    AND  start_date   <= p_end_date
    AND  end_date     >= p_start_date;

  IF v_overlaps > 0 THEN
    RETURN json_build_object('error', 'ERROR: Equipment is already booked for those dates.');
  END IF;

  -- Validation 6: Driver certification check
  IF v_driver IS NOT NULL THEN
    SELECT COUNT(*) INTO v_cert_count
    FROM   equipment_drivers
    WHERE  equipment_id = p_equipment_id
      AND  driver_id    = v_driver;

    IF v_cert_count = 0 THEN
      RETURN json_build_object('error', 'ERROR: The selected driver is not certified for this equipment.');
    END IF;
  END IF;

  -- Step 7: Calculate total cost
  -- Both start and end days are counted (inclusive)
  v_days := (p_end_date - p_start_date) + 1;
  v_cost := v_days * v_daily_rate;

  -- Step 8: Insert booking + payment in one transaction block
  INSERT INTO bookings
    (renter_id, equipment_id, driver_id, start_date, end_date, total_cost, status)
  VALUES
    (p_renter_id, p_equipment_id, v_driver, p_start_date, p_end_date, v_cost, 'PENDING')
  RETURNING booking_id INTO v_booking_id;

  INSERT INTO payments
    (booking_id, amount, payment_method, payment_status)
  VALUES
    (v_booking_id, v_cost, 'UPI', 'PENDING');

  RETURN json_build_object(
    'booking_id', v_booking_id,
    'message',    format('SUCCESS: Booking #%s created for %s day(s). Total cost: Rs.%s',
                         v_booking_id, v_days, v_cost)
  );

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('error', 'ERROR: ' || SQLERRM);
END;
$$;
