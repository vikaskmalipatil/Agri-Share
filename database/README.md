# Agri-Share: MySQL 8.0 Database Documentation & Viva Guide

## 1. Overview
- **Database Engine**: MySQL 8.0 (InnoDB Storage Engine)
- **Database Name**: `agri_share`
- **Normalization Standard**: Third Normal Form (3NF)
- **Primary Keys**: `INT AUTO_INCREMENT`
- **Total Tables**: 8 core relational entities

---

## 2. Relational Schema & 3NF Normalization Analysis

### Table 1: `users`
- **Columns**: `user_id` (PK), `full_name`, `email` (UNIQUE), `password_hash`, `phone`, `role_type` (ENUM), `address`, `created_at`
- **Normalization (3NF)**: All attributes directly depend on the candidate key `user_id`. No repeating groups (1NF satisfied). No partial functional dependencies (2NF satisfied). No transitive dependencies (e.g. `address` and `phone` are atomic user details, not dependent on other non-key attributes).

### Table 2: `equipment_types`
- **Columns**: `type_id` (PK), `category_name` (UNIQUE), `description`
- **Normalization (3NF)**: Separating category into this lookup table eliminates transitive dependencies from `equipment` (`equipment_id -> type_id -> category_name`), preventing modification and deletion anomalies.

### Table 3: `equipment`
- **Columns**: `equipment_id` (PK), `owner_id` (FK -> users), `type_id` (FK -> equipment_types), `model_name`, `daily_rate` (>0), `status` (ENUM), `created_at`
- **Relationships**:
  - `owner_id` references `users(user_id)` with `ON DELETE CASCADE`.
  - `type_id` references `equipment_types(type_id)` with `ON DELETE RESTRICT` (prevents deleting an equipment type while machinery still references it).

### Table 4: `equipment_drivers`
- **Columns**: `equipment_id` (PK, FK), `driver_id` (PK, FK), `driver_hr_rate` (>0), `cert_date`
- **Normalization (3NF)**: Resolves the Many-to-Many relationship between qualified drivers and machinery models. The composite primary key is `(equipment_id, driver_id)`. `driver_hr_rate` and `cert_date` functionally depend on the entire composite key (2NF satisfied).

### Table 5: `maintenance_logs`
- **Columns**: `log_id` (PK), `equipment_id` (FK), `service_date`, `service_type`, `cost` (>=0), `description`, `created_at`
- **Normalization (3NF)**: 1-to-Many relationship tracking individual service events per equipment.

### Table 6: `bookings`
- **Columns**: `booking_id` (PK), `renter_id` (FK -> users), `equipment_id` (FK -> equipment), `driver_id` (FK -> users, nullable), `start_date`, `end_date`, `total_cost` (>=0), `status` (ENUM), `created_at`
- **Constraints**: `CHECK (end_date >= start_date)` enforces date integrity.

### Table 7: `payments`
- **Columns**: `payment_id` (PK), `booking_id` (FK -> bookings), `amount` (>=0), `payment_method` (ENUM), `payment_status` (ENUM), `transaction_time`
- **Normalization (3NF)**: Encapsulates monetary transactions separately from the contractual booking record.

### Table 8: `reviews`
- **Columns**: `review_id` (PK), `booking_id` (FK, UNIQUE), `reviewer_id` (FK -> users), `rating` (1-5), `comments`, `created_at`
- **Constraints**: `CHECK (rating BETWEEN 1 AND 5)`. `UNIQUE(booking_id)` ensures exactly one review per booking.

---

## 3. Database Objects for DBMS Viva Demonstration

### Views:
1. `view_available_equipment`: Formats available machinery with owner contact info and category metadata.
2. `view_owner_revenue_summary`: Uses `LEFT JOIN`, `GROUP BY`, and conditional aggregation (`SUM(CASE WHEN...)`) to calculate machinery counts and net earnings per owner.
3. `view_equipment_performance`: Computes average rating (`AVG(rating)`), rental frequency, and total maintenance costs per machine.

### Stored Procedure: `create_booking_safe`
- Implements concurrency control with `START TRANSACTION` and `SELECT ... FOR UPDATE`.
- Checks for overlapping booking dates on the machine before committing.
- Automatically inserts a corresponding pending payment entry in the same atomic transaction.
- Rolls back (`ROLLBACK`) on conflict or date validation error.

### Trigger: `trg_after_booking_status_update`
- Triggers on `AFTER UPDATE` of `bookings`.
- Automatically changes machine status to `RENTED` upon booking confirmation, and reverts to `AVAILABLE` upon booking completion or cancellation.

---

## 4. How to Execute in MySQL Workbench

1. Launch **MySQL Workbench** and connect to your local MySQL instance (usually `root` on `localhost:3306`).
2. Open `database/schema.sql`:
   - Click `File -> Open SQL Script...` -> select `schema.sql`.
   - Click the **Execute** lightning bolt icon ⚡ (or press `Ctrl + Shift + Enter`).
3. Open `database/seeds.sql`:
   - Click `File -> Open SQL Script...` -> select `seeds.sql`.
   - Click **Execute** ⚡ to populate the sample records.
4. Open `database/demo_queries.sql`:
   - Execute the sample queries individually or in sections during your practical viva.
5. In the **Navigator** pane on the left, right-click under **Schemas** and choose **Refresh All**. You will see `agri_share` with all 8 tables and views.
