# Agri-Share — Farm Equipment Rental Platform

Agri-Share is a modern, peer-to-peer agricultural machinery and equipment sharing web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase PostgreSQL**.

---

## 🚜 Problem & Solution

- **Problem**: Small and medium-scale farmers cannot afford high-capital farm machinery needed only during seasonal windows (plowing, sowing, harvesting). Meanwhile, equipment owners often have machinery sitting idle between seasons.
- **Solution**: Agri-Share bridges local farmers and machinery owners through an intuitive, real-time rental platform with verified equipment listings, operator selection, date-overlap validation, and role-based management.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Partial Prerendering & Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS)
- **State & Data Access**: `@supabase/ssr`

---

## 📂 Project Architecture

```
Agri-Share/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── equipment/
│   │   │   ├── page.tsx                # Catalog with search, filters & sort
│   │   │   └── [id]/page.tsx           # Machine details & reservation modal
│   │   ├── login/page.tsx              # Auth sign in with role redirect
│   │   ├── signup/page.tsx             # User registration (Farmer, Owner, Driver)
│   │   └── dashboard/
│   │       ├── farmer/page.tsx         # Farmer bookings, rentals & payments
│   │       ├── owner/page.tsx          # Inventory management, requests & service logs
│   │       ├── driver/page.tsx         # Operating assignments & rate cards
│   │       └── admin/page.tsx          # System administration & real-time metrics
│   ├── components/                     # Shared UI components (Navbar, Footer, Badges)
│   ├── lib/                            # Supabase SSR clients & TypeScript interfaces
│   └── middleware.ts                   # Auth session refresh & protected routes
└── supabase/
    ├── migrations/                     # Safe additive SQL migrations
    └── schema_from_scratch.sql         # Complete standalone DDL schema
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/vikaskmalipatil/Agri-Share.git
cd Agri-Share/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file inside `frontend/`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_or_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_or_anon_key
```

### 4. Database Setup
Execute `supabase/schema_from_scratch.sql` in your [Supabase SQL Editor](https://app.supabase.com).

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 License
Academic and open-source project. Developed for Agri-Share farm equipment sharing.
