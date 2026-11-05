# Agri-Share — Farm Equipment Rental Platform

Agri-Share is a peer-to-peer agricultural machinery and equipment sharing web application and DBMS mini-project. The frontend API uses **Supabase (PostgreSQL)**; the separate academic database scripts in `database/` target **MySQL 8.0**.

---

## 🚜 Problem & Solution

- **Problem**: Small and medium-scale farmers cannot afford high-capital farm machinery needed only during seasonal windows (plowing, sowing, harvesting). Meanwhile, equipment owners often have machinery sitting idle between seasons.
- **Solution**: Agri-Share bridges local farmers and machinery owners through an intuitive rental platform with verified equipment listings, operator selection, date-overlap validation, and role-based management.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Frontend API backend**: Supabase (PostgreSQL)
- **Academic DBMS scripts**: MySQL 8.0 (InnoDB)
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
    │   ├── api/                        # Server-side Supabase API routes
    │   ├── dashboard/                  # Role-based dashboards (Farmer, Owner, Driver, Admin)
    │   ├── equipment/                  # Equipment catalog and booking
    │   ├── login/                      # Authentication
    │   └── signup/                     # User registration
    ├── components/                     # Shared UI components (Navbar, Footer, StatusBadge)
    ├── lib/                            # Supabase client, auth helpers, types
    └── middleware.ts                   # Route protection middleware
```

---

## 🚀 Getting Started

### 1. Configure the application database (Supabase)
Create a Supabase project, then open its **SQL Editor** and execute:
1. `database/supabase_schema.sql`
2. `database/supabase_seeds.sql`

Inside `frontend/`, copy `.env.example` to `.env.local` and set the values from **Supabase Dashboard → Project Settings → API**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SESSION_SECRET=replace-with-a-long-random-secret
```

`SUPABASE_SERVICE_ROLE_KEY` is a secret used only by server-side API routes. Do not add the `NEXT_PUBLIC_` prefix to it, expose it in browser code, or commit `.env.local`.

### 2. Install Dependencies & Run
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Academic MySQL scripts
The MySQL scripts (`database/schema.sql`, `database/seeds.sql`, and `database/demo_queries.sql`) are maintained for the DBMS coursework and can be run separately in MySQL Workbench. The current frontend API does not connect to that MySQL database.

---

## 📜 License
Academic DBMS Mini-Project. Developed for Agri-Share farm equipment sharing.
