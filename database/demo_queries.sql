-- ============================================================
-- AGRI-SHARE: DBMS MINI-PROJECT DEMONSTRATION QUERIES
-- Platform: MySQL 8.0 | Database: agri_share
-- Purpose: Academic Viva Demonstrations & Practical Queries
-- ============================================================

USE `agri_share`;

-- ------------------------------------------------------------
-- DEMO 1: MULTI-TABLE INNER JOIN
-- Purpose: Retrieve full rental contract details connecting
-- Renter (Farmer), Equipment, Owner, and Assigned Driver.
-- ------------------------------------------------------------
SELECT
  b.`booking_id`,
  renter.`full_name` AS `renter_farmer`,
  renter.`phone` AS `renter_phone`,
  e.`model_name` AS `machinery_model`,
  t.`category_name`,
  owner.`full_name` AS `equipment_owner`,
  COALESCE(driver.`full_name`, 'Self-Driven / None') AS `assigned_driver`,
  b.`start_date`,
  b.`end_date`,
  DATEDIFF(b.`end_date`, b.`start_date`) + 1 AS `rental_duration_days`,
  b.`total_cost`,
  b.`status` AS `booking_status`
FROM `bookings` b
JOIN `users` renter ON b.`renter_id` = renter.`user_id`
JOIN `equipment` e ON b.`equipment_id` = e.`equipment_id`
JOIN `equipment_types` t ON e.`type_id` = t.`type_id`
JOIN `users` owner ON e.`owner_id` = owner.`user_id`
LEFT JOIN `users` driver ON b.`driver_id` = driver.`user_id`
ORDER BY b.`booking_id` DESC;

-- ------------------------------------------------------------
-- DEMO 2: LEFT OUTER JOIN WITH AGGREGATE FUNCTIONS
-- Purpose: Machinery inventory status showing maintenance history
-- even for machines that have never undergone maintenance yet.
-- ------------------------------------------------------------
SELECT
  e.`equipment_id`,
  e.`model_name`,
  e.`daily_rate`,
  e.`status`,
  COUNT(m.`log_id`) AS `service_record_count`,
  COALESCE(SUM(m.`cost`), 0.00) AS `cumulative_maintenance_cost`,
  MAX(m.`service_date`) AS `last_serviced_on`
FROM `equipment` e
LEFT JOIN `maintenance_logs` m ON e.`equipment_id` = m.`equipment_id`
GROUP BY e.`equipment_id`, e.`model_name`, e.`daily_rate`, e.`status`
ORDER BY `cumulative_maintenance_cost` DESC;

-- ------------------------------------------------------------
-- DEMO 3: GROUP BY WITH HAVING CLAUSE
-- Purpose: Find equipment categories having an average rental rate
-- higher than ₹1,500/day and more than one machine listed.
-- ------------------------------------------------------------
SELECT
  t.`type_id`,
  t.`category_name`,
  COUNT(e.`equipment_id`) AS `total_units_listed`,
  ROUND(AVG(e.`daily_rate`), 2) AS `average_daily_rental_rate`,
  MIN(e.`daily_rate`) AS `min_daily_rate`,
  MAX(e.`daily_rate`) AS `max_daily_rate`
FROM `equipment_types` t
JOIN `equipment` e ON t.`type_id` = e.`type_id`
GROUP BY t.`type_id`, t.`category_name`
HAVING COUNT(e.`equipment_id`) >= 1 AND AVG(e.`daily_rate`) > 1500.00
ORDER BY `average_daily_rental_rate` DESC;

-- ------------------------------------------------------------
-- DEMO 4: NON-CORRELATED SUBQUERY WITH IN / NOT IN
-- Purpose: Identify drivers who are certified but have NOT been
-- assigned to any booking currently active or completed.
-- ------------------------------------------------------------
SELECT
  u.`user_id` AS `driver_id`,
  u.`full_name`,
  u.`phone`,
  u.`address`
FROM `users` u
WHERE u.`role_type` = 'DRIVER'
  AND u.`user_id` NOT IN (
    SELECT DISTINCT b.`driver_id`
    FROM `bookings` b
    WHERE b.`driver_id` IS NOT NULL
      AND b.`status` IN ('CONFIRMED', 'COMPLETED')
  );

-- ------------------------------------------------------------
-- DEMO 5: CORRELATED SUBQUERY
-- Purpose: Find equipment whose daily rental rate is strictly higher
-- than the average daily rate of its own specific category.
-- ------------------------------------------------------------
SELECT
  e1.`equipment_id`,
  e1.`model_name`,
  e1.`daily_rate`,
  t.`category_name`,
  ROUND((
    SELECT AVG(e2.`daily_rate`)
    FROM `equipment` e2
    WHERE e2.`type_id` = e1.`type_id`
  ), 2) AS `category_average_rate`
FROM `equipment` e1
JOIN `equipment_types` t ON e1.`type_id` = t.`type_id`
WHERE e1.`daily_rate` > (
  SELECT AVG(e2.`daily_rate`)
  FROM `equipment` e2
  WHERE e2.`type_id` = e1.`type_id`
);

-- ------------------------------------------------------------
-- DEMO 6: ADVANCED WINDOW FUNCTION (DENSE_RANK)
-- Purpose: Rank equipment within each category by daily rental rate.
-- ------------------------------------------------------------
SELECT
  t.`category_name`,
  e.`model_name`,
  e.`daily_rate`,
  DENSE_RANK() OVER (
    PARTITION BY e.`type_id`
    ORDER BY e.`daily_rate` DESC
  ) AS `price_rank_in_category`
FROM `equipment` e
JOIN `equipment_types` t ON e.`type_id` = t.`type_id`;

-- ------------------------------------------------------------
-- DEMO 7: TESTING THE DATABASE VIEWS
-- ------------------------------------------------------------
-- View 1: Available equipment for discovery
SELECT * FROM `view_available_equipment`;

-- View 2: Equipment owner revenue summary
SELECT * FROM `view_owner_revenue_summary`;

-- View 3: Equipment performance metrics
SELECT * FROM `view_equipment_performance`;

-- ------------------------------------------------------------
-- DEMO 8: CALLING THE STORED PROCEDURE
-- Purpose: Concurrency-safe booking test
-- ------------------------------------------------------------
-- Attempting a valid booking:
CALL `create_booking_safe`(
  6,                -- Farmer Vikas
  4,                -- Mahindra Tractor
  5,                -- Driver Manoj
  '2026-11-10',     -- Start Date
  '2026-11-12',     -- End Date
  7500.00,          -- Total Cost
  @out_booking_id,
  @out_status_code,
  @out_message
);

SELECT
  @out_booking_id AS `new_booking_id`,
  @out_status_code AS `status_code`,
  @out_message AS `response_message`;
