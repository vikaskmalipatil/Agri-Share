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

SESSION_SECRET=agri_share_super_secret_college_dbms_key_2026
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
