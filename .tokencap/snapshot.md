<!-- TokenCap v1.6 Savings: baseline 116,158 tok → actual 61,032 tok (47.5% saved) -->
# AI ENTRY POINT

This repository has been indexed by TokenCap.

Before analyzing files, read:

.tokencap/agent/START_HERE.md

Use:

- .tokencap/agent/agent-pack.md
- .tokencap/agent/allowed-context.json
- .tokencap/agent/context-manifest.json

Do not rediscover the repository from scratch.

---

# TokenCap Snapshot

| Field | Value |
| --- | --- |
| Generated | 2026-10-25T05:54:12.957Z |
| Workspace | e:\antigravity\DBMS_MINI_PROJECT\Agri-Share |
| Profile | balanced |
| Selected files | 69 |
| Source bytes | 219942 |
| Estimated source tokens | 54304 |

## Read First

This file is a compressed coding-session handoff. Read it before editing, then inspect the referenced files directly. Prefer the live repository over this snapshot when there is a conflict.

## TokenCap Intelligence Files

- TOKENCAP_GRAPH.md — Project dependency and architecture graph *(JS/TS projects only)*
- TOKENCAP_MEMORY.md — Developer notes, current task, constraints, and context memory

## Handoff Summary

| Field | Value |
| --- | --- |
| Read order | frontend/package.json > AGENTS.md > database/supabase_reset.sql > database/supabase_seeds.sql > frontend/app/api/admin/data/route.ts |
| Primary anchors | frontend/package.json, AGENTS.md, database/supabase_reset.sql |
| Changed files | 23 |
| TODO notes | 2 |
| File budget used | 77% |
| Source budget used | 100% |
| Token estimate | 54304 |
| Contents mode | enabled |

## Handoff Guidelines

- Preserve user changes; avoid reverting unrelated work.
- Start with changed files and files marked `high-signal` in the manifest.
- Treat the Git diff as intent and verify changes in source files.
- Update this snapshot after meaningful edits or before handing off.

## Git Snapshot

| Field | Value |
| --- | --- |
| Branch | finnal |
| Git root | E:/antigravity/DBMS_MINI_PROJECT/Agri-Share |

Recent commits:
```text
16399bd feat: complete MySQL 8.0 DBMS mini-project and remove unwanted Supabase files
95027b8 feat: migrate database to MySQL 8.0 with 3NF schema, seeds, demo queries, and mysql2 server-side API integration
26604c7 feat: complete Agri-Share farm equipment rental platform
```

Status:
```text
 M frontend/.env.example
 M frontend/app/api/admin/data/route.ts
 M frontend/app/api/auth/login/route.ts
 M frontend/app/api/auth/me/route.ts
 M frontend/app/api/auth/signup/route.ts
 M frontend/app/api/bookings/route.ts
 M frontend/app/api/categories/route.ts
 M frontend/app/api/drivers/equipment/route.ts
 M frontend/app/api/equipment/[id]/route.ts
 M frontend/app/api/equipment/route.ts
 M frontend/app/api/maintenance/route.ts
 M frontend/app/api/payments/route.ts
 M frontend/lib/db.ts
 M frontend/lib/types.ts
 M frontend/package-lock.json
 M frontend/package.json
?? .tokencap/
?? AGENTS.md
?? database/supabase_demo_queries.sql
?? database/supabase_reset.sql
?? database/supabase_schema.sql
?? database/supabase_seeds.sql
?? frontend/build_output.txt
```

## Project Map

```text
.tokencap/
.tokencap/agent/
.tokencap/agent/detail/
.tokencap/brain/
.tokencap/constitution/
.tokencap/constitution/constitution-history/
.tokencap/debug/
.tokencap/graph/
.tokencap/memory/
database/
frontend/
frontend/app/
frontend/app/api/
frontend/app/api/admin/
frontend/app/api/admin/data/
frontend/app/api/auth/
frontend/app/api/auth/login/
frontend/app/api/auth/logout/
frontend/app/api/auth/me/
frontend/app/api/auth/signup/
frontend/app/api/bookings/
frontend/app/api/categories/
frontend/app/api/drivers/
frontend/app/api/drivers/equipment/
frontend/app/api/equipment/
frontend/app/api/equipment/[id]/
frontend/app/api/maintenance/
frontend/app/api/payments/
frontend/app/dashboard/
frontend/app/dashboard/admin/
frontend/app/dashboard/driver/
frontend/app/dashboard/farmer/
frontend/app/dashboard/owner/
frontend/app/equipment/
frontend/app/equipment/[id]/
frontend/app/login/
frontend/app/signup/
frontend/components/
frontend/lib/
.tokencap/agent/START_HERE.md
.tokencap/agent/agent-pack.md
.tokencap/agent/agent.json
.tokencap/agent/allowed-context.json
.tokencap/agent/architecture.md
.tokencap/agent/context-manifest.json
.tokencap/agent/detail/index.md
.tokencap/agent/model-instructions.md
.tokencap/agent/review-rules.md
.tokencap/agent/risk-map.md
.tokencap/agent/rules.md
.tokencap/agent/skills.md
.tokencap/agent/tech-stack.md
.tokencap/brain/brain-index.json
.tokencap/brain/knowledge.json
.tokencap/constitution/api-contracts.yaml
.tokencap/constitution/architecture-laws.md
.tokencap/constitution/compliance-rules.md
.tokencap/constitution/constitution-graph.html
.tokencap/constitution/constitution-history/constitution-2026-10-25.json
.tokencap/constitution/constitution.json
.tokencap/constitution/constitution.md
.tokencap/constitution/constitution.yaml
.tokencap/constitution/critical-flows.md
.tokencap/constitution/public-contracts.md
.tokencap/constitution/schema-invariants.yaml
.tokencap/constitution/security-boundaries.md
.tokencap/debug/notes.md
.tokencap/graph/summary.md
.tokencap/memory/current.md
.tokencap/memory/dev-notes.md
.tokencap/savings.json
.tokencap/stats.json
AGENTS.md
README.md
database/README.md
database/demo_queries.sql
database/reset.sql
database/schema.sql
database/seeds.sql
database/supabase_demo_queries.sql
database/supabase_reset.sql
database/supabase_schema.sql
database/supabase_seeds.sql
frontend/AGENTS.md
frontend/README.md
frontend/app/api/admin/data/route.ts
frontend/app/api/auth/login/route.ts
frontend/app/api/auth/logout/route.ts
frontend/app/api/auth/me/route.ts
frontend/app/api/auth/signup/route.ts
frontend/app/api/bookings/route.ts
frontend/app/api/categories/route.ts
frontend/app/api/drivers/equipment/route.ts
frontend/app/api/equipment/[id]/route.ts
frontend/app/api/equipment/route.ts
frontend/app/api/maintenance/route.ts
frontend/app/api/payments/route.ts
frontend/app/dashboard/admin/page.tsx
frontend/app/dashboard/driver/page.tsx
frontend/app/dashboard/farmer/page.tsx
frontend/app/dashboard/owner/page.tsx
frontend/app/equipment/[id]/page.tsx
frontend/app/equipment/page.tsx
frontend/app/globals.css
frontend/app/layout.tsx
frontend/app/login/page.tsx
frontend/app/page.tsx
frontend/app/signup/page.tsx
frontend/build_output.txt
frontend/components/Footer.tsx
frontend/components/Navbar.tsx
frontend/components/StatusBadge.tsx
frontend/eslint.config.mjs
frontend/lib/auth.ts
frontend/lib/db.ts
frontend/lib/types.ts
frontend/middleware.ts
frontend/next-env.d.ts
frontend/next.config.ts
frontend/package.json
frontend/tsconfig.json
```

## File Manifest

| File | Bytes | Score | Why |
| --- | ---: | ---: | --- |
| frontend/package.json | 600 | 190 | changed, project-metadata |
| AGENTS.md | 381 | 120 | changed |
| database/supabase_reset.sql | 1495 | 120 | changed |
| database/supabase_seeds.sql | 6997 | 120 | changed |
| frontend/app/api/admin/data/route.ts | 4794 | 120 | changed |
| frontend/app/api/auth/login/route.ts | 1742 | 120 | changed |
| frontend/app/api/auth/me/route.ts | 836 | 120 | changed |
| frontend/app/api/auth/signup/route.ts | 2490 | 120 | changed |
| frontend/app/api/bookings/route.ts | 10334 | 120 | changed |
| frontend/app/api/categories/route.ts | 655 | 120 | changed |
| frontend/app/api/drivers/equipment/route.ts | 1466 | 120 | changed |
| frontend/app/api/equipment/[id]/route.ts | 3938 | 120 | changed |
| frontend/app/api/equipment/route.ts | 5162 | 120 | changed |
| frontend/app/api/maintenance/route.ts | 6080 | 120 | changed |
| frontend/app/api/payments/route.ts | 8035 | 120 | changed |
| frontend/build_output.txt | 1695 | 120 | changed |
| frontend/lib/db.ts | 1158 | 120 | changed |
| frontend/lib/types.ts | 3657 | 120 | changed |
| database/supabase_demo_queries.sql | 13525 | 119 | changed |
| database/supabase_schema.sql | 13661 | 119 | changed |
| .tokencap/agent/START_HERE.md | 1182 | 105 | project-metadata, high-signal-doc |
| database/README.md | 8778 | 105 | project-metadata, high-signal-doc |
| frontend/README.md | 1486 | 105 | project-metadata, high-signal-doc |
| README.md | 3390 | 105 | project-metadata, high-signal-doc |
| frontend/tsconfig.json | 700 | 70 | project-metadata |
| .tokencap/agent/architecture.md | 1044 | 35 | high-signal-doc |
| .tokencap/constitution/architecture-laws.md | 1633 | 35 | high-signal-doc |
| .tokencap/agent/agent-pack.md | 3940 | 0 | context |
| .tokencap/agent/agent.json | 5233 | 0 | context |
| .tokencap/agent/allowed-context.json | 1136 | 0 | context |
| .tokencap/agent/context-manifest.json | 3438 | 0 | context |
| .tokencap/agent/detail/index.md | 463 | 0 | context |
| .tokencap/agent/model-instructions.md | 2290 | 0 | context |
| .tokencap/agent/review-rules.md | 1245 | 0 | context |
| .tokencap/agent/risk-map.md | 1349 | 0 | context |
| .tokencap/agent/rules.md | 1080 | 0 | context |
| .tokencap/agent/skills.md | 1378 | 0 | context |
| .tokencap/agent/tech-stack.md | 89 | 0 | context |
| .tokencap/brain/brain-index.json | 1569 | 0 | context |
| .tokencap/brain/knowledge.json | 8020 | 0 | context |
| .tokencap/constitution/api-contracts.yaml | 2483 | 0 | context |
| .tokencap/constitution/compliance-rules.md | 68 | 0 | context |
| .tokencap/constitution/critical-flows.md | 1316 | 0 | context |
| .tokencap/constitution/public-contracts.md | 4255 | 0 | context |
| .tokencap/constitution/schema-invariants.yaml | 1244 | 0 | context |
| .tokencap/constitution/security-boundaries.md | 407 | 0 | context |
| .tokencap/debug/notes.md | 499 | 0 | context |
| .tokencap/graph/summary.md | 3955 | 0 | context |
| .tokencap/memory/current.md | 1719 | 0 | context |
| .tokencap/memory/dev-notes.md | 1257 | 0 | context |
| .tokencap/savings.json | 2170 | 0 | context |
| .tokencap/stats.json | 1765 | 0 | context |
| database/reset.sql | 628 | 0 | context |
| database/seeds.sql | 6807 | 0 | context |
| frontend/AGENTS.md | 688 | 0 | context |
| frontend/app/api/auth/logout/route.ts | 236 | 0 | context |
| frontend/app/dashboard/driver/page.tsx | 10061 | 0 | context |
| frontend/app/dashboard/farmer/page.tsx | 8642 | 0 | context |
| frontend/app/globals.css | 514 | 0 | context |
| frontend/app/layout.tsx | 842 | 0 | context |
| frontend/app/login/page.tsx | 7325 | 0 | context |
| frontend/app/page.tsx | 9686 | 0 | context |
| frontend/components/Footer.tsx | 1409 | 0 | context |
| frontend/components/Navbar.tsx | 5482 | 0 | context |
| frontend/components/StatusBadge.tsx | 2735 | 0 | context |
| frontend/eslint.config.mjs | 483 | 0 | context |
| frontend/lib/auth.ts | 4484 | 0 | context |
| frontend/next-env.d.ts | 303 | 0 | context |
| frontend/next.config.ts | 335 | 0 | context |

## Changed Files

-  M frontend/.env.example
-  M frontend/app/api/admin/data/route.ts
-  M frontend/app/api/auth/login/route.ts
-  M frontend/app/api/auth/me/route.ts
-  M frontend/app/api/auth/signup/route.ts
-  M frontend/app/api/bookings/route.ts
-  M frontend/app/api/categories/route.ts
-  M frontend/app/api/drivers/equipment/route.ts
-  M frontend/app/api/equipment/[id]/route.ts
-  M frontend/app/api/equipment/route.ts
-  M frontend/app/api/maintenance/route.ts
-  M frontend/app/api/payments/route.ts
-  M frontend/lib/db.ts
-  M frontend/lib/types.ts
-  M frontend/package-lock.json
-  M frontend/package.json
- ?? .tokencap/
- ?? AGENTS.md
- ?? database/supabase_demo_queries.sql
- ?? database/supabase_reset.sql
- ?? database/supabase_schema.sql
- ?? database/supabase_seeds.sql
- ?? frontend/build_output.txt

## Git Diff Snippets

### Unstaged Changes Diff

```diff
// … lines 1–56
diff --git a/frontend/.env.example b/frontend/.env.example
index cf7ea98..8b1a39a 100644
--- a/frontend/.env.example
+++ b/frontend/.env.example
@@ -1,11 +1,19 @@
 # ============================================================
-# Agri-Share – MySQL 8.0 Database Configuration
+# Agri-Share – Supabase Configuration
 # ============================================================
-DB_HOST=127.0.0.1
-DB_PORT=3306
-DB_USER=root
-DB_PASSWORD=
-DB_NAME=agri_share
+# Copy this file to .env.local and fill in your values.
+# Get these from: Supabase Dashboard → Project Settings → API
+# ============================================================
+
+# Your Supabase project URL (visible in Project Settings → API)
+NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
+
+# Supabase anon/public key (safe to expose to the browser)
+NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
+
+# Supabase service role key (SECRET – never expose to the browser!)
+# Used only in server-side API routes.
+SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
 
-# Secret used to sign session cookies
+# Secret used to sign session cookies (keep this strong and private)
 SESSION_SECRET=agri_share_super_secret_college_dbms_key_2026
diff --git a/frontend/app/api/admin/data/route.ts b/frontend/app/api/admin/data/route.ts
index b2a54ae..2a6d534 100644
--- a/frontend/app/api/admin/data/route.ts
+++ b/frontend/app/api/admin/data/route.ts
@@ -1,7 +1,6 @@
 import { NextResponse } from 'next/server';
-import { query } from '@/lib/db';
+import { getSupabaseAdmin } from '@/lib/db';
 import { getSession } from '@/lib/auth';
-import type { RowDataPacket } from 'mysql2';
 
 export async function GET() {
   try {
@@ -13,100 +12,132 @@ export async function GET() {
       );
     }
 
+    const supabase = getSupabaseAdmin();
+
     // 1. All Users
-    const users = await query<RowDataPacket[]>(
-      'SELECT user_id, full_name, email, role_type, phone, address, created_at FROM users ORDER BY user_id DESC'
-    );
+    const { data: users, error: usersErr } = await supabase
+      .from('users')
// … lines 280–285
-
-interface UserRow extends RowDataPacket, AppUser {
-  password_hash: string;
-}
 
 export async function POST(request: NextRequest) {
// … lines 319–324
         { error: 'Incorrect password. Please verify your credentials.' },
@@ -44,19 +38,21 @@ export async function POST(request: NextRequest) {
       );
     }
 
-    // Set HTTP-only session cookie
// … lines 405–410
 
@@ -11,7 +10,6 @@ export async function POST(request: NextRequest) {
     const body = await request.json();
     const { full_name, email, password, role_type, phone, address } = body;
 
-    // Basic validation
// … lines 535–540
 
 export async function GET(request: NextRequest) {
   try {
@@ -35,90 +12,113 @@ export async function GET(request: NextRequest) {
     const { searchParams } = new URL(request.url);
     const role = searchParams.get('role'); // 'farmer' | 'owner' | 'driver' | 'admin'
// … lines 739–744
       return NextResponse.json(
@@ -160,84 +160,104 @@ export async function POST(request: NextRequest) {
       );
     }
 
-    // Call the stored procedure create_booking
// … lines 984–989
 
 export async function GET() {
   try {
-    const categories = await query<(RowDataPacket & EquipmentType)[]>(
-      'SELECT type_id, category_name, description FROM equipment_types ORDER BY category_name ASC'
-    );
// … lines 1023–1028
   try {
@@ -19,30 +9,36 @@ export async function GET() {
       return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
     }
 
-    const rows = await query<DriverEquipRow[]>(
// … lines 1119–1124
 
 export async function GET(
   _request: NextRequest,
@@ -40,34 +14,32 @@ export async function GET(
       return NextResponse.json({ error: 'Invalid equipment ID.' }, { status: 400 });
     }
// … lines 1252–1257
   } catch (error: unknown) {
@@ -144,11 +112,13 @@ export async function PATCH(
       return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
     }
 
-    // Update status
// … lines 1299–1304
   try {
@@ -27,84 +11,95 @@ export async function GET(request: NextRequest) {
     const status = searchParams.get('status');
     const ownerId = searchParams.get('ownerId');
 
-    const conditions: string[] = [];
// … lines 1510–1515
 
 export async function GET(request: NextRequest) {
   try {
@@ -24,48 +12,118 @@ export async function GET(request: NextRequest) {
     const { searchParams } = new URL(request.url);
     const equipId = searchParams.get('equipmentId');
// … lines 2045–2050
-    };
+export function getSupabaseAdmin(): SupabaseClient {
+  if (!adminClient) {
+    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
+    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
 

_Not shown (ask if needed): GET, POST, BookingRow, first, PATCH, DriverEquipRow, EquipmentDetailRow, DriverRow, EquipmentRow, MaintenanceRow, PaymentRow, getDbPool._
```

## TODO / FIXME / HACK Notes

- .tokencap/memory/current.md:29 - No failing test output or TODO/FIXME markers detected.
- .tokencap/memory/dev-notes.md:27 - No failing test output or TODO/FIXME markers detected.

## Selected File Context

### frontend/package.json

| Field | Value |
| --- | --- |
| Bytes | 600 |
| Score | 190 |
| Why | changed, project-metadata |
| Status | Full content |


```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.118.0",
    "next": "16.4.2",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.2",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### AGENTS.md

| Field | Value |
| --- | --- |
| Bytes | 381 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```markdown
# TokenCap Start Here

Project intelligence is generated locally in `.tokencap/`.

1. Read `.tokencap/agent/START_HERE.md`.
2. Use `.tokencap/agent/allowed-context.json` to find task-relevant files.
3. Use the connected TokenCap MCP server for overview, search, impact, memory, and debug context.
4. Do not scan the repository broadly unless the generated context is insufficient.
```

### database/supabase_reset.sql

| Field | Value |
| --- | --- |
| Bytes | 1495 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```sql
-- ============================================================
-- AGRI-SHARE: FRESH DATABASE RESET SCRIPT
-- Platform: Supabase (PostgreSQL)
--
-- PURPOSE: Completely drops all Agri-Share tables, views,
-- functions, and triggers. Run this ONLY when starting over.
--
-- WARNING: ALL DATA WILL BE PERMANENTLY DELETED.
--
-- HOW TO USE (Supabase SQL Editor):
--   1. Go to Supabase project → SQL Editor → New Query
--   2. Paste this script and click "Run"
--   3. Then run supabase_schema.sql, then supabase_seeds.sql
-- ============================================================

-- Drop views first (they depend on base tables)
DROP VIEW IF EXISTS view_equipment_summary  CASCADE;
DROP VIEW IF EXISTS view_booking_details    CASCADE;
DROP VIEW IF EXISTS view_available_equipment CASCADE;

-- Drop trigger before dropping its function
DROP TRIGGER IF EXISTS trg_booking_status_change ON bookings;

-- Drop functions
DROP FUNCTION IF EXISTS fn_booking_status_change() CASCADE;
DROP FUNCTION IF EXISTS create_booking(INT, INT, INT, DATE, DATE) CASCADE;

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS reviews            CASCADE;
DROP TABLE IF EXISTS payments           CASCADE;
DROP TABLE IF EXISTS bookings           CASCADE;
DROP TABLE IF EXISTS maintenance_logs   CASCADE;
DROP TABLE IF EXISTS equipment_drivers  CASCADE;
DROP TABLE IF EXISTS equipment          CASCADE;
DROP TABLE IF EXISTS equipment_types    CASCADE;
DROP TABLE IF EXISTS users              CASCADE;
```

### database/supabase_seeds.sql

| Field | Value |
| --- | --- |
| Bytes | 6997 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```sql
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
```

### frontend/app/api/admin/data/route.ts

| Field | Value |
| --- | --- |
| Bytes | 4794 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role_type !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator access required.' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();

    // 1. All Users
    const { data: users, error: usersErr } = await supabase
      .from('users')
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .order('user_id', { ascending: false });

    if (usersErr) throw new Error(usersErr.message);

    // 2. All Equipment with category + owner name
    const { data: equipRows, error: equipErr } = await supabase
      .from('equipment')
      .select(`
        equipment_id,
        owner_id,
        type_id,
        model_name,
        daily_rate,
        status,
        created_at,
        equipment_types ( category_name ),
        users!fk_equipment_owner ( full_name )
      `)
      .order('equipment_id', { ascending: false });

    if (equipErr) throw new Error(equipErr.message);

    const equipment = (equipRows || []).map((r: Record<string, unknown>) => {
      const eqType = r.equipment_types as Record<string, unknown> | null;
      const owner = r.users as Record<string, unknown> | null;
      return {
        equipment_id: r.equipment_id,
        owner_id: r.owner_id,
        type_id: r.type_id,
        model_name: r.model_name,
        daily_rate: Number(r.daily_rate),
        status: r.status,
        created_at: r.created_at,
        equipment_types: { category_name: eqType?.category_name || null },
        users: { full_name: owner?.full_name || null },
      };
    });

    // 3. All Bookings with equipment name + renter
    const { data: bookingsRows, error: bookingsErr } = await supabase
      .from('bookings')
      .select(`
        booking_id,
        renter_id,
        equipment_id,
        driver_id,
        start_date,
        end_date,
        total_cost,
        status,
        created_at,
        equipment!fk_booking_equipment ( model_name ),
        renter:users!fk_booking_renter ( full_name, email )
      `)
      .order('booking_id', { ascending: false });

    if (bookingsErr) throw new Error(bookingsErr.message);

    const bookings = (bookingsRows || []).map((r: Record<string, unknown>) => {
      const equip = r.equipment as Record<string, unknown> | null;
      const renter = r.renter as Record<string, unknown> | null;
      return {
        booking_id: r.booking_id,
        renter_id: r.renter_id,
        equipment_id: r.equipment_id,
        driver_id: r.driver_id,
        start_date: r.start_date,
        end_date: r.end_date,
        total_cost: Number(r.total_cost),
        status: r.status,
        created_at: r.created_at,
        equipment: { model_name: equip?.model_name || null },
        users: {
          full_name: renter?.full_name || null,
          email: renter?.email || null,
        },
      };
    });

    // 4. All Payments
    const { data: paymentsRows, error: paymentsErr } = await supabase
      .from('payments')
      .select('payment_id, booking_id, amount, payment_method, payment_status, transaction_time')
      .order('payment_id', { ascending: false });

    if (paymentsErr) throw new Error(paymentsErr.message);

    const payments = (paymentsRows || []).map((p: Record<string, unknown>) => ({
      ...p,
      amount: Number(p.amount),
    }));

    // 5. All Reviews with reviewer name
    const { data: reviews, error: reviewsErr } = await supabase
      .from('reviews')
      .select(`
        review_id,
        booking_id,
        reviewer_id,
        rating,
        comments,
        created_at,
        users!fk_review_reviewer ( full_name )
      `)
      .order('review_id', { ascending: false });

    if (reviewsErr) throw new Error(reviewsErr.message);

    const formattedReviews = (reviews || []).map((r: Record<string, unknown>) => {
      const reviewer = r.users as Record<string, unknown> | null;
      return {
        review_id: r.review_id,
        booking_id: r.booking_id,
        reviewer_id: r.reviewer_id,
        rating: r.rating,
        comments: r.comments,
        created_at: r.created_at,
        reviewer_name: reviewer?.full_name || null,
      };
    });

    return NextResponse.json({
      currentUser: session,
      users,
      equipment,
      bookings,
      payments,
      reviews: formattedReviews,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch admin overview.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/auth/login/route.ts

| Field | Value |
| --- | --- |
| Bytes | 1742 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { verifyPassword, setSession } from '@/lib/auth';
import type { AppUser } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, full_name, email, role_type, phone, address, created_at, password_hash')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.password_hash as string);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please verify your credentials.' },
        { status: 401 }
      );
    }

    const appUser: AppUser = {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_type: user.role_type,
      phone: user.phone,
      address: user.address,
      created_at: user.created_at,
    };

    await setSession(appUser);

    return NextResponse.json({
      success: true,
      user: appUser,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/auth/me/route.ts

| Field | Value |
| --- | --- |
| Bytes | 836 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const supabase = getSupabaseAdmin();
    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .eq('user_id', session.user_id)
      .single();

    if (error || !user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch {
    // If DB is temporarily disconnected, fall back to session cookie info
    const session = await getSession();
    return NextResponse.json({ user: session });
  }
}
```

### frontend/app/api/auth/signup/route.ts

| Field | Value |
| --- | --- |
| Bytes | 2490 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { hashPassword, setSession } from '@/lib/auth';
import type { AppUser, UserRole } from '@/lib/types';

const VALID_ROLES: UserRole[] = ['FARMER', 'OWNER', 'DRIVER', 'ADMIN'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, password, role_type, phone, address } = body;

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { error: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const cleanRole: UserRole = VALID_ROLES.includes(role_type) ? role_type : 'FARMER';
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabaseAdmin();

    // Check for existing account
    const { data: existing } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        full_name: full_name.trim(),
        email: cleanEmail,
        password_hash: passwordHash,
        phone: phone?.trim() || null,
        role_type: cleanRole,
        address: address?.trim() || null,
      })
      .select('user_id, full_name, email, role_type, phone, address, created_at')
      .single();

    if (insertError || !newUser) {
      throw new Error(insertError?.message || 'Failed to create account.');
    }

    const appUser: AppUser = {
      user_id: newUser.user_id,
      full_name: newUser.full_name,
      email: newUser.email,
      role_type: newUser.role_type,
      phone: newUser.phone,
      address: newUser.address,
      created_at: newUser.created_at,
    };

    await setSession(appUser);

    return NextResponse.json({ success: true, user: appUser });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'An error occurred during account registration.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/bookings/route.ts

| Field | Value |
| --- | --- |
| Bytes | 10334 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // 'farmer' | 'owner' | 'driver' | 'admin'

    const supabase = getSupabaseAdmin();

    // We need multiple joins: equipment (+ its owner), renter user, driver user
    // Supabase relation embedding handles this via foreign-key names
    let q = supabase
      .from('bookings')
      .select(`
        booking_id,
        renter_id,
        equipment_id,
        driver_id,
        start_date,
        end_date,
        total_cost,
        status,
        created_at,
        equipment!fk_booking_equipment (
          equipment_id,
          model_name,
          daily_rate,
          status,
          owner_id,
          users!fk_equipment_owner ( full_name )
        ),
        renter:users!fk_booking_renter ( full_name, phone, email ),
        driver:users!fk_booking_driver ( full_name, phone )
      `)
      .order('booking_id', { ascending: false });

    // Role-based filtering
    if (role === 'farmer' || session.role_type === 'FARMER') {
      q = q.eq('renter_id', session.user_id);
    } else if (role === 'driver' || session.role_type === 'DRIVER') {
      q = q.eq('driver_id', session.user_id);
    } else if (role === 'owner' || session.role_type === 'OWNER') {
      // For owner filtering we need to filter by equipment.owner_id
      // Supabase can filter on joined columns with the !inner modifier
      q = supabase
        .from('bookings')
        .select(`
          booking_id,
          renter_id,
          equipment_id,
          driver_id,
          start_date,
          end_date,
          total_cost,
          status,
          created_at,
          equipment!inner (
            equipment_id,
            model_name,
            daily_rate,
            status,
            owner_id,
            users!fk_equipment_owner ( full_name )
          ),
          renter:users!fk_booking_renter ( full_name, phone, email ),
          driver:users!fk_booking_driver ( full_name, phone )
        `)
        .eq('equipment.owner_id', session.user_id)
        .order('booking_id', { ascending: false });
    }
    // ADMIN sees all — no additional filter

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const bookings = (rows || []).map((r: Record<string, unknown>) => {
      const equip = r.equipment as Record<string, unknown> | null;
      const renter = r.renter as Record<string, unknown> | null;
      const driver = r.driver as Record<string, unknown> | null;
      const equipOwner = equip?.users as Record<string, unknown> | null;

      return {
        booking_id: r.booking_id,
        renter_id: r.renter_id,
        equipment_id: r.equipment_id,
        driver_id: r.driver_id,
        start_date: r.start_date,
        end_date: r.end_date,
        total_cost: Number(r.total_cost),
        status: r.status,
        created_at: r.created_at,
        equipment: equip
          ? {
              model_name: equip.model_name,
              daily_rate: Number(equip.daily_rate),
              status: equip.status,
            }
          : null,
        users: renter
          ? {
              full_name: renter.full_name,
              phone: renter.phone,
              email: renter.email,
            }
          : null,
        driver: driver?.full_name
          ? { full_name: driver.full_name, phone: driver.phone }
          : null,
        owner: {
          owner_id: equip?.owner_id,
          full_name: equipOwner?.full_name || null,
        },
      };
    });

    return NextResponse.json({ bookings });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch bookings.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to create a rental booking.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { equipment_id, driver_id, start_date, end_date } = body;

    if (!equipment_id || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Equipment ID, start date, and end date are required.' },
        { status: 400 }
      );
    }

    const equipId = Number(equipment_id);
    const driverId = driver_id ? Number(driver_id) : null;

    if (new Date(end_date) < new Date(start_date)) {
      return NextResponse.json(
        { error: 'Rental end date cannot precede start date.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Try calling the create_booking RPC function first (if it exists in Supabase)
    const { data: rpcResult, error: rpcError } = await supabase.rpc('create_booking', {
      p_renter_id: session.user_id,
      p_equipment_id: equipId,
      p_driver_id: driverId ?? 0,
      p_start_date: start_date,
      p_end_date: end_date,
    });

    if (!rpcError && rpcResult) {
      const result = typeof rpcResult === 'string' ? JSON.parse(rpcResult) : rpcResult;

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 409 });
      }

      return NextResponse.json({
        success: true,
        booking_id: result.booking_id,
        message: result.message || 'Booking created successfully.',
      });
    }

    // Fallback: manual insert if the RPC function doesn't exist
    // 1. Get daily rate from equipment
    const { data: equipRow, error: equipErr } = await supabase
      .from('equipment')
      .select('daily_rate, status')
      .eq('equipment_id', equipId)
      .single();

    if (equipErr || !equipRow) {
      return NextResponse.json({ error: 'Equipment not found.' }, { status: 404 });
    }

    if (equipRow.status === 'MAINTENANCE') {
      return NextResponse.json(
        { error: 'Equipment is under maintenance and cannot be booked.' },
        { status: 409 }
      );
    }

    const dailyRate = Number(equipRow.daily_rate);
    const rentalDays =
      Math.ceil(
        (new Date(end_date).getTime() - new Date(start_date).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    const computedCost = dailyRate * rentalDays;

    // 2. Check for overlapping bookings
    const { data: conflicts } = await supabase
      .from('bookings')
      .select('booking_id')
      .eq('equipment_id', equipId)
      .in('status', ['PENDING', 'CONFIRMED'])
      .lte('start_date', end_date)
      .gte('end_date', start_date);

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'Equipment is already booked for these selected dates.' },
        { status: 409 }
      );
    }

    // 3. Insert booking
    const { data: newBooking, error: insertErr } = await supabase
      .from('bookings')
      .insert({
        renter_id: session.user_id,
        equipment_id: equipId,
        driver_id: driverId,
        start_date,
        end_date,
        total_cost: computedCost,
        status: 'PENDING',
      })
      .select('booking_id')
      .single();

    if (insertErr) throw new Error(insertErr.message);

    // 4. Insert matching pending payment
    await supabase.from('payments').insert({
      booking_id: newBooking!.booking_id,
      amount: computedCost,
      payment_method: 'UPI',
      payment_status: 'PENDING',
    });

    return NextResponse.json({
      success: true,
      booking_id: newBooking!.booking_id,
      message: 'Booking created successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to create booking.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = await request.json();
    const { booking_id, status } = body;

    if (!booking_id || !status) {
      return NextResponse.json(
        { error: 'Booking ID and status are required.' },
        { status: 400 }
      );
    }

    if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid booking status.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const bookingIdNum = Number(booking_id);

    // Update booking status (the DB trigger will handle equipment status automatically)
    const { error: updateErr } = await supabase
      .from('bookings')
      .update({ status })
      .eq('booking_id', bookingIdNum);

    if (updateErr) throw new Error(updateErr.message);

    // Safety net: if the trigger isn't installed, manually sync equipment status
    // First get the equipment_id for this booking
    const { data: bookingRow } = await supabase
      .from('bookings')
      .select('equipment_id')
      .eq('booking_id', bookingIdNum)
      .single();

    if (bookingRow) {
      if (status === 'CONFIRMED') {
        await supabase
          .from('equipment')
          .update({ status: 'RENTED' })
          .eq('equipment_id', bookingRow.equipment_id);
      } else if (status === 'COMPLETED' || status === 'CANCELLED') {
        // Only revert if the equipment isn't under MAINTENANCE
        await supabase
          .from('equipment')
          .update({ status: 'AVAILABLE' })
          .eq('equipment_id', bookingRow.equipment_id)
          .neq('status', 'MAINTENANCE');
      }
    }

    return NextResponse.json({
      success: true,
      message: `Booking #${booking_id} status updated to ${status}.`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to update booking status.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/categories/route.ts

| Field | Value |
| --- | --- |
| Bytes | 655 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data: categories, error } = await supabase
      .from('equipment_types')
      .select('type_id, category_name, description')
      .order('category_name', { ascending: true });

    if (error) throw new Error(error.message);

    return NextResponse.json({ categories });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch equipment categories.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/drivers/equipment/route.ts

| Field | Value |
| --- | --- |
| Bytes | 1466 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data: rows, error } = await supabase
      .from('equipment_drivers')
      .select(`
        equipment_id,
        driver_id,
        driver_hr_rate,
        cert_date,
        equipment!fk_eqd_equipment ( model_name, daily_rate )
      `)
      .eq('driver_id', session.user_id);

    if (error) throw new Error(error.message);

    const eligibleEquipment = (rows || []).map((r: Record<string, unknown>) => {
      const equip = r.equipment as Record<string, unknown> | null;
      return {
        equipment_id: r.equipment_id,
        driver_id: r.driver_id,
        driver_hr_rate: Number(r.driver_hr_rate),
        cert_date: r.cert_date,
        equipment: equip
          ? {
              model_name: equip.model_name,
              daily_rate: Number(equip.daily_rate),
            }
          : null,
      };
    });

    return NextResponse.json({ eligibleEquipment });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch driver eligible equipment.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/equipment/[id]/route.ts

| Field | Value |
| --- | --- |
| Bytes | 3938 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipId = parseInt(id, 10);

    if (isNaN(equipId) || equipId <= 0) {
      return NextResponse.json({ error: 'Invalid equipment ID.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Fetch equipment record with owner and type
    const { data: row, error } = await supabase
      .from('equipment')
      .select(`
        equipment_id,
        owner_id,
        type_id,
        model_name,
        daily_rate,
        status,
        created_at,
        equipment_types ( category_name, description ),
        users!fk_equipment_owner ( full_name, phone, email )
      `)
      .eq('equipment_id', equipId)
      .single();

    if (error || !row) {
      return NextResponse.json({ error: 'Equipment not found.' }, { status: 404 });
    }

    const eqType = row.equipment_types as unknown as Record<string, unknown> | null;
    const owner = row.users as unknown as Record<string, unknown> | null;

    const equipment = {
      equipment_id: row.equipment_id,
      owner_id: row.owner_id,
      type_id: row.type_id,
      model_name: row.model_name,
      daily_rate: Number(row.daily_rate),
      status: row.status,
      created_at: row.created_at,
      equipment_types: eqType
        ? { category_name: eqType.category_name, description: eqType.description }
        : null,
      users: owner
        ? { full_name: owner.full_name, phone: owner.phone, email: owner.email }
        : null,
    };

    // 2. Fetch certified drivers for this equipment
    const { data: driverRows, error: driverErr } = await supabase
      .from('equipment_drivers')
      .select(`
        equipment_id,
        driver_id,
        driver_hr_rate,
        cert_date,
        users!fk_eqd_driver ( full_name, phone, email )
      `)
      .eq('equipment_id', equipId);

    if (driverErr) throw new Error(driverErr.message);

    const drivers = (driverRows || []).map((d: Record<string, unknown>) => {
      const driverUser = d.users as Record<string, unknown> | null;
      return {
        equipment_id: d.equipment_id,
        driver_id: d.driver_id,
        driver_hr_rate: Number(d.driver_hr_rate),
        cert_date: d.cert_date,
        users: driverUser
          ? { full_name: driverUser.full_name, phone: driverUser.phone, email: driverUser.email }
          : null,
      };
    });

    return NextResponse.json({ equipment, drivers });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch equipment details.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { id } = await params;
    const equipId = parseInt(id, 10);
    const body = await request.json();
    const { status } = body;

    if (!['AVAILABLE', 'RENTED', 'MAINTENANCE'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('equipment')
      .update({ status })
      .eq('equipment_id', equipId);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, message: 'Equipment status updated.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to update equipment.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/equipment/route.ts

| Field | Value |
| --- | --- |
| Bytes | 5162 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const maxPrice = searchParams.get('maxPrice');
    const status = searchParams.get('status');
    const ownerId = searchParams.get('ownerId');

    const supabase = getSupabaseAdmin();

    // Build the query with Supabase's select + join syntax
    // equipment_types!inner(...) and users!fk_equipment_owner(...)
    let q = supabase
      .from('equipment')
      .select(`
        equipment_id,
        owner_id,
        type_id,
        model_name,
        daily_rate,
        status,
        created_at,
        equipment_types ( type_id, category_name, description ),
        users!fk_equipment_owner ( full_name, phone, email )
      `)
      .order('equipment_id', { ascending: false });

    // Filter by status
    if (status && status !== 'ALL') {
      q = q.eq('status', status);
    } else if (!status && !ownerId) {
      // Default catalog view: only AVAILABLE machines
      q = q.eq('status', 'AVAILABLE');
    }

    if (ownerId) {
      q = q.eq('owner_id', Number(ownerId));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      q = q.lte('daily_rate', Number(maxPrice));
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      q = q.or(`model_name.ilike.${term}`);
    }

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    // Filter by category name in-memory if requested
    // (Supabase doesn't easily filter by joined table column in .or())
    let equipment = (rows || []).map((r: Record<string, unknown>) => {
      const eqType = r.equipment_types as Record<string, unknown> | null;
      const owner = r.users as Record<string, unknown> | null;
      return {
        equipment_id: r.equipment_id,
        owner_id: r.owner_id,
        type_id: r.type_id,
        model_name: r.model_name,
        daily_rate: Number(r.daily_rate),
        status: r.status,
        created_at: r.created_at,
        equipment_types: eqType
          ? {
              type_id: eqType.type_id,
              category_name: eqType.category_name,
              description: eqType.description,
            }
          : null,
        users: owner
          ? {
              full_name: owner.full_name,
              phone: owner.phone,
              email: owner.email,
            }
          : null,
      };
    });

    // Category filter (applied post-fetch since it's on a joined table)
    if (category && category !== 'ALL') {
      equipment = equipment.filter(
        (e) => e.equipment_types?.category_name === category
      );
    }

    // Search in category_name too (in addition to model_name filtered above)
    if (search && search.trim()) {
      const lowerSearch = search.trim().toLowerCase();
      equipment = equipment.filter(
        (e) =>
          e.model_name?.toString().toLowerCase().includes(lowerSearch) ||
          e.equipment_types?.category_name?.toString().toLowerCase().includes(lowerSearch)
      );
    }

    return NextResponse.json({ equipment });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to query equipment list.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role_type !== 'OWNER' && session.role_type !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Only registered owners and admins can list machinery.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { model_name, type_id, daily_rate } = body;

    if (!model_name || !type_id || !daily_rate) {
      return NextResponse.json(
        { error: 'Model name, equipment category, and daily rental rate are required.' },
        { status: 400 }
      );
    }

    const rateNum = Number(daily_rate);
    if (isNaN(rateNum) || rateNum <= 0) {
      return NextResponse.json(
        { error: 'Daily rate must be a positive number.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: newEquip, error } = await supabase
      .from('equipment')
      .insert({
        owner_id: session.user_id,
        type_id: Number(type_id),
        model_name: model_name.trim(),
        daily_rate: rateNum,
        status: 'AVAILABLE',
      })
      .select('equipment_id')
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      equipment_id: newEquip?.equipment_id,
      message: 'Machinery listed successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to insert equipment record.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/maintenance/route.ts

| Field | Value |
| --- | --- |
| Bytes | 6080 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const equipId = searchParams.get('equipmentId');

    const supabase = getSupabaseAdmin();

    if (equipId) {
      // Filter by specific equipment
      const { data: rows, error } = await supabase
        .from('maintenance_logs')
        .select(`
          log_id,
          equipment_id,
          service_date,
          service_type,
          cost,
          description,
          equipment!fk_maint_equipment ( model_name )
        `)
        .eq('equipment_id', Number(equipId))
        .order('service_date', { ascending: false });

      if (error) throw new Error(error.message);

      const logs = (rows || []).map((r: Record<string, unknown>) => {
        const equip = r.equipment as Record<string, unknown> | null;
        return {
          log_id: r.log_id,
          equipment_id: r.equipment_id,
          service_date: r.service_date,
          service_type: r.service_type,
          cost: Number(r.cost),
          description: r.description,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ logs });
    } else if (session.role_type === 'OWNER') {
      // Owner: get maintenance for their own equipment only
      // First get their equipment IDs
      const { data: equipRows } = await supabase
        .from('equipment')
        .select('equipment_id')
        .eq('owner_id', session.user_id);

      const ownerEquipIds = (equipRows || []).map(
        (e: Record<string, unknown>) => e.equipment_id as number
      );

      if (ownerEquipIds.length === 0) {
        return NextResponse.json({ logs: [] });
      }

      const { data: rows, error } = await supabase
        .from('maintenance_logs')
        .select(`
          log_id,
          equipment_id,
          service_date,
          service_type,
          cost,
          description,
          equipment!fk_maint_equipment ( model_name )
        `)
        .in('equipment_id', ownerEquipIds)
        .order('service_date', { ascending: false });

      if (error) throw new Error(error.message);

      const logs = (rows || []).map((r: Record<string, unknown>) => {
        const equip = r.equipment as Record<string, unknown> | null;
        return {
          log_id: r.log_id,
          equipment_id: r.equipment_id,
          service_date: r.service_date,
          service_type: r.service_type,
          cost: Number(r.cost),
          description: r.description,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ logs });
    } else {
      // Admin or others: all logs
      const { data: rows, error } = await supabase
        .from('maintenance_logs')
        .select(`
          log_id,
          equipment_id,
          service_date,
          service_type,
          cost,
          description,
          equipment!fk_maint_equipment ( model_name )
        `)
        .order('service_date', { ascending: false });

      if (error) throw new Error(error.message);

      const logs = (rows || []).map((r: Record<string, unknown>) => {
        const equip = r.equipment as Record<string, unknown> | null;
        return {
          log_id: r.log_id,
          equipment_id: r.equipment_id,
          service_date: r.service_date,
          service_type: r.service_type,
          cost: Number(r.cost),
          description: r.description,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ logs });
    }
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch maintenance logs.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role_type !== 'OWNER' && session.role_type !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Only owners or admins can log maintenance.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { equipment_id, service_type, cost, description, service_date, set_maintenance_status } = body;

    if (!equipment_id || !service_type || cost === undefined) {
      return NextResponse.json(
        { error: 'Equipment ID, service type, and cost are required.' },
        { status: 400 }
      );
    }

    const costNum = Number(cost);
    if (isNaN(costNum) || costNum < 0) {
      return NextResponse.json(
        { error: 'Maintenance cost must be a non-negative number.' },
        { status: 400 }
      );
    }

    const sDate = service_date || new Date().toISOString().slice(0, 10);

    const supabase = getSupabaseAdmin();

    const { data: newLog, error } = await supabase
      .from('maintenance_logs')
      .insert({
        equipment_id: Number(equipment_id),
        service_date: sDate,
        service_type: service_type.trim(),
        cost: costNum,
        description: description?.trim() || null,
      })
      .select('log_id')
      .single();

    if (error) throw new Error(error.message);

    // Optionally set equipment to MAINTENANCE status
    if (set_maintenance_status) {
      await supabase
        .from('equipment')
        .update({ status: 'MAINTENANCE' })
        .eq('equipment_id', Number(equipment_id));
    }

    return NextResponse.json({
      success: true,
      log_id: newLog?.log_id,
      message: 'Maintenance log recorded successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to record maintenance log.' },
      { status: 500 }
    );
  }
}
```

### frontend/app/api/payments/route.ts

| Field | Value |
| --- | --- |
| Bytes | 8035 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    const supabase = getSupabaseAdmin();

    if (bookingId) {
      // Filter by specific booking
      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .eq('booking_id', Number(bookingId))
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    }

    // Role-based filtering
    if (session.role_type === 'FARMER') {
      // Get farmer's booking IDs first
      const { data: farmerBookings } = await supabase
        .from('bookings')
        .select('booking_id')
        .eq('renter_id', session.user_id);

      const bookingIds = (farmerBookings || []).map(
        (b: Record<string, unknown>) => b.booking_id as number
      );

      if (bookingIds.length === 0) {
        return NextResponse.json({ payments: [] });
      }

      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .in('booking_id', bookingIds)
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    } else if (session.role_type === 'OWNER') {
      // Get owner's equipment IDs, then bookings, then payments
      const { data: ownerEquip } = await supabase
        .from('equipment')
        .select('equipment_id')
        .eq('owner_id', session.user_id);

      const equipIds = (ownerEquip || []).map(
        (e: Record<string, unknown>) => e.equipment_id as number
      );

      if (equipIds.length === 0) {
        return NextResponse.json({ payments: [] });
      }

      const { data: ownerBookings } = await supabase
        .from('bookings')
        .select('booking_id')
        .in('equipment_id', equipIds);

      const bookingIds = (ownerBookings || []).map(
        (b: Record<string, unknown>) => b.booking_id as number
      );

      if (bookingIds.length === 0) {
        return NextResponse.json({ payments: [] });
      }

      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .in('booking_id', bookingIds)
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    } else {
      // ADMIN or others: all payments
      const { data: rows, error } = await supabase
        .from('payments')
        .select(`
          payment_id,
          booking_id,
          amount,
          payment_method,
          payment_status,
          transaction_time,
          bookings!fk_payment_booking (
            renter_id,
            equipment_id,
            equipment!fk_booking_equipment ( model_name )
          )
        `)
        .order('payment_id', { ascending: false });

      if (error) throw new Error(error.message);

      const payments = (rows || []).map((r: Record<string, unknown>) => {
        const booking = r.bookings as Record<string, unknown> | null;
        const equip = booking?.equipment as Record<string, unknown> | null;
        return {
          payment_id: r.payment_id,
          booking_id: r.booking_id,
          amount: Number(r.amount),
          payment_method: r.payment_method,
          payment_status: r.payment_status,
          transaction_time: r.transaction_time,
          model_name: equip?.model_name || null,
        };
      });

      return NextResponse.json({ payments });
    }
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch payment records.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = await request.json();
    const { booking_id, amount, payment_method } = body;

    if (!booking_id || !amount) {
      return NextResponse.json(
        { error: 'Booking ID and amount are required.' },
        { status: 400 }
      );
    }

    const method = ['CARD', 'UPI', 'CASH', 'NET_BANKING'].includes(payment_method)
      ? payment_method
      : 'UPI';

    const supabase = getSupabaseAdmin();

    const { data: newPayment, error } = await supabase
      .from('payments')
      .insert({
        booking_id: Number(booking_id),
        amount: Number(amount),
        payment_method: method,
        payment_status: 'SUCCESSFUL',
      })
      .select('payment_id')
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      payment_id: newPayment?.payment_id,
      message: 'Payment recorded successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to process payment.' },
      { status: 500 }
    );
  }
}
```

### frontend/build_output.txt

| Field | Value |
| --- | --- |
| Bytes | 1695 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```txt
﻿Γû▓ Next.js 16.4.2 (Turbopack)
Γ£ô Running next.config.ts took 38ms
- Cache Components enabled
- Partial Prefetching enabled

node.exe : ΓÜá The 
"middleware" file 
convention is deprecated. 
Please use "proxy" instead.
At C:\Program 
Files\nodejs\npx.ps1:29 
char:3
+   & $NODE_EXE 
$NPX_CLI_JS $args
+   ~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~
    + CategoryInfo         
     : NotSpecified: (ΓÜá  
   The "middle...proxy"    
 instead.:String) [], R    
emoteException
    + FullyQualifiedErrorI 
   d : NativeCommandError
 

  To migrate 
automatically, run:
  npx @next/codemod@canary 
middleware-to-proxy .

  Learn more: https://nextj
s.org/docs/messages/middlew
are-to-proxy
  Creating an optimized production build ...
Γ£ô Compiled successfully in 1173ms
  Running TypeScript ...
  Finished TypeScript in 1761ms ...
  Collecting page data using 11 workers ...
Error: Failed to collect 
configuration for 
/api/payments
    at ignore-listed 
frames {
  [cause]: Error: Missing 
Supabase environment 
variables. Add 
NEXT_PUBLIC_SUPABASE_URL 
and 
SUPABASE_SERVICE_ROLE_KEY 
to .env.local
      at module evaluation 
(lib\db.ts:13:9)
      at module evaluation 
(app\api\payments\route.ts:
2:1)
    11 |
    12 | if (!supabaseUrl 
|| !supabaseServiceKey) {
  > 13 |   throw new Error(
       |         ^
    14 |     'Missing 
Supabase environment 
variables. ' +
    15 |     'Add 
NEXT_PUBLIC_SUPABASE_URL 
and 
SUPABASE_SERVICE_ROLE_KEY 
to .env.local'
    16 |   );
}

> Build error occurred
Error: Failed to collect 
page data for /api/payments
    at ignore-listed 
frames {
  type: 'Error'
}
```

### frontend/lib/db.ts

| Field | Value |
| --- | --- |
| Bytes | 1158 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
// ============================================================
// Agri-Share – Supabase Client (Server-Side)
// Uses the service role key for trusted server-side API routes.
// NEVER import this file in client components.
// ============================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singleton admin client (service role – bypasses Row Level Security)
let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Missing Supabase environment variables. ' +
        'Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local'
      );
    }

    adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return adminClient;
}

// Re-export for convenience
export { SupabaseClient };
```

### frontend/lib/types.ts

| Field | Value |
| --- | --- |
| Bytes | 3657 |
| Score | 120 |
| Why | changed |
| Status | Full content |


```ts
// ============================================================
// Agri-Share – Shared TypeScript type definitions
// Mirrors the Supabase PostgreSQL schema.
// ============================================================

export type UserRole = 'FARMER' | 'OWNER' | 'DRIVER' | 'ADMIN';
export type EquipmentStatus = 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type PaymentMethod = 'CARD' | 'UPI' | 'CASH' | 'NET_BANKING';
export type PaymentStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED';

// ── public.users ────────────────────────────────────────────
export interface AppUser {
  user_id: number;
  full_name: string;
  phone: string | null;
  email: string;
  role_type: UserRole;
  address: string | null;
  created_at: string;
  password_hash?: string;
}

// ── public.equipment_types ──────────────────────────────────
export interface EquipmentType {
  type_id: number;
  category_name: string;
  description: string | null;
}

// ── public.equipment ────────────────────────────────────────
export interface Equipment {
  equipment_id: number;
  owner_id: number;
  type_id: number;
  model_name: string;
  daily_rate: number;
  status: EquipmentStatus;
  /** Populated when joined with equipment_types */
  equipment_types?: EquipmentType | null;
  /** Populated when joined with users (owner) */
  users?: Pick<AppUser, 'full_name' | 'phone'> | null;
}

// ── public.equipment_drivers ────────────────────────────────
export interface EquipmentDriver {
  equipment_id: number;
  driver_id: number;
  driver_hr_rate: number;
  cert_date: string;
  /** Populated when joined with users (driver) */
  users?: Pick<AppUser, 'full_name' | 'phone'> | null;
}

// ── public.maintenance_logs ─────────────────────────────────
export interface MaintenanceLog {
  log_id: number;
  equipment_id: number;
  service_date: string;
  service_type: string;
  cost: number;
  description: string | null;
}

// ── public.bookings ─────────────────────────────────────────
export interface Booking {
  booking_id: number;
  renter_id: number;
  equipment_id: number;
  driver_id: number | null;
  start_date: string;
  end_date: string;
  total_cost: number;
  status: BookingStatus;
  /** Populated when joined */
  equipment?: Pick<Equipment, 'model_name' | 'daily_rate' | 'status'> | null;
  users?: Pick<AppUser, 'full_name' | 'email'> | null;
}

// ── public.payments ─────────────────────────────────────────
export interface Payment {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  transaction_time: string;
}

// ── public.reviews ──────────────────────────────────────────
export interface Review {
  review_id: number;
  booking_id: number;
  reviewer_id: number;
  rating: number; // 1–5
  comments: string | null;
  created_at: string;
}
```

### database/supabase_demo_queries.sql

| Field | Value |
| --- | --- |
| Bytes | 13525 |
| Score | 119 |
| Why | changed |
| Status | Full content |


```sql
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
```

### database/supabase_schema.sql

| Field | Value |
| --- | --- |
| Bytes | 13661 |
| Score | 119 |
| Why | changed |
| Status | Full content |


```sql
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
```

### .tokencap/agent/START_HERE.md

| Field | Value |
| --- | --- |
| Bytes | 1182 |
| Score | 105 |
| Why | project-metadata, high-signal-doc |
| Status | Full content |


```markdown
# START HERE - Agri-Share

> Generated by TokenCap - 2026-10-25T05:51:54.627Z

Project type: Unknown
Architecture: Modular

## Read in This Order

1. `allowed-context.json` - locate files for the current task.
2. `detail/index.md` - choose only the intelligence needed.
3. Use TokenCap MCP for overview, search, impact, memory, and debug context.

## Critical Areas

- [HIGH] API - HIGH
- [HIGH] Authentication - HIGH

## Review Groups

- **API Review Group**: route.ts, route.ts, route.ts
- **Authentication Review Group**: route.ts, route.ts, route.ts

## Non-Negotiable Rules

- Core library code lives in lib/ - keep it framework-agnostic
- UI components live in components/ - keep them presentational
- App Router entry points live in app/ - follow Next.js file conventions

## Detail Map

- `agent-pack.md`: full onboarding and architecture context
- `architecture.md`: dependency chains and boundaries
- `rules.md` and `review-rules.md`: conventions and review scope
- `risk-map.md`: high-risk files before editing
- `tech-stack.md` and `skills.md`: platform-specific context

Do not scan the repository broadly unless the generated context and MCP results are insufficient.
```

### database/README.md

| Field | Value |
| --- | --- |
| Bytes | 8778 |
| Score | 105 |
| Why | project-metadata, high-signal-doc |
| Status | Full content |


```markdown
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
```

### frontend/README.md

| Field | Value |
| --- | --- |
| Bytes | 1486 |
| Score | 105 |
| Why | project-metadata, high-signal-doc |
| Status | Full content |


```markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```

### README.md

| Field | Value |
| --- | --- |
| Bytes | 3390 |
| Score | 105 |
| Why | project-metadata, high-signal-doc |
| Status | Full content |


```markdown
# Agri-Share — Farm Equipment Rental Platform

Agri-Share is a peer-to-peer agricultural machinery and equipment sharing web application and DBMS mini-project built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MySQL 8.0**.

---

## 🚜 Problem & Solution

- **Problem**: Small and medium-scale farmers cannot afford high-capital farm machinery needed only during seasonal windows (plowing, sowing, harvesting). Meanwhile, equipment owners often have machinery sitting idle between seasons.
- **Solution**: Agri-Share bridges local farmers and machinery owners through an intuitive rental platform with verified equipment listings, operator selection, date-overlap validation, and role-based management.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend & Database**: MySQL 8.0 (InnoDB) with `mysql2` connection pool
- **Architecture**: 3NF Normalized Relational Schema (8 tables, views, triggers, and stored procedures)

---

## 📂 Project Architecture

```
Agri-Share/
├── database/                           # MySQL 8.0 DBMS Mini-Project files
│   ├── schema.sql                      # Complete 3NF DDL schema, views, trigger, procedure
│   ├── seeds.sql                       # Sample seed data for testing
│   ├── demo_queries.sql                # Academic DBMS demo queries for viva
│   ├── reset.sql                       # Clean database reset script
│   └── README.md                       # Database docs & viva preparation guide
└── frontend/                           # Next.js web application
    ├── app/                            # App Router pages & API endpoints
    │   ├── api/                        # Server-side MySQL API routes
    │   ├── dashboard/                  # Role-based dashboards (Farmer, Owner, Driver, Admin)
    │   ├── equipment/                  # Equipment catalog and booking
    │   ├── login/                      # Authentication
    │   └── signup/                     # User registration
    ├── components/                     # Shared UI components (Navbar, Footer, StatusBadge)
    ├── lib/                            # MySQL connection pool, auth helpers, types
    └── middleware.ts                   # Route protection middleware
```

---

## 🚀 Getting Started

### 1. Database Setup (MySQL 8.0)
Open **MySQL Workbench** and execute the scripts in `database/` in this exact order:
1. `database/schema.sql` (Creates database `agri_share`, tables, views, trigger, and procedure)
2. `database/seeds.sql` (Loads initial sample data)
3. `database/demo_queries.sql` (Runs viva demonstration queries)

### 2. Configure Environment Variables
Inside `frontend/`, create `.env.local` (or copy from `.env.example`):
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=agri_share

SESSION_SECRET=[REDACTED:SECRET]
```

### 3. Install Dependencies & Run
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 License
Academic DBMS Mini-Project. Developed for Agri-Share farm equipment sharing.
```

### frontend/tsconfig.json

| Field | Value |
| --- | --- |
| Bytes | 700 |
| Score | 70 |
| Why | project-metadata |
| Status | Full content |


```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### .tokencap/agent/architecture.md

| Field | Value |
| --- | --- |
| Bytes | 1044 |
| Score | 35 |
| Why | high-signal-doc |
| Status | Full content |


```markdown
# Architecture - Agri-Share

> Generated by TokenCap v0.8 - 2026-10-25T05:51:54.620Z

---

## Overview

No end-to-end layered dependency chain was verified from the import graph; treat this repository as modular until a concrete flow is established. Middleware modules are present; inspect their imports before treating them as request-wide interceptors. **API** is the largest detected subsystem by file count. Detected subsystems: API, Frontend, Authentication, Dashboard, Config.

---

## Architecture Pattern

```
Modular
```

---

## Subsystems

| Cluster | Files | Risk | Central File |
| --- | --- | --- | --- |
| **API** | 9 | [HIGH] HIGH | `route.ts` |
| **Frontend** | 7 | [LOW] LOW | `page.tsx` |
| **Authentication** | 6 | [HIGH] HIGH | `route.ts` |
| **Dashboard** | 4 | [LOW] LOW | `page.tsx` |
| **Config** | 3 | [LOW] LOW | `eslint.config.mjs` |
| **Unclassified** | 2 | [LOW] LOW | `api-contracts.yaml` |
| **Database** | 2 | [MEDIUM] MEDIUM | `schema-invariants.yaml` |
| **Lib (types)** | 2 | [MEDIUM] MEDIUM | `types.ts` |
```

### .tokencap/constitution/architecture-laws.md

| Field | Value |
| --- | --- |
| Bytes | 1633 |
| Score | 35 |
| Why | high-signal-doc |
| Status | Full content |


```markdown
# Architecture Laws

> TokenCap Constitution Engine

## 🟠 CONST-ARCH-001 — HIGH

**Services cannot import UI components.**

> **Why:** Importing UI components into services couples server-side logic to browser rendering. This breaks SSR, testability, and separation of concerns.

> **What breaks:** Server-side services gain browser-only dependencies. Unit tests for services fail. SSR breaks.

## 🟠 CONST-ARCH-002 — HIGH

**Controllers cannot access the database directly.**

> **Why:** Direct DB access in controllers bypasses the service layer. This breaks the layered architecture and makes logic untestable.

> **What breaks:** Business logic leaks into controllers. Database coupling makes refactoring expensive.

## 🟠 CONST-ARCH-003 — HIGH

**Route handlers cannot access the database directly.**

> **Why:** Routes should delegate to services/controllers, not query the database themselves.

> **What breaks:** Business logic scattered across route files. Impossible to test in isolation.

## 🟠 CONST-ARCH-004 — HIGH

**UI components cannot import server-only modules.**

> **Why:** Server-only modules may contain secrets or Node.js-only APIs that crash in the browser.

> **What breaks:** Build errors in browser environments. Potential secret exposure.

## 🟠 CONST-ARCH-005 — HIGH

**High-impact clusters (Other, Database, API) must not gain new circular dependencies.**

> **Why:** High-impact clusters already coordinate many modules. Adding circular imports makes builds fragile.

> **What breaks:** Module resolution fails. Build tools (webpack, esbuild) may hang or produce incorrect output.
```

### .tokencap/agent/agent-pack.md

| Field | Value |
| --- | --- |
| Bytes | 3940 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Agent Pack - Agri-Share

> This file was auto-generated by **TokenCap v0.8**.
> Paste this entire file into ChatGPT, Claude, Gemini, Cursor, Windsurf, Cline, Roo Code, or OpenHands
> to give the AI agent full project intelligence before it touches any code.

**Generated:** 2026-10-25T05:51:54.624Z
**Project:** Agri-Share
**Type:** Unknown

---

## 1. Tech Stack


---

## 2. Architecture

```
Modular
```

No end-to-end layered dependency chain was verified from the import graph; treat this repository as modular until a concrete flow is established. Middleware modules are present; inspect their imports before treating them as request-wide interceptors. **API** is the largest detected subsystem by file count. Detected subsystems: API, Frontend, Authentication, Dashboard, Config.

---

## 3. Project Rules

- Core library code lives in lib/ - keep it framework-agnostic
- UI components live in components/ - keep them presentational
- App Router entry points live in app/ - follow Next.js file conventions
- API route handlers live in api/ - keep them thin, delegate to services

---

## 4. Important Files

- `frontend/lib/types.ts`
- `.tokencap/constitution/api-contracts.yaml`
- `.tokencap/constitution/constitution.yaml`
- `.tokencap/constitution/schema-invariants.yaml`
- `frontend/app/api/admin/data/route.ts`
- `frontend/app/api/auth/login/route.ts`
- `frontend/app/api/auth/me/route.ts`
- `frontend/app/api/auth/signup/route.ts`
- `frontend/app/api/bookings/route.ts`
- `frontend/app/api/categories/route.ts`

---

## 5. High-Risk Areas

- [HIGH] **API** - HIGH: API layer is the public contract. Breaking changes here break all consumers.
- [HIGH] **Authentication** - HIGH: Authentication controls access to the entire application. Bugs here cause security breaches.
- [MEDIUM] **Database** - MEDIUM: Database layer holds all persistent state. Schema changes can corrupt or lose data.
- [MEDIUM] **Lib (types)** - MEDIUM: Lib (types) contains 2 modules with elevated risk. Most-connected file: types.ts (1 importers).

---

## 6. Review Rules

When any of these files change, review ALL files in the group together:

### [HIGH] API Review Group

Shared dependency chain (9 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk - review all listed files together.

- `frontend/app/api/admin/data/route.ts`
- `frontend/app/api/bookings/route.ts`
- `frontend/app/api/categories/route.ts`
- `frontend/app/api/drivers/equipment/route.ts`
- `frontend/app/api/equipment/[id]/route.ts`
- `frontend/app/api/equipment/route.ts`
- `frontend/app/api/maintenance/route.ts`
- `frontend/app/api/payments/route.ts`

### [HIGH] Authentication Review Group

Shared dependency chain (6 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk - review all listed files together.

- `frontend/app/api/auth/login/route.ts`
- `frontend/app/api/auth/logout/route.ts`
- `frontend/app/api/auth/me/route.ts`
- `frontend/app/api/auth/signup/route.ts`
- `frontend/app/login/page.tsx`
- `frontend/app/signup/page.tsx`

---

## 7. Core Features

- API
- Frontend
- Authentication
- Dashboard
- Database
- Lib (types)

---

## 8. Agent Instructions

You are an AI agent working on **Agri-Share**.

Before making any changes:
1. Understand the **Modular** architecture pattern.
2. Follow all **Project Rules** listed in Section 3.
3. Check the **High-Risk Areas** - any change there requires extra review.
4. When touching files in a **Review Group**, review all files in that group together.
5. Never hard-code secrets or skip validation at API boundaries.

The most important files in this project are:
- `frontend/lib/types.ts`
- `.tokencap/constitution/api-contracts.yaml`
- `.tokencap/constitution/constitution.yaml`
- `.tokencap/constitution/schema-invariants.yaml`
- `frontend/app/api/admin/data/route.ts`

Start here. Work methodically. Ask before making assumptions about intent.
```

### .tokencap/agent/agent.json

| Field | Value |
| --- | --- |
| Bytes | 5233 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "version": "0.8",
  "projectName": "Agri-Share",
  "generatedAt": "2026-10-25T05:51:54.624Z",
  "projectType": "Unknown",
  "techStack": {
    "languages": [],
    "frameworks": [],
    "databases": [],
    "auth": [],
    "testing": [],
    "buildTools": [],
    "cloudSdks": [],
    "payments": [],
    "externalServices": []
  },
  "architecture": {
    "style": "Modular",
    "layers": [
      "Modular"
    ],
    "clusters": [
      {
        "name": "API",
        "size": 9,
        "risk": "HIGH",
        "centralFile": "route.ts"
      },
      {
        "name": "Frontend",
        "size": 7,
        "risk": "LOW",
        "centralFile": "page.tsx"
      },
      {
        "name": "Authentication",
        "size": 6,
        "risk": "HIGH",
        "centralFile": "route.ts"
      },
      {
        "name": "Dashboard",
        "size": 4,
        "risk": "LOW",
        "centralFile": "page.tsx"
      },
      {
        "name": "Config",
        "size": 3,
        "risk": "LOW",
        "centralFile": "eslint.config.mjs"
      },
      {
        "name": "Unclassified",
        "size": 2,
        "risk": "LOW",
        "centralFile": "api-contracts.yaml"
      },
      {
        "name": "Database",
        "size": 2,
        "risk": "MEDIUM",
        "centralFile": "schema-invariants.yaml"
      },
      {
        "name": "Lib (types)",
        "size": 2,
        "risk": "MEDIUM",
        "centralFile": "types.ts"
      }
    ],
    "criticalChains": [],
    "evidence": []
  },
  "criticalFiles": [
    "frontend/lib/types.ts",
    ".tokencap/constitution/api-contracts.yaml",
    ".tokencap/constitution/constitution.yaml",
    ".tokencap/constitution/schema-invariants.yaml",
    "frontend/app/api/admin/data/route.ts",
    "frontend/app/api/auth/login/route.ts",
    "frontend/app/api/auth/me/route.ts",
    "frontend/app/api/auth/signup/route.ts",
    "frontend/app/api/bookings/route.ts",
    "frontend/app/api/categories/route.ts"
  ],
  "riskAreas": [
    {
      "cluster": "API",
      "level": "HIGH",
      "files": [
        "frontend/app/api/admin/data/route.ts",
        "frontend/app/api/bookings/route.ts",
        "frontend/app/api/categories/route.ts",
        "frontend/app/api/drivers/equipment/route.ts",
        "frontend/app/api/equipment/[id]/route.ts",
        "frontend/app/api/equipment/route.ts",
        "frontend/app/api/maintenance/route.ts",
        "frontend/app/api/payments/route.ts"
      ],
      "reason": "API layer is the public contract. Breaking changes here break all consumers."
    },
    {
      "cluster": "Authentication",
      "level": "HIGH",
      "files": [
        "frontend/app/api/auth/login/route.ts",
        "frontend/app/api/auth/logout/route.ts",
        "frontend/app/api/auth/me/route.ts",
        "frontend/app/api/auth/signup/route.ts"
      ],
      "reason": "Authentication controls access to the entire application. Bugs here cause security breaches."
    },
    {
      "cluster": "Database",
      "level": "MEDIUM",
      "files": [
        ".tokencap/constitution/schema-invariants.yaml",
        "frontend/lib/db.ts"
      ],
      "reason": "Database layer holds all persistent state. Schema changes can corrupt or lose data."
    },
    {
      "cluster": "Lib (types)",
      "level": "MEDIUM",
      "files": [
        "frontend/lib/auth.ts",
        "frontend/lib/types.ts"
      ],
      "reason": "Lib (types) contains 2 modules with elevated risk. Most-connected file: types.ts (1 importers)."
    }
  ],
  "reviewGroups": [
    {
      "name": "API Review Group",
      "files": [
        "frontend/app/api/admin/data/route.ts",
        "frontend/app/api/bookings/route.ts",
        "frontend/app/api/categories/route.ts",
        "frontend/app/api/drivers/equipment/route.ts",
        "frontend/app/api/equipment/[id]/route.ts",
        "frontend/app/api/equipment/route.ts",
        "frontend/app/api/maintenance/route.ts",
        "frontend/app/api/payments/route.ts",
        "frontend/middleware.ts"
      ],
      "reason": "Shared dependency chain (9 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk - review all listed files together.",
      "risk": "HIGH"
    },
    {
      "name": "Authentication Review Group",
      "files": [
        "frontend/app/api/auth/login/route.ts",
        "frontend/app/api/auth/logout/route.ts",
        "frontend/app/api/auth/me/route.ts",
        "frontend/app/api/auth/signup/route.ts",
        "frontend/app/login/page.tsx",
        "frontend/app/signup/page.tsx"
      ],
      "reason": "Shared dependency chain (6 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk - review all listed files together.",
      "risk": "HIGH"
    }
  ],
  "rules": [
    "Core library code lives in lib/ - keep it framework-agnostic",
    "UI components live in components/ - keep them presentational",
    "App Router entry points live in app/ - follow Next.js file conventions",
    "API route handlers live in api/ - keep them thin, delegate to services"
  ],
  "coreFeatures": [
    "API",
    "Frontend",
    "Authentication",
    "Dashboard",
    "Database",
    "Lib (types)"
  ],
  "agentInjectHooks": {}
}
```

### .tokencap/agent/allowed-context.json

| Field | Value |
| --- | --- |
| Bytes | 1136 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "api": [
    "frontend/app/api/admin/data/route*",
    "frontend/app/api/bookings/route*",
    "frontend/app/api/categories/route*",
    "frontend/app/api/drivers/equipment/route*",
    "frontend/app/api/equipment/[id]/route*",
    "frontend/app/api/equipment/route*",
    "frontend/app/api/maintenance/route*",
    "frontend/app/api/payments/route*",
    "frontend/middleware*"
  ],
  "authentication": [
    "frontend/app/api/auth/login/route*",
    "frontend/app/api/auth/logout/route*",
    "frontend/app/api/auth/me/route*",
    "frontend/app/api/auth/signup/route*",
    "frontend/app/login/page*",
    "frontend/app/signup/page*"
  ],
  "database": [
    ".tokencap/constitution/schema-invariants*",
    "frontend/lib/db.ts"
  ],
  "lib-types": [
    "frontend/lib/**"
  ],
  "other": [
    ".tokencap/constitution/**"
  ],
  "dashboard": [
    "frontend/app/dashboard/admin/page*",
    "frontend/app/dashboard/driver/page*",
    "frontend/app/dashboard/farmer/page*",
    "frontend/app/dashboard/owner/page*"
  ],
  "frontend": [
    "frontend/app/**",
    "frontend/components/**"
  ],
  "config": [
    "frontend/**"
  ]
}
```

### .tokencap/agent/context-manifest.json

| Field | Value |
| --- | --- |
| Bytes | 3438 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "version": "1.0.0",
  "generatedAt": "2026-10-25T05:51:54.630Z",
  "entry": "START_HERE.md",
  "project": {
    "name": "Agri-Share",
    "type": "Unknown",
    "architectureStyle": "Modular"
  },
  "clusters": [
    "api",
    "authentication",
    "database",
    "lib-(types)",
    "other",
    "dashboard",
    "frontend",
    "config"
  ],
  "criticalFiles": [
    "frontend/lib/types.ts",
    ".tokencap/constitution/api-contracts.yaml",
    ".tokencap/constitution/constitution.yaml",
    ".tokencap/constitution/schema-invariants.yaml",
    "frontend/app/api/admin/data/route.ts",
    "frontend/app/api/auth/login/route.ts",
    "frontend/app/api/auth/logout/route.ts",
    "frontend/app/api/auth/me/route.ts",
    "frontend/app/api/auth/signup/route.ts",
    "frontend/app/api/bookings/route.ts"
  ],
  "riskAreas": [
    {
      "cluster": "api",
      "level": "HIGH"
    },
    {
      "cluster": "authentication",
      "level": "HIGH"
    }
  ],
  "reviewGroups": [
    {
      "name": "API Review Group",
      "fileCount": 9
    },
    {
      "name": "Authentication Review Group",
      "fileCount": 6
    }
  ],
  "allowedContext": {
    "api": [
      "frontend/app/api/admin/data/route*",
      "frontend/app/api/bookings/route*",
      "frontend/app/api/categories/route*",
      "frontend/app/api/drivers/equipment/route*",
      "frontend/app/api/equipment/[id]/route*",
      "frontend/app/api/equipment/route*",
      "frontend/app/api/maintenance/route*",
      "frontend/app/api/payments/route*",
      "frontend/middleware*"
    ],
    "authentication": [
      "frontend/app/api/auth/login/route*",
      "frontend/app/api/auth/logout/route*",
      "frontend/app/api/auth/me/route*",
      "frontend/app/api/auth/signup/route*",
      "frontend/app/login/page*",
      "frontend/app/signup/page*"
    ],
    "database": [
      ".tokencap/constitution/schema-invariants*",
      "frontend/lib/db.ts"
    ],
    "lib-types": [
      "frontend/lib/**"
    ],
    "other": [
      ".tokencap/constitution/**"
    ],
    "dashboard": [
      "frontend/app/dashboard/admin/page*",
      "frontend/app/dashboard/driver/page*",
      "frontend/app/dashboard/farmer/page*",
      "frontend/app/dashboard/owner/page*"
    ],
    "frontend": [
      "frontend/app/**",
      "frontend/components/**"
    ],
    "config": [
      "frontend/**"
    ]
  },
  "recommendedReads": {
    "api": [
      "architecture.md",
      "rules.md",
      "risk-map.md",
      "review-rules.md"
    ],
    "authentication": [
      "architecture.md",
      "rules.md",
      "risk-map.md",
      "review-rules.md"
    ],
    "database": [
      "architecture.md",
      "rules.md"
    ],
    "lib-(types)": [
      "architecture.md",
      "rules.md"
    ]
  },
  "files": {
    "entry": "START_HERE.md",
    "intelligence": "agent-pack.md",
    "allowedContext": "allowed-context.json",
    "modelInstructions": "model-instructions.md",
    "architecture": "architecture.md",
    "rules": "rules.md",
    "reviewRules": "review-rules.md",
    "riskMap": "risk-map.md",
    "techStack": "tech-stack.md",
    "skills": "skills.md",
    "machineReadable": "agent.json"
  },
  "meta": {
    "tokencapVersion": "1.0.0",
    "description": "Self-Loading Universal Context Layer - machine-readable repository intelligence index.",
    "usage": "Read entry file first, then use allowedContext and recommendedReads for navigation."
  }
}
```

### .tokencap/agent/detail/index.md

| Field | Value |
| --- | --- |
| Bytes | 463 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# TokenCap Detail Index

Read only the document relevant to the current task.

- `../agent-pack.md`: complete project intelligence
- `../architecture.md`: architecture and dependency chains
- `../rules.md`: conventions
- `../review-rules.md`: review groups
- `../risk-map.md`: risky areas
- `../tech-stack.md`: detected technology
- `../skills.md`: agent skills
- `../ui-map.md`: compact screen and UI context
- `../context-manifest.json`: machine-readable index
```

### .tokencap/agent/model-instructions.md

| Field | Value |
| --- | --- |
| Bytes | 2290 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Model Instructions - Agri-Share

> Generated by TokenCap v1.0.0 - 2026-10-25T05:51:54.628Z

---

## Before Touching Code

1. Read `START_HERE.md` - repository overview
2. Read `agent-pack.md` - full project intelligence
3. Use `allowed-context.json` - locate files for your task
4. Read `risk-map.md` before modifying HIGH or CRITICAL areas

---

## Architecture

Modular

---

## Where Things Live

- **Api** -> `frontend/app/api/admin/data/route*, frontend/app/api/bookings/route*`
- **Authentication** -> `frontend/app/api/auth/login/route*, frontend/app/api/auth/logout/route*`
- **Database** -> `.tokencap/constitution/schema-invariants*, frontend/lib/db.ts`
- **Lib types** -> `frontend/lib/**`
- **Other** -> `.tokencap/constitution/**`
- **Dashboard** -> `frontend/app/dashboard/admin/page*, frontend/app/dashboard/driver/page*`
- **Frontend** -> `frontend/app/**, frontend/components/**`
- **Config** -> `frontend/**`

---

## Non-Negotiable Rules

- Core library code lives in lib/ - keep it framework-agnostic
- UI components live in components/ - keep them presentational
- App Router entry points live in app/ - follow Next.js file conventions
- API route handlers live in api/ - keep them thin, delegate to services

---

## High-Risk Files - Extra Care Required

- [HIGH] `frontend/app/api/admin/data/route.ts`
- [HIGH] `frontend/app/api/bookings/route.ts`
- [HIGH] `frontend/app/api/categories/route.ts`
- [HIGH] `frontend/app/api/drivers/equipment/route.ts`
- [HIGH] `frontend/app/api/equipment/[id]/route.ts`
- [HIGH] `frontend/app/api/equipment/route.ts`

---

## Do Not

- Scan the full repository unless the task specifically requires it
- Make assumptions about architecture - read `architecture.md` first
- Modify HIGH or CRITICAL files without checking `risk-map.md`
- Change files in multiple clusters in one pass without checking review groups
- Create new patterns that contradict `rules.md`

---

## Navigation

| Tool | How to use it |
|---|---|
| Find files for a feature | Look up topic in `allowed-context.json` |
| Understand the full project | Read `agent-pack.md` |
| Check what changed recently | Read `TOKENCAP.md` Recent Changes section |
| Understand dependencies | Read `architecture.md` |
| Know what to review together | Read `review-rules.md` |
```

### .tokencap/agent/review-rules.md

| Field | Value |
| --- | --- |
| Bytes | 1245 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Review Rules - Agri-Share

> Generated by TokenCap v0.8 - 2026-10-25T05:51:54.622Z
> When reviewing changes in any of these groups, review ALL listed files together.

---

## API Review Group

**Risk:** [HIGH] HIGH

**Reason:** Shared dependency chain (9 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk - review all listed files together.

**Review Together:**

- `frontend/app/api/admin/data/route.ts`
- `frontend/app/api/bookings/route.ts`
- `frontend/app/api/categories/route.ts`
- `frontend/app/api/drivers/equipment/route.ts`
- `frontend/app/api/equipment/[id]/route.ts`
- `frontend/app/api/equipment/route.ts`
- `frontend/app/api/maintenance/route.ts`
- `frontend/app/api/payments/route.ts`
- `frontend/middleware.ts`

---

## Authentication Review Group

**Risk:** [HIGH] HIGH

**Reason:** Shared dependency chain (6 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk - review all listed files together.

**Review Together:**

- `frontend/app/api/auth/login/route.ts`
- `frontend/app/api/auth/logout/route.ts`
- `frontend/app/api/auth/me/route.ts`
- `frontend/app/api/auth/signup/route.ts`
- `frontend/app/login/page.tsx`
- `frontend/app/signup/page.tsx`

---
```

### .tokencap/agent/risk-map.md

| Field | Value |
| --- | --- |
| Bytes | 1349 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Risk Map - Agri-Share

> Generated by TokenCap v0.8 - 2026-10-25T05:51:54.622Z

---

## Summary

[HIGH] **HIGH clusters:** API, Authentication

---

## Risk Areas

### [HIGH] API

**Risk Level:** HIGH

**Why:** API layer is the public contract. Breaking changes here break all consumers.

**Key Files:**

- `frontend/app/api/admin/data/route.ts`
- `frontend/app/api/bookings/route.ts`
- `frontend/app/api/categories/route.ts`
- `frontend/app/api/drivers/equipment/route.ts`
- `frontend/app/api/equipment/[id]/route.ts`
- `frontend/app/api/equipment/route.ts`

### [HIGH] Authentication

**Risk Level:** HIGH

**Why:** Authentication controls access to the entire application. Bugs here cause security breaches.

**Key Files:**

- `frontend/app/api/auth/login/route.ts`
- `frontend/app/api/auth/logout/route.ts`
- `frontend/app/api/auth/me/route.ts`
- `frontend/app/api/auth/signup/route.ts`

### [MEDIUM] Database

**Risk Level:** MEDIUM

**Why:** Database layer holds all persistent state. Schema changes can corrupt or lose data.

**Key Files:**

- `.tokencap/constitution/schema-invariants.yaml`
- `frontend/lib/db.ts`

### [MEDIUM] Lib (types)

**Risk Level:** MEDIUM

**Why:** Lib (types) contains 2 modules with elevated risk. Most-connected file: types.ts (1 importers).

**Key Files:**

- `frontend/lib/auth.ts`
- `frontend/lib/types.ts`
```

### .tokencap/agent/rules.md

| Field | Value |
| --- | --- |
| Bytes | 1080 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Project Rules - Agri-Share

> Generated by TokenCap v0.8 - 2026-10-25T05:51:54.621Z
> These rules are inferred automatically from the project structure and tech stack.

---

## Folder Conventions

### `lib/`

**Rule:** Core library code lives in lib/ - keep it framework-agnostic

**Example:** `frontend/lib/auth.ts`

### `components/`

**Rule:** UI components live in components/ - keep them presentational

**Example:** `frontend/components/Footer.tsx`

### `app/`

**Rule:** App Router entry points live in app/ - follow Next.js file conventions

**Example:** `frontend/app/api/admin/data/route.ts`

### `api/`

**Rule:** API route handlers live in api/ - keep them thin, delegate to services

**Example:** `frontend/app/api/admin/data/route.ts`

---

## Quick Reference

All conventions at a glance:

- Core library code lives in lib/ - keep it framework-agnostic
- UI components live in components/ - keep them presentational
- App Router entry points live in app/ - follow Next.js file conventions
- API route handlers live in api/ - keep them thin, delegate to services
```

### .tokencap/agent/skills.md

| Field | Value |
| --- | --- |
| Bytes | 1378 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Agent Skills - Agri-Share

> Generated by TokenCap v0.8 - 2026-10-25T05:51:54.623Z
> This file teaches an AI agent the essential knowledge needed to work on this project.

---

## Project Type

You are working on a **Unknown** project.

---

## Core Features

- API
- Frontend
- Authentication
- Dashboard
- Database
- Lib (types)

---

## Architecture

```
Modular
```

---

## Project Conventions

Follow these rules when writing or reviewing code:

- Core library code lives in lib/ - keep it framework-agnostic
- UI components live in components/ - keep them presentational
- App Router entry points live in app/ - follow Next.js file conventions
- API route handlers live in api/ - keep them thin, delegate to services

---

## Important Files

These files are critical - understand them before making changes:

- `frontend/lib/types.ts`
- `.tokencap/constitution/api-contracts.yaml`
- `.tokencap/constitution/constitution.yaml`
- `.tokencap/constitution/schema-invariants.yaml`
- `frontend/app/api/admin/data/route.ts`
- `frontend/app/api/auth/login/route.ts`
- `frontend/app/api/auth/me/route.ts`
- `frontend/app/api/auth/signup/route.ts`
- `frontend/app/api/bookings/route.ts`
- `frontend/app/api/categories/route.ts`

---

## High-Risk Areas

Changes to these areas require extra care and thorough review:

- [HIGH] **API** - HIGH
- [HIGH] **Authentication** - HIGH
```

### .tokencap/agent/tech-stack.md

| Field | Value |
| --- | --- |
| Bytes | 89 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Tech Stack - Agri-Share

> Generated by TokenCap v0.8 - 2026-10-25T05:51:54.619Z

---
```

### .tokencap/brain/brain-index.json

| Field | Value |
| --- | --- |
| Bytes | 1569 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "api": [
    "frontend/app/api/admin/data/route.ts",
    "frontend/app/api/bookings/route.ts",
    "frontend/app/api/categories/route.ts",
    "frontend/app/api/drivers/equipment/route.ts",
    "frontend/app/api/equipment/[id]/route.ts",
    "frontend/app/api/equipment/route.ts",
    "frontend/app/api/maintenance/route.ts",
    "frontend/app/api/payments/route.ts",
    "frontend/middleware.ts"
  ],
  "authentication": [
    "frontend/app/api/auth/login/route.ts",
    "frontend/app/api/auth/logout/route.ts",
    "frontend/app/api/auth/me/route.ts",
    "frontend/app/api/auth/signup/route.ts",
    "frontend/app/login/page.tsx",
    "frontend/app/signup/page.tsx"
  ],
  "database": [
    ".tokencap/constitution/schema-invariants.yaml",
    "frontend/lib/db.ts"
  ],
  "lib (types)": [
    "frontend/lib/auth.ts",
    "frontend/lib/types.ts"
  ],
  "other": [
    ".tokencap/constitution/api-contracts.yaml",
    ".tokencap/constitution/constitution.yaml"
  ],
  "dashboard": [
    "frontend/app/dashboard/admin/page.tsx",
    "frontend/app/dashboard/driver/page.tsx",
    "frontend/app/dashboard/farmer/page.tsx",
    "frontend/app/dashboard/owner/page.tsx"
  ],
  "frontend": [
    "frontend/app/equipment/[id]/page.tsx",
    "frontend/app/equipment/page.tsx",
    "frontend/app/layout.tsx",
    "frontend/app/page.tsx",
    "frontend/components/Footer.tsx",
    "frontend/components/Navbar.tsx",
    "frontend/components/StatusBadge.tsx"
  ],
  "config": [
    "frontend/eslint.config.mjs",
    "frontend/next-env.d.ts",
    "frontend/next.config.ts"
  ]
}
```

### .tokencap/brain/knowledge.json

| Field | Value |
| --- | --- |
| Bytes | 8020 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "version": "0.9",
  "generatedAt": "2026-10-25T05:51:56.892Z",
  "techStack": {
    "languages": [],
    "frameworks": [],
    "databases": [],
    "orms": [],
    "auth": [],
    "testing": [],
    "buildTools": [],
    "cloudSdks": [],
    "payments": [],
    "other": [],
    "packageManager": null,
    "summary": "(unknown)"
  },
  "clusters": [
    {
      "name": "API",
      "files": [
        "frontend/app/api/admin/data/route.ts",
        "frontend/app/api/bookings/route.ts",
        "frontend/app/api/categories/route.ts",
        "frontend/app/api/drivers/equipment/route.ts",
        "frontend/app/api/equipment/[id]/route.ts",
        "frontend/app/api/equipment/route.ts",
        "frontend/app/api/maintenance/route.ts",
        "frontend/app/api/payments/route.ts",
        "frontend/middleware.ts"
      ],
      "risk": "HIGH",
      "centralFile": "frontend/app/api/admin/data/route.ts",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Authentication",
      "files": [
        "frontend/app/api/auth/login/route.ts",
        "frontend/app/api/auth/logout/route.ts",
        "frontend/app/api/auth/me/route.ts",
        "frontend/app/api/auth/signup/route.ts",
        "frontend/app/login/page.tsx",
        "frontend/app/signup/page.tsx"
      ],
      "risk": "HIGH",
      "centralFile": "frontend/app/api/auth/login/route.ts",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Database",
      "files": [
        ".tokencap/constitution/schema-invariants.yaml",
        "frontend/lib/db.ts"
      ],
      "risk": "MEDIUM",
      "centralFile": ".tokencap/constitution/schema-invariants.yaml",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Lib (types)",
      "files": [
        "frontend/lib/auth.ts",
        "frontend/lib/types.ts"
      ],
      "risk": "MEDIUM",
      "centralFile": "frontend/lib/types.ts",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Other",
      "files": [
        ".tokencap/constitution/api-contracts.yaml",
        ".tokencap/constitution/constitution.yaml"
      ],
      "risk": "LOW",
      "centralFile": ".tokencap/constitution/api-contracts.yaml",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Dashboard",
      "files": [
        "frontend/app/dashboard/admin/page.tsx",
        "frontend/app/dashboard/driver/page.tsx",
        "frontend/app/dashboard/farmer/page.tsx",
        "frontend/app/dashboard/owner/page.tsx"
      ],
      "risk": "LOW",
      "centralFile": "frontend/app/dashboard/admin/page.tsx",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Frontend",
      "files": [
        "frontend/app/equipment/[id]/page.tsx",
        "frontend/app/equipment/page.tsx",
        "frontend/app/layout.tsx",
        "frontend/app/page.tsx",
        "frontend/components/Footer.tsx",
        "frontend/components/Navbar.tsx",
        "frontend/components/StatusBadge.tsx"
      ],
      "risk": "LOW",
      "centralFile": "frontend/app/equipment/[id]/page.tsx",
      "dependsOn": [],
      "usedBy": []
    },
    {
      "name": "Config",
      "files": [
        "frontend/eslint.config.mjs",
        "frontend/next-env.d.ts",
        "frontend/next.config.ts"
      ],
      "risk": "LOW",
      "centralFile": "frontend/eslint.config.mjs",
      "dependsOn": [],
      "usedBy": []
    }
  ],
  "criticalFiles": [
    "frontend/lib/types.ts",
    ".tokencap/constitution/api-contracts.yaml",
    ".tokencap/constitution/constitution.yaml",
    ".tokencap/constitution/schema-invariants.yaml",
    "frontend/app/api/admin/data/route.ts",
    "frontend/app/api/auth/login/route.ts",
    "frontend/app/api/auth/logout/route.ts",
    "frontend/app/api/auth/me/route.ts",
    "frontend/app/api/auth/signup/route.ts",
    "frontend/app/api/bookings/route.ts",
    "frontend/app/api/categories/route.ts",
    "frontend/app/api/drivers/equipment/route.ts",
    "frontend/app/api/equipment/[id]/route.ts",
    "frontend/app/api/equipment/route.ts",
    "frontend/app/api/maintenance/route.ts"
  ],
  "architecture": {
    "style": "Modular",
    "layers": [
      "Modular"
    ],
    "criticalChains": []
  },
  "riskAreas": [
    {
      "cluster": "API",
      "level": "HIGH",
      "files": [
        "frontend/app/api/admin/data/route.ts",
        "frontend/app/api/bookings/route.ts",
        "frontend/app/api/categories/route.ts",
        "frontend/app/api/drivers/equipment/route.ts",
        "frontend/app/api/equipment/[id]/route.ts",
        "frontend/app/api/equipment/route.ts",
        "frontend/app/api/maintenance/route.ts",
        "frontend/app/api/payments/route.ts"
      ],
      "reason": "API layer is the public contract. Breaking changes here break all consumers."
    },
    {
      "cluster": "Authentication",
      "level": "HIGH",
      "files": [
        "frontend/app/api/auth/login/route.ts",
        "frontend/app/api/auth/logout/route.ts",
        "frontend/app/api/auth/me/route.ts",
        "frontend/app/api/auth/signup/route.ts"
      ],
      "reason": "Authentication controls access to the entire application. Bugs here cause security breaches."
    },
    {
      "cluster": "Database",
      "level": "MEDIUM",
      "files": [
        ".tokencap/constitution/schema-invariants.yaml",
        "frontend/lib/db.ts"
      ],
      "reason": "Database layer holds all persistent state. Schema changes can corrupt or lose data."
    },
    {
      "cluster": "Lib (types)",
      "level": "MEDIUM",
      "files": [
        "frontend/lib/auth.ts",
        "frontend/lib/types.ts"
      ],
      "reason": "Lib (types) contains 2 modules with elevated risk. Most-connected file: types.ts (1 importers)."
    }
  ],
  "reviewGroups": [
    {
      "name": "API Review Group",
      "files": [
        "frontend/app/api/admin/data/route.ts",
        "frontend/app/api/bookings/route.ts",
        "frontend/app/api/categories/route.ts",
        "frontend/app/api/drivers/equipment/route.ts",
        "frontend/app/api/equipment/[id]/route.ts",
        "frontend/app/api/equipment/route.ts",
        "frontend/app/api/maintenance/route.ts",
        "frontend/app/api/payments/route.ts",
        "frontend/middleware.ts"
      ],
      "reason": "Shared dependency chain (9 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk — review all listed files together.",
      "risk": "HIGH"
    },
    {
      "name": "Authentication Review Group",
      "files": [
        "frontend/app/api/auth/login/route.ts",
        "frontend/app/api/auth/logout/route.ts",
        "frontend/app/api/auth/me/route.ts",
        "frontend/app/api/auth/signup/route.ts",
        "frontend/app/login/page.tsx",
        "frontend/app/signup/page.tsx"
      ],
      "reason": "Shared dependency chain (6 files). Central file: route.ts with 0 importers. Changes in this group carry HIGH risk — review all listed files together.",
      "risk": "HIGH"
    }
  ],
  "recentChanges": {
    "branch": "finnal",
    "filesChanged": 23,
    "riskLevel": "CRITICAL",
    "featuresAdded": [
      "Authentication System: .Tokencap",
      "Application Logic: Build Output",
      "Documentation: AGENTS",
      "Database Layer"
    ],
    "featuresModified": [
      "Configuration",
      "API Layer: Route",
      "API Layer: Route",
      "API Layer: Route",
      "API Layer: Route",
      "API Layer: Route",
      "API Layer: Route",
      "API Layer: Route",
      "Authentication System: Route",
      "Authentication System: Route",
      "Authentication System: Route",
      "Payment System: Route",
      "Application Logic: Lib"
    ]
  },
  "rules": [
    "Core library code lives in lib/ — keep it framework-agnostic",
    "UI components live in components/ — keep them presentational",
    "App Router entry points live in app/ — follow Next.js file conventions",
    "API route handlers live in api/ — keep them thin, delegate to services"
  ]
}
```

### .tokencap/constitution/api-contracts.yaml

| Field | Value |
| --- | --- |
| Bytes | 2483 |
| Score | 0 |
| Why | context |
| Status | Full content |


```yaml
# API Contracts
# TokenCap Constitution Engine

CONST-API-001: /api/admin/data public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/admin/data/route.ts

CONST-API-002: /api/auth/login public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/auth/login/route.ts

CONST-API-003: /api/auth/logout public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/auth/logout/route.ts

CONST-API-004: /api/auth/me public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/auth/me/route.ts

CONST-API-005: /api/auth/signup public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/auth/signup/route.ts

CONST-API-006: /api/bookings public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/bookings/route.ts

CONST-API-007: /api/categories public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/categories/route.ts

CONST-API-008: /api/drivers/equipment public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/drivers/equipment/route.ts

CONST-API-009: /api/equipment public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/equipment/route.ts

CONST-API-010: /api/equipment/[id] public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/equipment/[id]/route.ts

CONST-API-011: /api/maintenance public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/maintenance/route.ts

CONST-API-012: /api/payments public response structure must remain backward compatible.
  severity:   HIGH
  confidence: 0.72
  source:     nextjs
  derivedFrom: frontend/app/api/payments/route.ts
```

### .tokencap/constitution/compliance-rules.md

| Field | Value |
| --- | --- |
| Bytes | 68 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Compliance Rules

> TokenCap Constitution Engine

*None detected.*
```

### .tokencap/constitution/critical-flows.md

| Field | Value |
| --- | --- |
| Bytes | 1316 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Critical Flows

> TokenCap Constitution Engine

## 🔴 CONST-FLOW-001 — CRITICAL

**Authentication Flow is repository-critical and must remain intact end-to-end.**

> **Why:** Every protected page and authenticated feature depends on this flow working correctly.

> **What breaks:** Users cannot log in. All authenticated features become unreachable. Sessions invalidated.

*Files:* `frontend/app/api/auth/login/route.ts`, `frontend/app/api/auth/logout/route.ts`, `frontend/app/api/auth/me/route.ts`, `frontend/app/api/auth/signup/route.ts`, `frontend/app/login/page.tsx`

## 🔴 CONST-FLOW-002 — CRITICAL

**Payment Flow is repository-critical. Checkout must complete reliably.**

> **Why:** Revenue depends entirely on the payment flow being operational and correct.

> **What breaks:** Users cannot complete purchases. Revenue stops. Potential chargebacks and disputes.

*Files:* `frontend/app/api/payments/route.ts`

## 🔴 CONST-FLOW-003 — CRITICAL

**User Registration Flow must remain functional. New users must be able to create accounts.**

> **Why:** Registration is the entry point for all new users. Breaking it stops user growth.

> **What breaks:** New users cannot create accounts. User acquisition blocked.

*Files:* `frontend/app/api/auth/signup/route.ts`, `frontend/app/signup/page.tsx`
```

### .tokencap/constitution/public-contracts.md

| Field | Value |
| --- | --- |
| Bytes | 4255 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Public API Contracts

> TokenCap Constitution Engine

## 🟠 CONST-API-001 — HIGH

**/api/admin/data public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/admin/data/route.ts`

## 🟠 CONST-API-002 — HIGH

**/api/auth/login public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/auth/login/route.ts`

## 🟠 CONST-API-003 — HIGH

**/api/auth/logout public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/auth/logout/route.ts`

## 🟠 CONST-API-004 — HIGH

**/api/auth/me public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/auth/me/route.ts`

## 🟠 CONST-API-005 — HIGH

**/api/auth/signup public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/auth/signup/route.ts`

## 🟠 CONST-API-006 — HIGH

**/api/bookings public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/bookings/route.ts`

## 🟠 CONST-API-007 — HIGH

**/api/categories public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/categories/route.ts`

## 🟠 CONST-API-008 — HIGH

**/api/drivers/equipment public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/drivers/equipment/route.ts`

## 🟠 CONST-API-009 — HIGH

**/api/equipment public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/equipment/route.ts`

## 🟠 CONST-API-010 — HIGH

**/api/equipment/[id] public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/equipment/[id]/route.ts`

## 🟠 CONST-API-011 — HIGH

**/api/maintenance public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/maintenance/route.ts`

## 🟠 CONST-API-012 — HIGH

**/api/payments public response structure must remain backward compatible.**

> **Why:** Public API endpoints form the contract between this service and its consumers.

> **What breaks:** External integrations, mobile apps, or SDKs break if response shape changes.

*Files:* `frontend/app/api/payments/route.ts`
```

### .tokencap/constitution/schema-invariants.yaml

| Field | Value |
| --- | --- |
| Bytes | 1244 |
| Score | 0 |
| Why | context |
| Status | Full content |


```yaml
# Schema Invariants
# TokenCap Constitution Engine

CONST-SCHEMA-001: equipment_types(type_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql

CONST-SCHEMA-002: equipment(equipment_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql

CONST-SCHEMA-003: equipment_drivers(equipment_id, driver_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql

CONST-SCHEMA-004: maintenance_logs(log_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql

CONST-SCHEMA-005: bookings(booking_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql

CONST-SCHEMA-006: payments(payment_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql

CONST-SCHEMA-007: reviews(review_id) primary key must not change type or be removed.
  severity:   IMMUTABLE
  confidence: 0.95
  derivedFrom: database/schema.sql
```

### .tokencap/constitution/security-boundaries.md

| Field | Value |
| --- | --- |
| Bytes | 407 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Security Boundaries

> TokenCap Constitution Engine

## 🔴 CONST-SEC-001 — CRITICAL

**Environment secrets must never be hardcoded in source files.**

> **Why:** Secrets committed to source are exposed via version control history and repository access.

> **What breaks:** Security breach. API keys, database credentials, and tokens compromised.

*Files:* `frontend/lib/auth.ts`, `frontend/lib/db.ts`
```

### .tokencap/debug/notes.md

| Field | Value |
| --- | --- |
| Bytes | 499 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# Debug Notes

<!-- Managed by TokenCap. Generated 2026-10-25T05:51:56.434Z. -->

## Problem

No active failure has been captured.

## Error Logs

```
No captured error output is available.
```

## Stack Trace

```
No captured stack trace is available.
```

## Failed Tests

- No captured failed tests.

## Attempted Fixes

- No attempted fixes captured in this debug session.

## Suspected Files

- No suspected files inferred yet.

## Unresolved Questions

- No unresolved questions inferred yet.
```

### .tokencap/graph/summary.md

| Field | Value |
| --- | --- |
| Bytes | 3955 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# TokenCap Project Graph

Generated: 10/25/2026, 11:21:54 AM

> **Language Support Note**: The graph only parses JS/TS imports
> (`.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`). Files in other languages
> (Python, Go, Rust, etc.) appear as isolated nodes with no edges.

## Changed Files

- frontend/app/api/admin/data/route.ts
- frontend/app/api/auth/login/route.ts
- frontend/app/api/auth/me/route.ts
- frontend/app/api/auth/signup/route.ts
- frontend/app/api/bookings/route.ts
- frontend/app/api/categories/route.ts
- frontend/app/api/drivers/equipment/route.ts
- frontend/app/api/equipment/[id]/route.ts
- frontend/app/api/equipment/route.ts
- frontend/app/api/maintenance/route.ts
- frontend/app/api/payments/route.ts
- frontend/lib/types.ts
- frontend/lib/db.ts

## File Relationships

frontend/lib/auth.ts
→ frontend/lib/types.ts

## Important Nodes

- frontend/middleware.ts — middleware
- frontend/app/dashboard/admin/page.tsx — route
- frontend/app/dashboard/driver/page.tsx — route
- frontend/app/dashboard/farmer/page.tsx — route
- frontend/app/dashboard/owner/page.tsx — route
- frontend/app/equipment/[id]/page.tsx — route
- frontend/app/equipment/page.tsx — route
- frontend/app/layout.tsx — route
- frontend/app/login/page.tsx — route
- frontend/app/page.tsx — route
- frontend/app/signup/page.tsx — route
- frontend/app/api/admin/data/route.ts — api *(changed)*
- frontend/app/api/auth/login/route.ts — api *(changed)*
- frontend/app/api/auth/logout/route.ts — api
- frontend/app/api/auth/me/route.ts — api *(changed)*
- frontend/app/api/auth/signup/route.ts — api *(changed)*
- frontend/app/api/bookings/route.ts — api *(changed)*
- frontend/app/api/categories/route.ts — api *(changed)*
- frontend/app/api/drivers/equipment/route.ts — api *(changed)*
- frontend/app/api/equipment/[id]/route.ts — api *(changed)*
- frontend/app/api/equipment/route.ts — api *(changed)*
- frontend/app/api/maintenance/route.ts — api *(changed)*
- frontend/app/api/payments/route.ts — api *(changed)*
- frontend/components/Footer.tsx — component
- frontend/components/Navbar.tsx — component
- frontend/components/StatusBadge.tsx — component
- frontend/lib/auth.ts — service
- frontend/lib/db.ts — service *(changed)*
- frontend/lib/types.ts — service *(changed)*
- frontend/eslint.config.mjs — config
- frontend/next.config.ts — config

## All Scanned Files

Total: 35 JS/TS files scanned.

### 🛣️ Route (10)

- frontend/app/dashboard/admin/page.tsx
- frontend/app/dashboard/driver/page.tsx
- frontend/app/dashboard/farmer/page.tsx
- frontend/app/dashboard/owner/page.tsx
- frontend/app/equipment/[id]/page.tsx
- frontend/app/equipment/page.tsx
- frontend/app/layout.tsx
- frontend/app/login/page.tsx
- frontend/app/page.tsx
- frontend/app/signup/page.tsx

### 🔌 Api (12)

- frontend/app/api/admin/data/route.ts *(changed)*
- frontend/app/api/auth/login/route.ts *(changed)*
- frontend/app/api/auth/logout/route.ts
- frontend/app/api/auth/me/route.ts *(changed)*
- frontend/app/api/auth/signup/route.ts *(changed)*
- frontend/app/api/bookings/route.ts *(changed)*
- frontend/app/api/categories/route.ts *(changed)*
- frontend/app/api/drivers/equipment/route.ts *(changed)*
- frontend/app/api/equipment/[id]/route.ts *(changed)*
- frontend/app/api/equipment/route.ts *(changed)*
- frontend/app/api/maintenance/route.ts *(changed)*
- frontend/app/api/payments/route.ts *(changed)*

### 🧩 Component (3)

- frontend/components/Footer.tsx
- frontend/components/Navbar.tsx
- frontend/components/StatusBadge.tsx

### ⚙️ Service (3)

- frontend/lib/auth.ts
- frontend/lib/db.ts *(changed)*
- frontend/lib/types.ts *(changed)*

### 🔧 Config (2)

- frontend/eslint.config.mjs
- frontend/next.config.ts

### 📄 Unknown (4)

- .tokencap/constitution/api-contracts.yaml
- .tokencap/constitution/constitution.yaml
- .tokencap/constitution/schema-invariants.yaml
- frontend/next-env.d.ts
```

### .tokencap/memory/current.md

| Field | Value |
| --- | --- |
| Bytes | 1719 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# TokenCap Memory

Generated: October 25, 2026 at 11:21 AM

**Branch:** `finnal`

## Current Task

Working on `finnal` with 23 uncommitted files:
- frontend/.env.example
- frontend/app/api/admin/data/route.ts
- frontend/app/api/auth/login/route.ts
- frontend/app/api/auth/me/route.ts
- frontend/app/api/auth/signup/route.ts
- frontend/app/api/bookings/route.ts
- frontend/app/api/categories/route.ts
- frontend/app/api/drivers/equipment/route.ts
- frontend/app/api/equipment/[id]/route.ts
- frontend/app/api/equipment/route.ts
- frontend/app/api/maintenance/route.ts
- frontend/app/api/payments/route.ts

## Developer Intent

Not inferred from local repository evidence.

## Known Issues

- No failing test output or TODO/FIXME markers detected.

## Constraints

- No additional constraints inferred.

## Decisions Made

- No decisions inferred from the current repository state.

## Recent Changed Files

- frontend/.env.example
- frontend/app/api/admin/data/route.ts
- frontend/app/api/auth/login/route.ts
- frontend/app/api/auth/me/route.ts
- frontend/app/api/auth/signup/route.ts
- frontend/app/api/bookings/route.ts
- frontend/app/api/categories/route.ts
- frontend/app/api/drivers/equipment/route.ts
- frontend/app/api/equipment/[id]/route.ts
- frontend/app/api/equipment/route.ts
- frontend/app/api/maintenance/route.ts
- frontend/app/api/payments/route.ts
- frontend/lib/db.ts
- frontend/lib/types.ts
- frontend/package-lock.json
- frontend/package.json
- .tokencap/
- AGENTS.md
- database/supabase_demo_queries.sql
- database/supabase_reset.sql
- database/supabase_schema.sql
- database/supabase_seeds.sql
- frontend/build_output.txt

## Next Steps

- Review the changed files and recent commits listed above.
```

### .tokencap/memory/dev-notes.md

| Field | Value |
| --- | --- |
| Bytes | 1257 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
# TokenCap Notes

<!-- Managed by TokenCap. Generated 2026-10-25T05:51:56.433Z. -->

## Current Task

Working on `finnal` with 23 uncommitted files:
- frontend/.env.example
- frontend/app/api/admin/data/route.ts
- frontend/app/api/auth/login/route.ts
- frontend/app/api/auth/me/route.ts
- frontend/app/api/auth/signup/route.ts
- frontend/app/api/bookings/route.ts
- frontend/app/api/categories/route.ts
- frontend/app/api/drivers/equipment/route.ts
- frontend/app/api/equipment/[id]/route.ts
- frontend/app/api/equipment/route.ts
- frontend/app/api/maintenance/route.ts
- frontend/app/api/payments/route.ts

## Developer Intent

Not inferred from local repository evidence.

## Known Issues

- No failing test output or TODO/FIXME markers detected.

## Recent Commits

- 16399bd feat: complete MySQL 8.0 DBMS mini-project and remove unwanted Supabase files
- 95027b8 feat: migrate database to MySQL 8.0 with 3NF schema, seeds, demo queries, and mysql2 server-side API integration
- 26604c7 feat: complete Agri-Share farm equipment rental platform

## Constraints

- No additional constraints inferred.

## Decisions Made

- No decisions inferred from the current repository state.

## Next Steps

- Review the changed files and recent commits listed above.
```

### .tokencap/savings.json

| Field | Value |
| --- | --- |
| Bytes | 2170 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "baseline": {
    "tokens": 116008,
    "dollars": 0.29002
  },
  "actual": {
    "tokens": 60882,
    "dollars": 0.152205
  },
  "savings": {
    "tokens": 55126,
    "dollars": 0.137815,
    "percent": 47.5
  },
  "generatedAt": "2026-10-25T05:51:53.969Z",
  "profile": "balanced",
  "stats": {
    "version": 2,
    "runCount": 4,
    "totalTokensSaved": 186532,
    "lastBuildSavings": 55126,
    "lastBuildAt": "2026-10-25T05:51:53.969Z",
    "notifiedMilestones": [
      50000,
      100000
    ],
    "newMilestones": [],
    "notice": null,
    "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression.",
    "tokenizerProfile": "tokencap-estimate-v1",
    "runs": [
      {
        "generatedAt": "2026-10-25T05:28:46.537Z",
        "profile": "balanced",
        "baselineTokens": 72480,
        "snapshotTokens": 50592,
        "savedTokens": 21888,
        "tokenizerProfile": "tokencap-estimate-v1",
        "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
      },
      {
        "generatedAt": "2026-10-25T05:29:59.423Z",
        "profile": "balanced",
        "baselineTokens": 115188,
        "snapshotTokens": 60427,
        "savedTokens": 54761,
        "tokenizerProfile": "tokencap-estimate-v1",
        "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
      },
      {
        "generatedAt": "2026-10-25T05:33:46.997Z",
        "profile": "balanced",
        "baselineTokens": 115724,
        "snapshotTokens": 60967,
        "savedTokens": 54757,
        "tokenizerProfile": "tokencap-estimate-v1",
        "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
      },
      {
        "generatedAt": "2026-10-25T05:51:53.969Z",
        "profile": "balanced",
        "baselineTokens": 116008,
        "snapshotTokens": 60882,
        "savedTokens": 55126,
        "tokenizerProfile": "tokencap-estimate-v1",
        "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
      }
    ]
  }
}
```

### .tokencap/stats.json

| Field | Value |
| --- | --- |
| Bytes | 1765 |
| Score | 0 |
| Why | context |
| Status | Full content |


```json
{
  "version": 2,
  "runCount": 4,
  "totalTokensSaved": 186532,
  "lastBuildSavings": 55126,
  "lastBuildAt": "2026-10-25T05:51:53.969Z",
  "notifiedMilestones": [
    50000,
    100000
  ],
  "newMilestones": [],
  "notice": null,
  "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression.",
  "tokenizerProfile": "tokencap-estimate-v1",
  "runs": [
    {
      "generatedAt": "2026-10-25T05:28:46.537Z",
      "profile": "balanced",
      "baselineTokens": 72480,
      "snapshotTokens": 50592,
      "savedTokens": 21888,
      "tokenizerProfile": "tokencap-estimate-v1",
      "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
    },
    {
      "generatedAt": "2026-10-25T05:29:59.423Z",
      "profile": "balanced",
      "baselineTokens": 115188,
      "snapshotTokens": 60427,
      "savedTokens": 54761,
      "tokenizerProfile": "tokencap-estimate-v1",
      "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
    },
    {
      "generatedAt": "2026-10-25T05:33:46.997Z",
      "profile": "balanced",
      "baselineTokens": 115724,
      "snapshotTokens": 60967,
      "savedTokens": 54757,
      "tokenizerProfile": "tokencap-estimate-v1",
      "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
    },
    {
      "generatedAt": "2026-10-25T05:51:53.969Z",
      "profile": "balanced",
      "baselineTokens": 116008,
      "snapshotTokens": 60882,
      "savedTokens": 55126,
      "tokenizerProfile": "tokencap-estimate-v1",
      "baselineDefinition": "Eligible redacted text source files before ranking, selection, or compression."
    }
  ]
}
```

### database/reset.sql

| Field | Value |
| --- | --- |
| Bytes | 628 |
| Score | 0 |
| Why | context |
| Status | Full content |


```sql
-- ============================================================
-- AGRI-SHARE: FRESH DATABASE RESET SCRIPT
-- Platform: MySQL 8.0 | Engine: InnoDB
--
-- PURPOSE: Completely destroys and recreates the agri_share
-- database. Run this ONLY when starting from scratch.
--
-- WARNING: ALL DATA WILL BE PERMANENTLY DELETED.
--
-- HOW TO USE (MySQL Workbench):
--   1. Open this file: File > Open SQL Script
--   2. Execute: Ctrl+Shift+Enter (or the lightning bolt icon)
--   3. Then run schema.sql, then seeds.sql
-- ============================================================

DROP DATABASE IF EXISTS `agri_share`;
```

### database/seeds.sql

| Field | Value |
| --- | --- |
| Bytes | 6807 |
| Score | 0 |
| Why | context |
| Status | Full content |


```sql
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
```

### frontend/AGENTS.md

| Field | Value |
| --- | --- |
| Bytes | 688 |
| Score | 0 |
| Why | context |
| Status | Full content |


```markdown
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```

### frontend/app/api/auth/logout/route.ts

| Field | Value |
| --- | --- |
| Bytes | 236 |
| Score | 0 |
| Why | context |
| Status | Full content |


```ts
import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/auth';

export async function POST() {
  await clearSession();
  return NextResponse.json({ success: true, message: 'Signed out successfully.' });
}
```

### frontend/app/dashboard/driver/page.tsx

| Field | Value |
| --- | --- |
| Bytes | 10061 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingStatusBadge } from "@/components/StatusBadge";
import type { AppUser, Booking, EquipmentDriver } from "@/lib/types";

export default function DriverDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [eligibleEquipment, setEligibleEquipment] = useState<
    (EquipmentDriver & {
      equipment: { model_name: string; daily_rate: number } | null;
    })[]
  >([]);
  const [assignedBookings, setAssignedBookings] = useState<
    (Booking & {
      equipment: { model_name: string } | null;
      users: { full_name: string; phone: string | null } | null;
    })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) {
          router.replace("/login");
          return;
        }
        const userData = await userRes.json();
        if (!userData?.user) {
          router.replace("/login");
          return;
        }

        const profile = userData.user as AppUser;
        if (cancelled) return;

        if (profile.role_type !== "DRIVER") {
          router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
          return;
        }

        setUser(profile);

        // Fetch eligible equipment
        const eqRes = await fetch("/api/drivers/equipment");
        if (eqRes.ok) {
          const eqJson = await eqRes.json();
          if (!cancelled) setEligibleEquipment(eqJson.eligibleEquipment || []);
        }

        // Fetch bookings where this driver is assigned
        const bkRes = await fetch("/api/bookings?role=driver");
        if (bkRes.ok) {
          const bkJson = await bkRes.json();
          if (!cancelled) setAssignedBookings(bkJson.bookings || []);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load driver dashboard");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    initialLoad();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-red-600 font-medium">{error}</p>
            <Link
              href="/login"
              className="mt-4 inline-block text-sm text-emerald-700 underline"
            >
              Back to Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 mb-2">
                Certified Operator
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Welcome, {user?.full_name}
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Manage your machinery certifications and review your field duty assignments.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">Active Bookings</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {assignedBookings.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Machinery Certifications Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center justify-between">
                <span>Eligible Machinery</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                  {eligibleEquipment.length} Qualified
                </span>
              </h2>

              {eligibleEquipment.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">
                  No machinery qualifications registered yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {eligibleEquipment.map((eq) => (
                    <div
                      key={eq.equipment_id}
                      className="p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-emerald-200 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-zinc-800">
                            {eq.equipment?.model_name || `Equipment #${eq.equipment_id}`}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Certified: {eq.cert_date ? new Date(eq.cert_date).toLocaleDateString() : "Active"}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                          ₹{eq.driver_hr_rate}/hr
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assigned Bookings Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center justify-between">
                <span>Field Operation Assignments</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                  {assignedBookings.length} Total
                </span>
              </h2>

              {assignedBookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-zinc-100 rounded-xl">
                  <p className="text-sm text-zinc-500">
                    No field assignments currently booked for you.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {assignedBookings.map((b) => (
                    <div key={b.booking_id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-600 mr-2">
                            #{b.booking_id}
                          </span>
                          <span className="font-bold text-zinc-900 text-base">
                            {b.equipment?.model_name || `Equipment #${b.equipment_id}`}
                          </span>
                        </div>
                        <BookingStatusBadge status={b.status} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <div>
                          <span className="text-zinc-400 block">Renter / Farmer:</span>
                          <span className="font-semibold text-zinc-800">
                            {b.users?.full_name || "Anonymous Farmer"}
                          </span>
                          {b.users?.phone && (
                            <span className="text-zinc-500 block">
                              📞 {b.users.phone}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-zinc-400 block">Rental Window:</span>
                          <span className="font-semibold text-zinc-800">
                            {b.start_date} to {b.end_date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

### frontend/app/dashboard/farmer/page.tsx

| Field | Value |
| --- | --- |
| Bytes | 8642 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/StatusBadge";
import type { AppUser, Booking, Payment } from "@/lib/types";

export default function FarmerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [bookings, setBookings] = useState<(Booking & { equipment: { model_name: string } | null })[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) { router.replace("/login"); return; }
        const userData = await userRes.json();
        if (!userData?.user) { router.replace("/login"); return; }

        const profile = userData.user as AppUser;
        if (cancelled) return;
        if (profile.role_type !== "FARMER") {
          router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
          return;
        }

        setUser(profile);

        // Load farmer's bookings from MySQL
        const bkRes = await fetch("/api/bookings?role=farmer");
        if (bkRes.ok) {
          const bkData = await bkRes.json();
          if (!cancelled) setBookings(bkData.bookings || []);
        }

        // Load payments
        const payRes = await fetch("/api/payments");
        if (payRes.ok) {
          const payData = await payRes.json();
          if (!cancelled) setPayments(payData.payments || []);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [router]);

  if (isLoading) return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </main>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 underline">Go to Login</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  const upcoming = bookings.filter(b => ["PENDING","CONFIRMED"].includes(b.status));
  const past = bookings.filter(b => ["COMPLETED","CANCELLED"].includes(b.status));

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 py-10 bg-gradient-to-b from-emerald-50/40 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-emerald-100">
            <h1 className="text-3xl font-extrabold text-zinc-900">
              Welcome, {user?.full_name?.split(" ")[0]} 👋
            </h1>
            <p className="text-zinc-600 mt-1 text-sm">Farmer Dashboard — manage your rentals and bookings.</p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <Link href="/equipment" className="p-5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              <p className="font-bold text-lg">Browse Equipment</p>
              <p className="text-sm text-emerald-100 mt-0.5">Find available machinery to rent</p>
            </Link>
            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
              <p className="text-2xl font-extrabold text-zinc-900">{upcoming.length}</p>
              <p className="text-sm text-zinc-600 mt-0.5">Active / Upcoming Bookings</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
              <p className="text-2xl font-extrabold text-zinc-900">{past.length}</p>
              <p className="text-sm text-zinc-600 mt-0.5">Past Bookings</p>
            </div>
          </div>

          {/* Upcoming bookings */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Active & Upcoming Bookings</h2>
            {upcoming.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/30">
                <p className="text-zinc-500 text-sm">No active bookings. <Link href="/equipment" className="text-emerald-700 font-medium hover:underline">Browse equipment →</Link></p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map(b => (
                  <div key={b.booking_id} className="p-5 rounded-xl border border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">{b.equipment?.model_name ?? `Equipment #${b.equipment_id}`}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{b.start_date} → {b.end_date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookingStatusBadge status={b.status} />
                      <span className="text-sm font-bold text-emerald-700">₹{Number(b.total_cost).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past bookings */}
          {past.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Past Bookings</h2>
              <div className="space-y-3">
                {past.map(b => (
                  <div key={b.booking_id} className="p-5 rounded-xl border border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-700">{b.equipment?.model_name ?? `Equipment #${b.equipment_id}`}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{b.start_date} → {b.end_date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookingStatusBadge status={b.status} />
                      <span className="text-sm font-semibold text-zinc-600">₹{Number(b.total_cost).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Payment history */}
          {payments.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Payment History</h2>
              <div className="space-y-3">
                {payments.map(p => (
                  <div key={p.payment_id} className="p-5 rounded-xl border border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">Booking #{p.booking_id}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{p.payment_method} · {new Date(p.transaction_time).toLocaleDateString("en-IN")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <PaymentStatusBadge status={p.payment_status} />
                      <span className="text-sm font-bold text-zinc-800">₹{Number(p.amount).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

### frontend/app/globals.css

| Field | Value |
| --- | --- |
| Bytes | 514 |
| Score | 0 |
| Why | context |
| Status | Full content |


```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### frontend/app/layout.tsx

| Field | Value |
| --- | --- |
| Bytes | 842 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agri-Share | Rent Farm Equipment Easily",
  description:
    "Peer-to-peer agricultural machinery and equipment rental platform. Rent tractors, harvesters, and farming tools with ease.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

### frontend/app/login/page.tsx

| Field | Value |
| --- | --- |
| Bytes | 7325 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { UserRole } from "@/lib/types";

const DASHBOARD_MAP: Record<UserRole, string> = {
  FARMER: "/dashboard/farmer",
  OWNER: "/dashboard/owner",
  DRIVER: "/dashboard/driver",
  ADMIN: "/dashboard/admin",
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please verify credentials.");
      }

      const role = data.user?.role_type as UserRole;
      const destination =
        redirectTo || DASHBOARD_MAP[role] || "/";
      router.push(destination);
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-600 flex items-center justify-center text-white mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Welcome back</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Sign in to your Agri-Share account
          </p>
        </div>

        {error && (
          <div className="mb-5 flex gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <svg
              className="w-4 h-4 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 8.25h.008v.008H12v-.008Z"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-sm transition-colors"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-b from-emerald-50/40 to-white">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-white rounded-2xl border border-emerald-100 shadow-sm p-8 text-center">
              <div className="w-8 h-8 mx-auto border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-zinc-400 mt-3">Loading sign in…</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

### frontend/app/page.tsx

| Field | Value |
| --- | --- |
| Bytes | 9686 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col font-sans">
      <Navbar activePage="home" />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white py-16 sm:py-24">
          {/* Decorative background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
            <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute top-32 left-10 w-80 h-80 rounded-full bg-emerald-100/50 blur-2xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Empowering Local Agriculture
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight sm:leading-tight">
              Rent Farm Equipment{" "}
              <span className="text-emerald-600 underline decoration-emerald-200 decoration-wavy underline-offset-8">
                Easily
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Find reliable tractors, harvesters, tillers, and specialized farm
              tools right in your community. Lower your operating costs and get
              the job done on time.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/equipment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg shadow-emerald-700/20 hover:-translate-y-0.5 transition-all"
              >
                <span>Browse Equipment</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-emerald-700 bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-xl hover:-translate-y-0.5 transition-all"
              >
                Create Account
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="mt-14 pt-10 border-t border-emerald-100/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  ),
                  title: "Verified Owners",
                  desc: "Rent machinery directly from trusted local farmers.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  ),
                  title: "Flexible Daily Rates",
                  desc: "Pay only for the exact days you need during peak seasons.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  ),
                  title: "Fast Booking",
                  desc: "Simple request workflow so you can stay focused on the field.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-emerald-100/80 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category showcase — categories shown here are illustrative UI structure;
            actual categories come from the database on the /equipment page. */}
        <section className="py-14 bg-white border-t border-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-zinc-900">
                Popular Farm Machinery
              </h2>
              <p className="text-sm text-zinc-500 mt-2">
                Explore farming equipment categories available for hire
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Tractors & Tillers",
                  desc: "Compact to high-horsepower tractors for plowing and hauling.",
                  tag: "High Demand",
                },
                {
                  title: "Harvesters & Combines",
                  desc: "Efficient grain and crop harvesting machinery.",
                  tag: "Seasonal",
                },
                {
                  title: "Seeders & Planters",
                  desc: "Precision seeding and drilling equipment for optimal yield.",
                  tag: "Ready",
                },
                {
                  title: "Irrigation & Sprayers",
                  desc: "Water pumps, boom sprayers, and crop protection units.",
                  tag: "Available",
                },
              ].map((category) => (
                <Link
                  href="/equipment"
                  key={category.title}
                  className="group p-5 rounded-2xl border border-zinc-100 bg-white hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-900/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        {category.tag}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {category.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-50 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>View Category</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

### frontend/components/Footer.tsx

| Field | Value |
| --- | --- |
| Bytes | 1409 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100/70 bg-emerald-50/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-800">Agri-Share</span>
              <span>&bull;</span>
              <span>Farm Equipment Sharing Platform</span>
            </div>
            <nav className="hidden sm:flex items-center gap-3">
              <Link
                href="/"
                className="hover:text-emerald-700 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/equipment"
                className="hover:text-emerald-700 transition-colors"
              >
                Equipment
              </Link>
              <Link
                href="/login"
                className="hover:text-emerald-700 transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
          <p>&copy; 2026 Agri-Share. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

### frontend/components/Navbar.tsx

| Field | Value |
| --- | --- |
| Bytes | 5482 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AppUser } from "@/lib/types";

interface NavbarProps {
  activePage?: "home" | "equipment" | "login";
}

export default function Navbar({ activePage }: NavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<Pick<
    AppUser,
    "full_name" | "role_type"
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data?.user) {
            setUser({
              full_name: data.user.full_name,
              role_type: data.user.role_type,
            });
          }
        }
      } catch {
        // DB or network offline
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setUser(null);
    router.push("/");
    router.refresh();
  }

  const linkBase =
    "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors";
  const activeLink =
    "text-emerald-700 bg-emerald-50 font-semibold";
  const inactiveLink =
    "text-zinc-600 hover:text-emerald-700 hover:bg-zinc-50";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 group-hover:bg-emerald-700 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 20h10" />
                <path d="M12 20v-8" />
                <path d="M12 12a5 5 0 0 0 5-5c0-3-5-3-5-3s0 3 0 3" />
                <path d="M12 12a5 5 0 0 1-5-5c0-3 5-3 5-3s0 3 0 3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors leading-none">
                Agri<span className="text-emerald-600">-Share</span>
              </span>
              <span className="text-[9px] uppercase font-semibold tracking-wider text-emerald-600">
                Farm Equipment Rentals
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`${linkBase} ${
                activePage === "home" ? activeLink : inactiveLink
              }`}
            >
              Home
            </Link>
            <Link
              href="/equipment"
              className={`${linkBase} ${
                activePage === "equipment" ? activeLink : inactiveLink
              }`}
            >
              Equipment
            </Link>

            {/* Auth section */}
            {loading ? (
              <div className="ml-2 h-8 w-24 bg-zinc-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="ml-2 flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-semibold text-zinc-800 leading-none">
                    {user.full_name}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wide">
                    {user.role_type}
                  </span>
                </div>
                <Link
                  href={`/dashboard/${user.role_type.toLowerCase()}`}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-zinc-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs hover:shadow-sm transition-all"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
```

### frontend/components/StatusBadge.tsx

| Field | Value |
| --- | --- |
| Bytes | 2735 |
| Score | 0 |
| Why | context |
| Status | Full content |


```tsx
import type { EquipmentStatus, BookingStatus, PaymentStatus } from "@/lib/types";

// ── Equipment Status Badge ───────────────────────────────────
interface EquipmentStatusBadgeProps {
  status: EquipmentStatus;
  pulse?: boolean;
}

export function EquipmentStatusBadge({
  status,
  pulse = false,
}: EquipmentStatusBadgeProps) {
  const styles: Record<EquipmentStatus, string> = {
    AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    RENTED: "bg-amber-50 text-amber-700 border-amber-200/70",
    MAINTENANCE: "bg-red-50 text-red-700 border-red-200/70",
  };

  const dotStyles: Record<EquipmentStatus, string> = {
    AVAILABLE: "bg-emerald-500",
    RENTED: "bg-amber-500",
    MAINTENANCE: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]} ${
          pulse && status === "AVAILABLE" ? "animate-pulse" : ""
        }`}
      />
      {status}
    </span>
  );
}

// ── Booking Status Badge ─────────────────────────────────────
interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const styles: Record<BookingStatus, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200/70",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200/70",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    CANCELLED: "bg-zinc-100 text-zinc-500 border-zinc-200/70",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ── Payment Status Badge ─────────────────────────────────────
interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const styles: Record<PaymentStatus, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200/70",
    SUCCESSFUL: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    FAILED: "bg-red-50 text-red-700 border-red-200/70",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
```

### frontend/eslint.config.mjs

| Field | Value |
| --- | --- |
| Bytes | 483 |
| Score | 0 |
| Why | context |
| Status | Full content |


```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### frontend/lib/auth.ts

| Field | Value |
| --- | --- |
| Bytes | 4484 |
| Score | 0 |
| Why | context |
| Status | Full content |


```ts
// ============================================================
// Agri-Share – Server-Side Authentication & Session Management
// Pure Node.js crypto + HTTP-only cookies. No third-party lock-in.
// ============================================================

import crypto from 'crypto';
import { cookies } from 'next/headers';
import type { AppUser } from './types';

const SESSION_COOKIE_NAME = 'agri_session';
const SESSION_SECRET=[REDACTED:SECRET] || 'agri_share_super_secret_college_dbms_key_2026';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// ------------------------------------------------------------
// Password Hashing & Verification
// Supports both PBKDF2 hashed passwords and direct strings
// for effortless professor viva verification in MySQL Workbench.
// ------------------------------------------------------------

export function hashPassword(password=[REDACTED:SECRET] string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password=[REDACTED:SECRET] storedHash: string): boolean {
  if (!storedHash) return false;

  // 1. Direct plain match (allows professors or students to insert demo rows in Workbench)
  if (storedHash === password) {
    return true;
  }

  // 2. Salted PBKDF2 hash verification
  const parts = storedHash.split(':');
  if (parts.length === 2) {
    const [salt, expectedHash] = parts;
    const computed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(expectedHash));
  }

  return false;
}

// ------------------------------------------------------------
// Signed Session Token Generation & Verification
// ------------------------------------------------------------

export interface SessionPayload {
  user_id: number;
  full_name: string;
  email: string;
  role_type: AppUser['role_type'];
  phone?: string | null;
  address?: string | null;
  exp: number;
}

function signPayload(payloadString: string): string {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadString)
    .digest('hex');
}

export function createSessionToken(user: AppUser): string {
  const payload: SessionPayload = {
    user_id: user.user_id,
    full_name: user.full_name,
    email: user.email,
    role_type: user.role_type,
    phone: user.phone || null,
    address: user.address || null,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token=[REDACTED:TOKEN] SessionPayload | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    if (!payloadBase64 || !signature) return null;

    const expectedSignature = signPayload(payloadBase64);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const json = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const payload = JSON.parse(json) as SessionPayload;

    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// Next.js Server-Side Cookie Handlers
// ------------------------------------------------------------

export async function setSession(user: AppUser): Promise<void> {
  const token=[REDACTED:TOKEN]
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token=[REDACTED:TOKEN]
  if (!token) return null;
  return verifySessionToken(token);
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };
```

### frontend/next-env.d.ts

| Field | Value |
| --- | --- |
| Bytes | 303 |
| Score | 0 |
| Why | context |
| Status | Full content |


```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

### frontend/next.config.ts

| Field | Value |
| --- | --- |
| Bytes | 335 |
| Score | 0 |
| Why | context |
| Status | Full content |


```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```