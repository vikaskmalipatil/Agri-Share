"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EquipmentStatusBadge, BookingStatusBadge } from "@/components/StatusBadge";
import type {
  AppUser,
  Equipment,
  EquipmentType,
  Booking,
  MaintenanceLog,
  EquipmentStatus,
  BookingStatus,
} from "@/lib/types";

export default function OwnerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [equipmentList, setEquipmentList] = useState<
    (Equipment & { equipment_types: EquipmentType | null })[]
  >([]);
  const [categories, setCategories] = useState<EquipmentType[]>([]);
  const [bookings, setBookings] = useState<
    (Booking & {
      equipment: { model_name: string } | null;
      users: { full_name: string; phone: string | null; email: string } | null;
    })[]
  >([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"equipment" | "bookings" | "maintenance">(
    "equipment"
  );

  // Form states for adding equipment
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [newTypeId, setNewTypeId] = useState<number | "">("");
  const [newDailyRate, setNewDailyRate] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Maintenance log modal state
  const [showMaintModal, setShowMaintModal] = useState(false);
  const [selectedEquipId, setSelectedEquipId] = useState<number | null>(null);
  const [maintType, setMaintType] = useState("");
  const [maintCost, setMaintCost] = useState<number | "">("");
  const [maintDesc, setMaintDesc] = useState("");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch current user
      const userRes = await fetch("/api/auth/me");
      if (!userRes.ok) { router.replace("/login"); return; }
      const userData = await userRes.json();
      if (!userData?.user) { router.replace("/login"); return; }

      const profile = userData.user as AppUser;
      if (profile.role_type !== "OWNER") {
        router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
        return;
      }
      setUser(profile);

      // 2. Fetch categories
      const catRes = await fetch("/api/categories");
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || []);
      }

      // 3. Fetch owned equipment
      const equipRes = await fetch(`/api/equipment?ownerId=${profile.user_id}&status=ALL`);
      let ownedEquip: (Equipment & { equipment_types: EquipmentType | null })[] = [];
      if (equipRes.ok) {
        const equipJson = await equipRes.json();
        ownedEquip = equipJson.equipment || [];
        setEquipmentList(ownedEquip);
      }

      // 4. Fetch bookings for owned equipment
      const bkRes = await fetch("/api/bookings?role=owner");
      if (bkRes.ok) {
        const bkJson = await bkRes.json();
        setBookings(bkJson.bookings || []);
      }

      // 5. Fetch maintenance logs
      const maintRes = await fetch("/api/maintenance");
      if (maintRes.ok) {
        const maintJson = await maintRes.json();
        setMaintenanceLogs(maintJson.logs || []);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load owner data");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    async function initialFetch() {
      try {
        const userRes = await fetch("/api/auth/me");
        if (cancelled) return;
        if (!userRes.ok) { router.replace("/login"); return; }
        const userData = await userRes.json();
        if (!userData?.user) { router.replace("/login"); return; }

        const profile = userData.user as AppUser;
        if (profile.role_type !== "OWNER") {
          router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
          return;
        }
        setUser(profile);

        const catRes = await fetch("/api/categories");
        if (catRes.ok && !cancelled) {
          const catData = await catRes.json();
          setCategories(catData.categories || []);
        }

        const equipRes = await fetch(`/api/equipment?ownerId=${profile.user_id}&status=ALL`);
        if (equipRes.ok && !cancelled) {
          const equipJson = await equipRes.json();
          setEquipmentList(equipJson.equipment || []);
        }

        const bkRes = await fetch("/api/bookings?role=owner");
        if (bkRes.ok && !cancelled) {
          const bkJson = await bkRes.json();
          setBookings(bkJson.bookings || []);
        }

        const maintRes = await fetch("/api/maintenance");
        if (maintRes.ok && !cancelled) {
          const maintJson = await maintRes.json();
          setMaintenanceLogs(maintJson.logs || []);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load owner data");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    initialFetch();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // Handle Equipment Status Change
  async function handleStatusChange(equipmentId: number, newStatus: EquipmentStatus) {
    try {
      const res = await fetch(`/api/equipment/${equipmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to update status");
      }

      setEquipmentList((prev) =>
        prev.map((e) => (e.equipment_id === equipmentId ? { ...e, status: newStatus } : e))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    }
  }

  // Handle Booking Status Update (Confirm / Reject)
  async function handleBookingStatus(bookingId: number, newStatus: BookingStatus) {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId, status: newStatus }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to update booking status");
      }

      setBookings((prev) =>
        prev.map((b) => (b.booking_id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update booking status");
    }
  }

  // Handle Add Equipment
  async function handleAddEquipment(e: FormEvent) {
    e.preventDefault();
    if (!user || !newModelName || !newTypeId || !newDailyRate) return;

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const res = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: newModelName.trim(),
          type_id: Number(newTypeId),
          daily_rate: Number(newDailyRate),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add equipment");
      }

      setFormMessage({ type: "success", text: "Equipment successfully added to catalog!" });
      setNewModelName("");
      setNewTypeId("");
      setNewDailyRate("");
      setTimeout(() => {
        setShowAddModal(false);
        setFormMessage(null);
        loadData();
      }, 1200);
    } catch (err: unknown) {
      setFormMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add equipment",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle Log Maintenance
  async function handleAddMaintenance(e: FormEvent) {
    e.preventDefault();
    if (!selectedEquipId || !maintType || !maintCost) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipment_id: selectedEquipId,
          service_type: maintType.trim(),
          cost: Number(maintCost),
          description: maintDesc.trim() || null,
          set_maintenance_status: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add maintenance log");
      }

      setShowMaintModal(false);
      setMaintType("");
      setMaintCost("");
      setMaintDesc("");
      loadData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to add maintenance log");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 underline">
              Return to Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalEarnings = bookings
    .filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED")
    .reduce((acc, curr) => acc + Number(curr.total_cost || 0), 0);

  const pendingBookings = bookings.filter((b) => b.status === "PENDING");

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10 bg-gradient-to-b from-emerald-50/40 via-stone-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-8 border-b border-emerald-100 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-2 border border-emerald-200">
                Equipment Owner Portal
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-900">
                Welcome, {user?.full_name}
              </h1>
              <p className="text-sm text-zinc-600 mt-1">
                Manage your machinery listings, rental requests, and maintenance schedules.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>List New Equipment</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-harvest font-semibold mb-1">
                Total Machinery
              </p>
              <p className="text-2xl font-extrabold text-harvest">{equipmentList.length}</p>
            </div>

            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-harvest font-semibold mb-1">
                Available for Rent
              </p>
              <p className="text-2xl font-extrabold text-harvest">
                {equipmentList.filter((e) => e.status === "AVAILABLE").length}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-harvest font-semibold mb-1">
                Pending Requests
              </p>
              <p className="text-2xl font-extrabold text-harvest">{pendingBookings.length}</p>
            </div>

            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-harvest font-semibold mb-1">
                Estimated Revenue
              </p>
              <p className="text-2xl font-extrabold text-harvest">
                ₹{totalEarnings.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-200 mb-6 gap-6">
            <button
              onClick={() => setActiveTab("equipment")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "equipment"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              My Machinery ({equipmentList.length})
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors relative ${
                activeTab === "bookings"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Booking Requests ({bookings.length})
              {pendingBookings.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full font-bold">
                  {pendingBookings.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("maintenance")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "maintenance"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Maintenance Records ({maintenanceLogs.length})
            </button>
          </div>

          {/* TAB 1: Equipment */}
          {activeTab === "equipment" && (
            <div>
              {equipmentList.length === 0 ? (
                <div className="text-center py-14 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/20 p-8">
                  <p className="text-zinc-600 font-medium">You haven&apos;t listed any farm equipment yet.</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 px-5 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
                  >
                    List Your First Equipment
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {equipmentList.map((item) => (
                    <div
                      key={item.equipment_id}
                      className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <EquipmentStatusBadge status={item.status} />
                          <span className="text-xs font-mono text-zinc-400">#{item.equipment_id}</span>
                        </div>

                        <h3 className="text-lg font-bold text-zinc-900">{item.model_name}</h3>
                        <p className="text-xs text-emerald-700 font-medium mt-0.5">
                          {item.equipment_types?.category_name ?? "General Farm Equipment"}
                        </p>

                        <div className="mt-4 pt-3 border-t border-zinc-100">
                          <span className="text-xs text-zinc-400 uppercase font-semibold">Daily Rate</span>
                          <p className="text-lg font-extrabold text-emerald-700">
                            ₹{Number(item.daily_rate).toLocaleString("en-IN")} / day
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.equipment_id, e.target.value as EquipmentStatus)
                          }
                          className="text-xs font-medium border border-zinc-300 rounded-lg px-2.5 py-1.5 bg-white focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="AVAILABLE">AVAILABLE</option>
                          <option value="RENTED">RENTED</option>
                          <option value="MAINTENANCE">MAINTENANCE</option>
                        </select>

                        <button
                          onClick={() => {
                            setSelectedEquipId(item.equipment_id);
                            setShowMaintModal(true);
                          }}
                          className="text-xs font-medium text-zinc-600 hover:text-emerald-700 border border-zinc-200 hover:border-emerald-300 px-3 py-1.5 rounded-lg"
                        >
                          + Log Service
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Bookings */}
          {activeTab === "bookings" && (
            <div>
              {bookings.length === 0 ? (
                <div className="text-center py-14 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/20 p-8">
                  <p className="text-zinc-600 font-medium">No booking requests received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.booking_id}
                      className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-zinc-900 text-base">
                            {b.equipment?.model_name ?? `Equipment #${b.equipment_id}`}
                          </span>
                          <BookingStatusBadge status={b.status} />
                        </div>
                        <p className="text-xs text-zinc-500">
                          Renter:{" "}
                          <span className="font-semibold text-zinc-700">
                            {b.users?.full_name || `Farmer #${b.renter_id}`}
                          </span>{" "}
                          {b.users?.phone && `(${b.users.phone})`}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Rental Period:{" "}
                          <span className="font-medium text-zinc-800">
                            {b.start_date} to {b.end_date}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[11px] uppercase text-zinc-400 font-semibold block">
                            Total Fee
                          </span>
                          <span className="text-base font-extrabold text-emerald-700">
                            ₹{Number(b.total_cost).toLocaleString("en-IN")}
                          </span>
                        </div>

                        {b.status === "PENDING" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleBookingStatus(b.booking_id, "CONFIRMED")}
                              className="px-3.5 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleBookingStatus(b.booking_id, "CANCELLED")}
                              className="px-3.5 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {b.status === "CONFIRMED" && (
                          <button
                            onClick={() => handleBookingStatus(b.booking_id, "COMPLETED")}
                            className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Maintenance */}
          {activeTab === "maintenance" && (
            <div>
              {maintenanceLogs.length === 0 ? (
                <div className="text-center py-14 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/20 p-8">
                  <p className="text-zinc-600 font-medium">No maintenance records logged yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {maintenanceLogs.map((log) => (
                    <div
                      key={log.log_id}
                      className="p-5 rounded-xl border border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900">{log.service_type}</span>
                          <span className="text-xs text-zinc-400 font-mono">
                            Equipment #{log.equipment_id}
                          </span>
                        </div>
                        {log.description && (
                          <p className="text-xs text-zinc-600 mt-1">{log.description}</p>
                        )}
                        <p className="text-[11px] text-zinc-400 mt-1">
                          Date: {new Date(log.service_date).toLocaleDateString("en-IN")}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-zinc-400 block uppercase font-semibold">Cost</span>
                        <span className="text-sm font-bold text-red-600">
                          ₹{Number(log.cost).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* MODAL 1: Add Equipment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">List New Farm Machinery</h2>

            {formMessage && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-medium ${
                  formMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {formMessage.text}
              </div>
            )}

            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Model / Machine Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Deere 5050D (50 HP)"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Machinery Category
                </label>
                <select
                  required
                  value={newTypeId}
                  onChange={(e) => setNewTypeId(Number(e.target.value))}
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Select category…</option>
                  {categories.map((c) => (
                    <option key={c.type_id} value={c.type_id}>
                      {c.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Daily Rental Rate (₹)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  placeholder="e.g. 1500"
                  value={newDailyRate}
                  onChange={(e) => setNewDailyRate(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
                >
                  {isSubmitting ? "Saving…" : "Save Equipment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Maintenance Log */}
      {showMaintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Log Maintenance Service
            </h2>

            <form onSubmit={handleAddMaintenance} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Service Type
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oil Change, Hydraulic Repair, Tire replacement"
                  value={maintType}
                  onChange={(e) => setMaintType(e.target.value)}
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Service Cost (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="e.g. 2400"
                  value={maintCost}
                  onChange={(e) => setMaintCost(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Notes / Details
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional details about parts replaced or mechanic info..."
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowMaintModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
                >
                  {isSubmitting ? "Logging…" : "Record Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
