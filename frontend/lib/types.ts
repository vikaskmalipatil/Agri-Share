// ============================================================
// Agri-Share – Shared TypeScript type definitions
// Mirrors the actual public schema in Supabase PostgreSQL.
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
  /** Added via migration 001_auth_user_id.sql – links to auth.users(id) */
  auth_user_id?: string | null;
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
