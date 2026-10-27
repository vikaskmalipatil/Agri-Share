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
    AVAILABLE: "bg-emerald-100 text-emerald-800 border-emerald-300",
    RENTED: "bg-amber-100 text-amber-800 border-amber-300",
    MAINTENANCE: "bg-rose-100 text-rose-800 border-rose-300",
  };

  const dotStyles: Record<EquipmentStatus, string> = {
    AVAILABLE: "bg-emerald-600",
    RENTED: "bg-amber-500",
    MAINTENANCE: "bg-rose-600",
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
    PENDING: "bg-amber-100 text-amber-800 border-amber-300",
    CONFIRMED: "bg-emerald-100 text-emerald-800 border-emerald-300",
    COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-300",
    CANCELLED: "bg-zinc-100 text-zinc-600 border-zinc-200/70",
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
    PENDING: "bg-amber-100 text-amber-800 border-amber-300",
    SUCCESSFUL: "bg-emerald-100 text-emerald-800 border-emerald-300",
    FAILED: "bg-rose-100 text-rose-800 border-rose-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
