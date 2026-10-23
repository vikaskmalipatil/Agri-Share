# Agri-Share — MySQL 8.0 DBMS Mini-Project

A college DBMS mini-project database for a farm equipment sharing platform.  
Engine: **MySQL 8.0 (InnoDB)** · Normalization: **3NF** · Tables: **8**

---

## Script Execution Order

Run these scripts in MySQL Workbench in the order shown below.

| Step | File | Purpose |
|------|------|---------|
| 0 *(optional)* | `reset.sql` | **Drops** the existing `agri_share` database. Use only for a fresh start. |
| 1 | `schema.sql` | Creates the database, all 8 tables, 3 views, 1 trigger, and 1 stored procedure. |
| 2 | `seeds.sql` | Inserts sample users, equipment, bookings, payments, and reviews. |
| 3 | `demo_queries.sql` | Demonstration queries for the viva examination. |

**How to run a script in MySQL Workbench:**  
`File → Open SQL Script…` → select the file → press **Ctrl + Shift + Enter** to run.

---

## Eight Tables

```
users               – All platform users: FARMER, OWNER, DRIVER, ADMIN
equipment_types     – Category lookup: Tractors, Harvesters, Pumps, etc.
equipment           – Machines listed by owners
equipment_drivers   – Which drivers are certified for which machine (many-to-many)
maintenance_logs    – Service and repair records per machine
bookings            – Rental agreements between farmers and machines
payments            – Payment record for each booking
reviews             – Farmer ratings (1–5 stars) for completed rentals
```

---

## Why 3NF?

**Third Normal Form (3NF)** means each table is designed so that:

1. Every table has a **primary key** (1NF).
2. Every column depends on the **whole** primary key, not part of it (2NF).
3. No column depends on another **non-key** column (3NF).

**Practical examples in this schema:**

| Problem avoided | How |
|----------------|-----|
| Repeating "Tractors" in every equipment row | `equipment_types` table holds category names; `equipment` just stores the `type_id` |
| Storing owner name inside equipment | `equipment` stores `owner_id` → `users`; name lives in one place |
| Driver-machine certification in a comma list | `equipment_drivers` bridge table with composite PK `(equipment_id, driver_id)` |

---

## Table Relationships (ER Summary)

```
users ──< equipment           (one owner can list many machines)
users ──< bookings            (one farmer can make many bookings)
users ──< equipment_drivers   (one driver can be certified for many machines)
equipment_types ──< equipment (one category has many machines)
equipment ──< equipment_drivers
equipment ──< maintenance_logs
equipment ──< bookings
bookings ──── payments        (one booking → one payment record)
bookings ──── reviews         (one booking → at most one review)
```

---

## Database Objects

### Views (3)

A **view** is a saved SELECT query that works like a virtual table.  
It does not store data — it reads from base tables every time.

| View | What it shows |
|------|--------------|
| `view_available_equipment` | Machines with status = AVAILABLE. Owner phone/email are hidden on purpose. |
| `view_booking_details` | Full booking report: farmer, equipment, category, owner, driver, dates, cost, status. |
| `view_equipment_summary` | Per-machine: total bookings, average rating, and total maintenance spend. |

> **Important fix in `view_equipment_summary`:** Maintenance cost is calculated in a separate subquery **before** joining. If maintenance_logs and bookings were joined together, maintenance rows would be counted once per booking row (join inflation), giving wrong totals. Separate subqueries prevent this.

---

### Trigger (1): `trg_booking_status_change`

A **trigger** runs automatically when a database event occurs.  
This trigger fires `AFTER UPDATE` on the `bookings` table.

| Booking status change | Equipment.status result |
|-----------------------|------------------------|
| Any → `CONFIRMED` | Set to `RENTED` |
| `CONFIRMED` → `CANCELLED` or `COMPLETED` | Set back to `AVAILABLE` (if no other confirmed booking exists; never overrides `MAINTENANCE`) |

**Viva point:** "Without the trigger, a developer might forget to update equipment.status after updating a booking. The trigger makes it automatic."

---

### Stored Procedure (1): `create_booking`

A **stored procedure** is a block of SQL saved on the server.  
It accepts input parameters, runs logic, and returns output parameters.

**What it does (step by step):**
1. Checks end date ≥ start date and start date is not in the past.
2. Looks up the equipment's status and daily rate.
3. Checks for any overlapping PENDING or CONFIRMED booking.
4. Calculates `total_cost = rental_days × daily_rate` (cost is NOT passed by the caller).
5. Inserts the booking and a matching PENDING payment inside a **TRANSACTION**.

**Parameters:**

```sql
IN  p_renter_id    INT        -- user_id of the farmer
IN  p_equipment_id INT        -- which machine to book
IN  p_driver_id    INT        -- driver user_id; pass 0 for no driver
IN  p_start_date   DATE
IN  p_end_date     DATE
OUT p_booking_id   INT        -- new booking_id on success, NULL on failure
OUT p_message      VARCHAR(255) -- SUCCESS or ERROR message
```

**Example call:**
```sql
CALL create_booking(8, 6, 5, '2027-03-01', '2027-03-02', @bid, @msg);
SELECT @bid AS new_booking_id, @msg AS result;
```

**Viva point:** "A TRANSACTION means all inserts succeed together or all are rolled back. This prevents partial data — for example, a booking without a payment."

---

## Demo Accounts

Password for all demo accounts: **`Password123!`**

| Role | Name | Email |
|------|------|-------|
| ADMIN | AgriShare Admin | admin@agrishare.com |
| OWNER | Ramesh Patil | ramesh.owner@agrishare.com |
| OWNER | Suresh Kulkarni | suresh.owner@agrishare.com |
| DRIVER | Anand Kumar | anand.driver@agrishare.com |
| DRIVER | Manoj Gowda | manoj.driver@agrishare.com |
| FARMER | Vikas Mali | vikas.farmer@agrishare.com |
| FARMER | Priya Deshmukh | priya.farmer@agrishare.com |
| FARMER | Amit Hegde | amit.farmer@agrishare.com |

> The Next.js `verifyPassword()` function first checks for a plain-text match, so `Password123!` works for demo accounts without any hashing step.

---

## Viva Quick-Reference

| SQL Concept | Where to show it |
|------------|-----------------|
| Basic SELECT + WHERE | Query 1 — available equipment |
| INNER JOIN (2 tables) | Query 2 — equipment with category |
| Multi-table JOIN | Query 3 — full booking report |
| LEFT JOIN | Query 4 — maintenance history (includes machines never serviced) |
| Aggregate functions (COUNT, SUM, AVG) | Query 5 — maintenance statistics |
| GROUP BY + HAVING | Query 6 — premium categories (avg rate > Rs.1500) |
| Non-correlated subquery | Query 7 — farmers with no bookings |
| Correlated subquery | Query 8 — above-average priced machines |
| Views | Query 9 — all three views |
| Stored procedure + TRANSACTION | Query 10 — safe booking creation |
| Trigger (AFTER UPDATE) | Query 11 — automatic equipment status change |
| UPDATE + DELETE | Query 12 — basic DML examples |

---

## Common Viva Questions

**Q: What is the difference between WHERE and HAVING?**  
A: WHERE filters rows before grouping. HAVING filters groups after aggregation. You cannot use aggregate functions in WHERE.

**Q: Why use LEFT JOIN for driver in bookings?**  
A: driver_id can be NULL (booking without a driver). INNER JOIN would hide those rows. LEFT JOIN keeps all bookings in the result.

**Q: What is a composite primary key?**  
A: A primary key made of two or more columns together. Used in `equipment_drivers (equipment_id, driver_id)` because one driver can be certified for many machines and one machine can have many drivers — the combination must be unique.

**Q: What is a transaction and why is it needed?**  
A: A transaction groups multiple SQL statements so they all succeed or all fail together. In `create_booking`, we insert into bookings AND payments. If the payment insert fails, the booking is rolled back too — preventing incomplete data.

**Q: What is a trigger?**  
A: A trigger is SQL code that runs automatically in response to an INSERT, UPDATE, or DELETE on a table. Our trigger updates equipment.status automatically when a booking is confirmed or cancelled.

**Q: How does your schema satisfy 3NF?**  
A: (1) Every table has a primary key. (2) In `equipment_drivers`, both non-key columns depend on the full composite key. (3) No column depends on another non-key column — e.g. category_name is in equipment_types, not in equipment.
