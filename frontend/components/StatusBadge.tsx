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
