# TokenCap Project Graph

Generated: 10/25/2026, 11:24:17 AM

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
