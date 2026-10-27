"use client";

import { useEffect, useState, useMemo, FormEvent, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EquipmentStatusBadge } from "@/components/StatusBadge";
import type { Equipment, EquipmentDriver, AppUser } from "@/lib/types";

type EquipmentDetail = Omit<Equipment, "equipment_types" | "users"> & {
  equipment_types?:
    | { category_name: string; description: string | null }
    | { category_name: string; description: string | null }[]
    | null;
  users?:
    | { full_name: string; phone: string | null }
    | { full_name: string; phone: string | null }[]
    | null;
};

type DriverWithUser = Omit<EquipmentDriver, "users"> & {
  users?:
    | { full_name: string; phone: string | null }
    | { full_name: string; phone: string | null }[]
    | null;
};

function EquipmentDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [equipment, setEquipment] = useState<EquipmentDetail | null>(null);
  const [drivers, setDrivers] = useState<DriverWithUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState<number | "">("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessId, setBookingSuccessId] = useState<number | null>(null);

  // Load Equipment and Driver Data
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const numId = parseInt(id, 10);
      if (isNaN(numId) || numId <= 0) {
        if (!cancelled) {
          setNotFound(true);
          setIsLoading(false);
        }
        return;
      }

      try {
        // Fetch current session & user profile
        const userRes = await fetch("/api/auth/me");
        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData?.user && !cancelled) {
            setCurrentUser(userData.user as AppUser);
          }
        }

        // Fetch equipment & drivers from MySQL API
        const equipRes = await fetch(`/api/equipment/${numId}`);
        if (cancelled) return;

        if (!equipRes.ok) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        const equipJson = await equipRes.json();
        if (!equipJson.equipment) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        setEquipment(equipJson.equipment as EquipmentDetail);
        setDrivers(equipJson.drivers || []);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load equipment details."
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Today string for date input min
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, []);

  // Calculate rental duration in days (inclusive: start to end)
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (e < s) return 0;
    const diffTime = e.getTime() - s.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [startDate, endDate]);

  // Calculate cost
  const calculatedCost = useMemo(() => {
    if (!equipment || rentalDays <= 0) return { equipCost: 0, driverCost: 0, total: 0 };
    const equipCost = rentalDays * Number(equipment.daily_rate);
    let driverCost = 0;
    if (selectedDriverId !== "") {
      const driver = drivers.find((d) => d.driver_id === Number(selectedDriverId));
      if (driver) {
        // Standard full day assumption: 8 operational hours per day
        driverCost = Number(driver.driver_hr_rate) * 8 * rentalDays;
      }
    }
    return {
      equipCost,
      driverCost,
      total: equipCost + driverCost,
    };
  }, [equipment, rentalDays, selectedDriverId, drivers]);

  // Handle Booking Submission
  async function handleConfirmBooking(e: FormEvent) {
    e.preventDefault();
    if (!currentUser) {
      router.push(`/login?redirectTo=/equipment/${id}`);
      return;
    }

    if (currentUser.role_type !== "FARMER") {
      setBookingError("Only registered Farmers can place equipment rental bookings.");
      return;
    }

    if (!startDate || !endDate || rentalDays <= 0) {
      setBookingError("Please select a valid start and end date.");
      return;
    }

    setBookingLoading(true);
    setBookingError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipment_id: equipment?.equipment_id,
          driver_id: selectedDriverId !== "" ? Number(selectedDriverId) : null,
          start_date: startDate,
          end_date: endDate,
          total_cost: calculatedCost.total,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to complete booking.");
      }

      setBookingSuccessId(data.booking_id);
    } catch (err: unknown) {
      setBookingError(
        err instanceof Error ? err.message : "Failed to complete booking. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  }

  const formatPrice = (price: number | string) => {
    const num = typeof price === "number" ? price : parseFloat(String(price));
    if (isNaN(num)) return `₹${price}`;
    return `₹${num.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar activePage="equipment" />
        <main className="flex-1 py-12 bg-gradient-to-b from-emerald-50/40 to-stone-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-32 bg-zinc-200 rounded" />
              <div className="h-10 w-2/3 bg-zinc-200 rounded" />
              <div className="h-6 w-40 bg-zinc-100 rounded-full" />
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-zinc-100 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error / Not Found State
  if (error || notFound || !equipment) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar activePage="equipment" />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-5">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">
              {error ? "Unable to Load Equipment" : "Equipment Not Found"}
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              {error ?? (
                <>
                  The equipment with ID{" "}
                  <span className="font-mono bg-zinc-100 px-1.5 py-0.5 rounded">{id}</span> does not exist or is not active.
                </>
              )}
            </p>
            <Link
              href="/equipment"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
            >
              ← Back to Equipment
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isAvailable = equipment.status === "AVAILABLE";

  const categoryName = Array.isArray(equipment.equipment_types)
    ? equipment.equipment_types[0]?.category_name
    : equipment.equipment_types?.category_name;

  const categoryDescription = Array.isArray(equipment.equipment_types)
    ? equipment.equipment_types[0]?.description
    : equipment.equipment_types?.description;

  const getDriverName = (d: DriverWithUser) => {
    if (!d.users) return `Certified Driver #${d.driver_id}`;
    return Array.isArray(d.users)
      ? d.users[0]?.full_name ?? `Certified Driver #${d.driver_id}`
      : d.users.full_name ?? `Certified Driver #${d.driver_id}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar activePage="equipment" />

      <main className="flex-1 py-10 sm:py-14 bg-gradient-to-b from-emerald-50/40 to-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/equipment" className="hover:text-emerald-700 transition-colors">
              Equipment
            </Link>
            <span>/</span>
            <span className="text-zinc-700 font-medium truncate max-w-[200px]">
              {equipment.model_name}
            </span>
          </nav>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="farm-image-frame relative aspect-[2.4/1] min-h-44">
              <Image
                src="/farm-equipment.svg"
                alt={`Farm equipment available to rent: ${equipment.model_name}`}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-8 text-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  {categoryName && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-2">
                      {categoryName}
                    </span>
                  )}
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    {equipment.model_name}
                  </h1>
                  <p className="text-sm text-emerald-200 mt-1">
                    Equipment ID: <span className="font-mono">#{equipment.equipment_id}</span>
                  </p>
                </div>
                <div className="shrink-0">
                  <EquipmentStatusBadge status={equipment.status} pulse />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8">
              {/* Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-1">
                    Daily Rental Rate
                  </p>
                  <p className="text-2xl font-extrabold text-emerald-800">
                    {formatPrice(equipment.daily_rate)}
                  </p>
                  <p className="text-xs text-emerald-600 mt-0.5">per calendar day</p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                    Category
                  </p>
                  <p className="text-base font-bold text-zinc-800">
                    {categoryName ?? "—"}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                    Availability
                  </p>
                  <p
                    className={`text-base font-bold ${
                      isAvailable ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {equipment.status === "AVAILABLE"
                      ? "Ready for Dispatch"
                      : equipment.status === "RENTED"
                      ? "Currently in Field"
                      : "Under Maintenance"}
                  </p>
                </div>
              </div>

              {/* Category Info */}
              {categoryDescription && (
                <div className="mb-8">
                  <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Equipment Category Details
                  </h2>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {categoryDescription}
                  </p>
                </div>
              )}

              {/* Qualified Drivers */}
              {drivers.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    Qualified Operators Available ({drivers.length})
                  </h2>
                  <div className="space-y-2">
                    {drivers.map((d) => (
                      <div
                        key={d.driver_id}
                        className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-100"
                      >
                        <div>
                          <p className="text-sm font-semibold text-zinc-800">
                            {getDriverName(d)}
                          </p>
                          {d.cert_date && (
                            <p className="text-xs text-zinc-500">
                              Certified: {formatDate(d.cert_date)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-zinc-400 uppercase tracking-wide block">
                            Operator Rate
                          </span>
                          <span className="text-sm font-bold text-zinc-800">
                            {formatPrice(d.driver_hr_rate)} / hr
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-zinc-100">
                <Link
                  href="/equipment"
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors text-center"
                >
                  ← Back to Equipment
                </Link>

                {isAvailable ? (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        router.push(`/login?redirectTo=/equipment/${id}`);
                      } else {
                        setShowBookingModal(true);
                      }
                    }}
                    className="w-full sm:w-auto flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95 text-center"
                  >
                    <span>Reserve Equipment Now</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                ) : (
                  <div className="w-full sm:w-auto flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-zinc-400 bg-zinc-100 rounded-xl cursor-not-allowed">
                    Currently Unavailable
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 max-w-lg w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
            {bookingSuccessId ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Booking Confirmed!</h3>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  Your reservation request (<strong>#{bookingSuccessId}</strong>) has been placed with status{" "}
                  <span className="text-emerald-700 font-semibold">PENDING</span>. The equipment owner will review and confirm.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/dashboard/farmer"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
                  >
                    View in Farmer Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setBookingSuccessId(null);
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
                  <h2 className="text-xl font-bold text-zinc-900">Book Equipment Rental</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-950 block">{equipment.model_name}</span>
                    <span className="text-emerald-700">Daily rate: ₹{Number(equipment.daily_rate).toLocaleString("en-IN")}/day</span>
                  </div>
                  <span className="font-mono text-emerald-800">#{equipment.equipment_id}</span>
                </div>

                {bookingError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                    {bookingError}
                  </div>
                )}

                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (endDate && e.target.value > endDate) {
                          setEndDate(e.target.value);
                        }
                      }}
                      className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      min={startDate || todayStr}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Optional Driver Selection */}
                  {drivers.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                        Optional Driver Assistance
                      </label>
                      <select
                        value={selectedDriverId}
                        onChange={(e) =>
                          setSelectedDriverId(e.target.value === "" ? "" : Number(e.target.value))
                        }
                        className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="">No Driver (Self-Operated)</option>
                        {drivers.map((d) => (
                          <option key={d.driver_id} value={d.driver_id}>
                            {getDriverName(d)} (+₹{Number(d.driver_hr_rate)}/hr)
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Calculated based on standard 8-hour operational shift per rental day.
                      </p>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  {rentalDays > 0 && (
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-2">
                      <div className="flex justify-between text-zinc-600">
                        <span>Duration:</span>
                        <span className="font-semibold">{rentalDays} {rentalDays === 1 ? "day" : "days"}</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Machine Charge ({rentalDays} × ₹{Number(equipment.daily_rate).toLocaleString("en-IN")}):</span>
                        <span className="font-semibold">₹{calculatedCost.equipCost.toLocaleString("en-IN")}</span>
                      </div>
                      {calculatedCost.driverCost > 0 && (
                        <div className="flex justify-between text-zinc-600">
                          <span>Driver Assistance (8 hrs/day):</span>
                          <span className="font-semibold">₹{calculatedCost.driverCost.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-bold text-zinc-900">
                        <span>Total Estimated Cost:</span>
                        <span className="text-emerald-700">₹{calculatedCost.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={bookingLoading || rentalDays <= 0}
                      className="px-6 py-2.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
                    >
                      {bookingLoading ? "Reserving Machine…" : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function EquipmentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex flex-col font-sans">
          <Navbar activePage="equipment" />
          <main className="flex-1 py-12 bg-gradient-to-b from-emerald-50/40 to-stone-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse space-y-6">
                <div className="h-4 w-32 bg-zinc-200 rounded" />
                <div className="h-10 w-2/3 bg-zinc-200 rounded" />
                <div className="h-6 w-40 bg-zinc-100 rounded-full" />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <EquipmentDetailContent />
    </Suspense>
  );
}
