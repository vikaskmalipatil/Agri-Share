-- ============================================================
-- AGRI-SHARE: DEMONSTRATION QUERIES
-- Supabase (PostgreSQL) | Run AFTER supabase_schema.sql + supabase_seeds.sql
--
-- HOW TO RUN:
--   Go to Supabase project → SQL Editor → New Query
--   Paste one query block at a time and click "Run"
--
-- TOPICS COVERED:
--   Query 1  — Basic SELECT with WHERE
--   Query 2  — INNER JOIN (two tables)
--   Query 3  — Multi-table JOIN (four tables)
--   Query 4  — LEFT JOIN (include rows with no match)
--   Query 5  — Aggregate functions: COUNT, SUM, AVG, MIN, MAX
--   Query 6  — GROUP BY with HAVING
--   Query 7  — Subquery (non-correlated)
--   Query 8  — Correlated subquery
--   Query 9  — Views
--   Query 10 — Stored Function (PostgreSQL equivalent of MySQL procedure)
--   Query 11 — Trigger demonstration
--   Query 12 — UPDATE and DELETE examples
-- ============================================================


-- ============================================================
-- QUERY 1: Basic SELECT with WHERE
--
-- Concept: Filter rows using WHERE conditions.
-- Shows: All equipment that is currently available to rent,
--        sorted from most expensive to cheapest.
--
-- Viva: "WHERE filters individual rows before any grouping."
-- ============================================================
SELECT
  equipment_id,
  model_name,
  daily_rate,
  status
FROM equipment
WHERE status = 'AVAILABLE'
ORDER BY daily_rate DESC;


-- ============================================================
-- QUERY 2: INNER JOIN (two tables)
--
-- Concept: Combine rows from two tables on a matching column.
-- Shows: Each machine with its category name.
--        INNER JOIN only shows rows that have a match in BOTH tables.
--
-- Viva: "INNER JOIN returns only rows where the join condition
--        is true in both tables."
-- ============================================================
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  e.status,
  t.category_name
FROM equipment       e
JOIN equipment_types t ON e.type_id = t.type_id
ORDER BY t.category_name;


-- ============================================================
-- QUERY 3: Multi-table JOIN
--
-- Concept: Link four tables in one query.
-- Shows: Full booking details — who rented what, from whom,
--        and who drove the machine.
--        Driver uses LEFT JOIN because driver_id can be NULL.
--
-- Viva: "We use LEFT JOIN for the driver because not every
--        booking has a driver assigned. INNER JOIN would
--        exclude those bookings from the result."
-- ============================================================
SELECT
  b.booking_id,
  farmer.full_name    AS farmer_name,
  e.model_name        AS equipment,
  t.category_name     AS category,
  owner.full_name     AS owner_name,
  driver.full_name    AS driver_name,
  b.start_date,
  b.end_date,
  b.total_cost,
  b.status
FROM bookings        b
JOIN users           farmer ON b.renter_id    = farmer.user_id
JOIN equipment       e      ON b.equipment_id = e.equipment_id
JOIN equipment_types t      ON e.type_id      = t.type_id
JOIN users           owner  ON e.owner_id     = owner.user_id
LEFT JOIN users      driver ON b.driver_id    = driver.user_id
ORDER BY b.booking_id;


-- ============================================================
-- QUERY 4: LEFT JOIN (showing rows with no match)
--
-- Concept: LEFT JOIN keeps all rows from the left table,
--          even if there is no matching row in the right table.
-- Shows: Every machine and its maintenance history.
--        Machines with NO maintenance record also appear,
--        with NULL values in the maintenance columns.
--
-- Viva: "If we used INNER JOIN, machines with no maintenance
--        would disappear from the result. LEFT JOIN ensures
--        all machines are listed."
-- ============================================================
SELECT
  e.equipment_id,
  e.model_name,
  e.status,
  m.service_date,
  m.service_type,
  m.cost          AS maintenance_cost
FROM equipment        e
LEFT JOIN maintenance_logs m ON e.equipment_id = m.equipment_id
ORDER BY e.equipment_id;


-- ============================================================
-- QUERY 5: Aggregate Functions
--
-- Concept: Functions that calculate a single result from
--          many rows: COUNT, SUM, AVG, MIN, MAX.
-- Shows: Maintenance cost statistics for every machine
--        that has at least one maintenance record.
--
-- Viva: "Aggregate functions collapse multiple rows into one
--        summary value. NULL values are ignored by SUM, AVG."
-- ============================================================
SELECT
  e.equipment_id,
  e.model_name,
  COUNT(m.log_id)      AS total_services,
  SUM(m.cost)          AS total_spent,
  AVG(m.cost)          AS avg_service_cost,
  MIN(m.cost)          AS cheapest_service,
  MAX(m.cost)          AS costliest_service,
  MAX(m.service_date)  AS last_service_date
FROM equipment        e
JOIN maintenance_logs m ON e.equipment_id = m.equipment_id
GROUP BY e.equipment_id, e.model_name;


-- ============================================================
-- QUERY 6: GROUP BY with HAVING
--
-- Concept: GROUP BY groups rows by a column value.
--          HAVING filters groups AFTER aggregation.
--          (WHERE cannot use aggregate functions.)
-- Shows: Equipment categories where the average daily rate
--        is above Rs.1500 — "premium" categories.
--
-- Viva: "WHERE filters rows; HAVING filters groups.
--        You cannot write WHERE AVG(...) because AVG is
--        calculated after grouping, not before."
-- ============================================================
SELECT
  t.category_name,
  COUNT(e.equipment_id)       AS machines_listed,
  ROUND(AVG(e.daily_rate), 2) AS avg_daily_rate,
  MIN(e.daily_rate)           AS lowest_rate,
  MAX(e.daily_rate)           AS highest_rate
FROM equipment_types t
JOIN equipment       e ON t.type_id = e.type_id
GROUP BY t.type_id, t.category_name
HAVING AVG(e.daily_rate) > 1500
ORDER BY avg_daily_rate DESC;


-- ============================================================
-- QUERY 7: Non-Correlated Subquery
--
-- Concept: A subquery is a SELECT inside another SELECT.
--          Non-correlated = the inner query runs ONCE and
--          gives its result to the outer query.
-- Shows: Farmers who have never placed any booking.
--
-- Viva: "The inner query finds all renter IDs from bookings.
--        The outer query returns users whose user_id is NOT
--        in that list. The inner query runs only once."
-- ============================================================
SELECT
  user_id,
  full_name,
  email,
  phone
FROM users
WHERE role_type = 'FARMER'
  AND user_id NOT IN (
    SELECT renter_id          -- inner query: all farmers who have booked
    FROM   bookings
  );


-- ============================================================
-- QUERY 8: Correlated Subquery
--
-- Concept: The inner query references a column from the outer
--          query, so it runs once FOR EACH outer row.
-- Shows: Machines whose daily rate is above the average
--        rate of their own category.
--
-- Viva: "A correlated subquery is re-evaluated for every row
--        in the outer query. Here, e2.type_id = e.type_id
--        links the inner query to each outer row's category."
-- ============================================================
SELECT
  e.equipment_id,
  e.model_name,
  e.daily_rate,
  t.category_name,
  ROUND(
    (SELECT AVG(e2.daily_rate)
     FROM   equipment e2
     WHERE  e2.type_id = e.type_id),  -- references outer query's e.type_id
    2
  ) AS category_avg_rate
FROM equipment       e
JOIN equipment_types t ON e.type_id = t.type_id
WHERE e.daily_rate > (
  SELECT AVG(e2.daily_rate)
  FROM   equipment e2
  WHERE  e2.type_id = e.type_id       -- same reference: per-category average
)
ORDER BY e.daily_rate DESC;


-- ============================================================
-- QUERY 9: Views
--
-- Concept: A view is a virtual table built from a saved query.
--          You query it like a regular table.
-- Shows: Three reporting views defined in supabase_schema.sql.
--
-- Viva: "Views hide complexity. Users of the view do not
--        need to know the underlying JOIN logic.
--        view_available_equipment also hides owner contact
--        details for privacy."
-- ============================================================

-- View 1: All available machines (no owner phone/email shown)
SELECT * FROM view_available_equipment;

-- View 2: Full booking details in one simple query
SELECT * FROM view_booking_details;

-- View 3: Per-machine summary with correct maintenance cost
-- (maintenance cost is calculated separately to avoid duplication)
SELECT * FROM view_equipment_summary;


-- ============================================================
-- QUERY 10: Stored Function (PostgreSQL PL/pgSQL)
--
-- Concept: PostgreSQL uses PL/pgSQL functions instead of
--          MySQL stored procedures. The function is called
--          with SELECT (or via supabase.rpc() from the app).
--
-- This call creates a new booking:
--   Farmer : Amit Hegde (user_id = 8)
--   Machine: Kirloskar Pump (equipment_id = 6, Rs.1200/day)
--   Driver : Manoj Gowda (user_id = 5)
--   Dates  : 2027-03-01 to 2027-03-02 (2 days)
--   Cost   : 2 x Rs.1200 = Rs.2400 (calculated by the function)
--
-- NOTE: In MySQL you would use CALL with OUT parameters.
--       In PostgreSQL, the function returns JSON directly.
--
-- Viva: "The function wraps all inserts in one atomic
--        transaction. If anything fails, everything rolls back."
-- ============================================================

-- Call the function and get the result as JSON
SELECT create_booking(
  8,              -- p_renter_id:    Amit Hegde
  6,              -- p_equipment_id: Kirloskar Pump
  5,              -- p_driver_id:    Manoj Gowda (use 0 for no driver)
  '2027-03-01',   -- p_start_date
  '2027-03-02'    -- p_end_date
) AS result;

-- Verify the booking was created
-- (check the most recent booking)
SELECT * FROM bookings ORDER BY booking_id DESC LIMIT 1;

-- Verify a matching payment record was also created
SELECT * FROM payments ORDER BY payment_id DESC LIMIT 1;


-- ============================================================
-- QUERY 11: Trigger Demonstration
--
-- Concept: A trigger runs automatically when a database event
--          happens (INSERT, UPDATE, DELETE).
-- Shows: When booking #2 changes from CONFIRMED to CANCELLED,
--        the trigger automatically sets equipment #2 (Kubota
--        Harvester) status back to AVAILABLE.
--
-- NOTE: In PostgreSQL, triggers require:
--   1. A TRIGGER FUNCTION (RETURNS TRIGGER)
--   2. A TRIGGER declaration attached to the table
--   Both are defined in supabase_schema.sql.
--
-- Run each step below one at a time and check the result.
--
-- Viva: "The trigger fires AFTER the UPDATE on bookings.
--        It reads NEW.status and OLD.status to decide what
--        to do. We do not need to manually update equipment."
-- ============================================================

-- Step 1: Check current status — Kubota Harvester should be RENTED
SELECT equipment_id, model_name, status
FROM   equipment
WHERE  equipment_id = 2;

-- Step 2: Cancel booking #2 — this fires the trigger
UPDATE bookings
SET    status = 'CANCELLED'
WHERE  booking_id = 2;

-- Step 3: Check again — Kubota should now be AVAILABLE (trigger did this)
SELECT equipment_id, model_name, status
FROM   equipment
WHERE  equipment_id = 2;

-- Step 4: Restore seed data to its original state for next demo
UPDATE bookings  SET status = 'CONFIRMED' WHERE booking_id = 2;
UPDATE equipment SET status = 'RENTED'    WHERE equipment_id = 2;


-- ============================================================
-- QUERY 12: UPDATE and DELETE examples
--
-- Concept: Modifying and removing data from a table.
-- These are basic DML (Data Manipulation Language) operations.
--
-- Viva: "DML includes SELECT, INSERT, UPDATE, DELETE.
--        DDL includes CREATE, DROP, ALTER."
-- ============================================================

-- Example UPDATE: Change a booking status from PENDING to CONFIRMED
-- (The trigger will also update equipment.status to RENTED)
UPDATE bookings
SET    status = 'CONFIRMED'
WHERE  booking_id = 3;

-- Verify the change
SELECT booking_id, status FROM bookings WHERE booking_id = 3;
SELECT equipment_id, status FROM equipment WHERE equipment_id = 4;

-- Example UPDATE: Update a user's phone number
UPDATE users
SET    phone = '+91-9900099001'
WHERE  user_id = 6;

-- Example DELETE: Remove a review (safe — FK allows cascade)
--
-- The UNIQUE constraint on booking_id means one review per booking.
-- We demonstrate DELETE by removing and re-inserting the existing review.

-- Step 1: Delete the existing review for booking #1
DELETE FROM reviews
WHERE  booking_id = 1;

-- Step 2: Verify it is gone
SELECT * FROM reviews;

-- Step 3: Re-insert the original review (restore seed data)
INSERT INTO reviews (review_id, booking_id, reviewer_id, rating, comments, created_at)
VALUES (1, 1, 6, 5,
  'John Deere tractor was in great condition. Driver Anand was punctual and professional.',
  '2026-09-19 14:00:00+05:30');

-- Verify it is back
SELECT * FROM reviews;

-- Restore booking #3 and equipment #4 to PENDING / AVAILABLE
UPDATE bookings  SET status = 'PENDING'    WHERE booking_id = 3;
UPDATE equipment SET status = 'AVAILABLE'  WHERE equipment_id = 4;
