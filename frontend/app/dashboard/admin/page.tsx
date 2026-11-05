"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  EquipmentStatusBadge,
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/StatusBadge";
import type {
  AppUser,
  Equipment,
  Booking,
  Payment,
  Review,
  UserRole,
} from "@/lib/types";

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "users" | "equipment" | "bookings" | "payments" | "reviews"
  >("users");
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [userSearch, setUserSearch] = useState("");

  const loadAdminData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/data");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.replace("/login");
          return;
        }
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to load admin data");
      }

      const data = await res.json();
      setCurrentUser(data.currentUser);
      setUsers(data.users || []);
      setEquipment(data.equipment || []);
      setBookings(data.bookings || []);
      setPayments(data.payments || []);
      setReviews(data.reviews || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    async function initialFetch() {
      try {
        const res = await fetch("/api/admin/data");
        if (cancelled) return;
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            router.replace("/login");
            return;
          }
          const errJson = await res.json();
          throw new Error(errJson.error || "Failed to load admin data");
        }

        const data = await res.json();
        if (cancelled) return;
        setCurrentUser(data.currentUser);
        setUsers(data.users || []);
        setEquipment(data.equipment || []);
        setBookings(data.bookings || []);
        setPayments(data.payments || []);
        setReviews(data.reviews || []);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load admin data");
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
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-red-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 8.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Access Restricted</h2>
            <p className="text-sm text-zinc-600 mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block px-5 py-2 text-xs font-medium text-white bg-emerald-700 rounded-xl shadow-md shadow-emerald-900/10"
            >
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "ALL" || u.role_type === roleFilter;
    const matchesSearch =
      userSearch === "" ||
      u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const totalRevenue = payments
    .filter((p) => p.payment_status === "SUCCESSFUL")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10 bg-gradient-to-b from-emerald-50/40 via-stone-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-6 mb-8 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold tracking-wide uppercase mb-2 border border-purple-200">
                System Administration
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-900">
                Platform Overview
              </h1>
              <p className="text-sm text-zinc-600 mt-1">
                Signed in as Administrator: {currentUser?.full_name} ({currentUser?.email})
              </p>
            </div>

            <button
              onClick={loadAdminData}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors self-start sm:self-auto"
            >
              ↻ Refresh Data
            </button>
          </div>

          {/* Aggregated Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-harvest font-semibold block mb-1">
                Total Users
              </span>
              <span className="text-2xl font-extrabold text-harvest">{users.length}</span>
            </div>

            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-harvest font-semibold block mb-1">
                Equipment Listed
              </span>
              <span className="text-2xl font-extrabold text-harvest">{equipment.length}</span>
            </div>

            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-harvest font-semibold block mb-1">
                Total Bookings
              </span>
              <span className="text-2xl font-extrabold text-harvest">{bookings.length}</span>
            </div>

            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-harvest font-semibold block mb-1">
                Successful Payments
              </span>
              <span className="text-2xl font-extrabold text-harvest">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-200 mb-6 gap-6 overflow-x-auto">
            {(
              [
                ["users", `Users (${users.length})`],
                ["equipment", `Equipment (${equipment.length})`],
                ["bookings", `Bookings (${bookings.length})`],
                ["payments", `Payments (${payments.length})`],
                ["reviews", `Reviews (${reviews.length})`],
              ] as const
            ).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* TAB: USERS */}
          {activeTab === "users" && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-between">
                <input
                  type="search"
                  placeholder="Search user name or email…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full sm:w-72 text-sm border border-zinc-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs text-zinc-500 font-medium">Filter role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as "ALL" | UserRole)}
                    className="text-xs border border-zinc-300 rounded-lg px-2.5 py-1.5 bg-white focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="FARMER">FARMER</option>
                    <option value="OWNER">OWNER</option>
                    <option value="DRIVER">DRIVER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Full Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-zinc-400">
                            No users match the criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u.user_id} className="hover:bg-zinc-50/50">
                            <td className="py-3 px-4 font-mono text-zinc-400">#{u.user_id}</td>
                            <td className="py-3 px-4 font-semibold text-zinc-900">{u.full_name}</td>
                            <td className="py-3 px-4 text-zinc-600">{u.email}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  u.role_type === "ADMIN"
                                    ? "bg-earth/10 text-earth"
                                    : u.role_type === "OWNER"
                                    ? "bg-crop/25 text-earth"
                                    : u.role_type === "DRIVER"
                                    ? "bg-leaf/10 text-leaf-dark"
                                    : "bg-emerald-100 text-harvest"
                                }`}
                              >
                                {u.role_type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-zinc-500">{u.phone || "—"}</td>
                            <td className="py-3 px-4 text-zinc-400">
                              {new Date(u.created_at).toLocaleDateString("en-IN")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EQUIPMENT */}
          {activeTab === "equipment" && (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Model Name</th>
                      <th className="py-3 px-4">Daily Rate</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Owner ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {equipment.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-zinc-400">
                          No equipment currently registered.
                        </td>
                      </tr>
                    ) : (
                      equipment.map((e) => (
                        <tr key={e.equipment_id} className="hover:bg-zinc-50/50">
                          <td className="py-3 px-4 font-mono text-zinc-400">#{e.equipment_id}</td>
                          <td className="py-3 px-4 font-semibold text-zinc-900">{e.model_name}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">
                            ₹{Number(e.daily_rate).toLocaleString("en-IN")}/day
                          </td>
                          <td className="py-3 px-4">
                            <EquipmentStatusBadge status={e.status} />
                          </td>
                          <td className="py-3 px-4 text-zinc-500 font-mono">Owner #{e.owner_id}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Renter ID</th>
                      <th className="py-3 px-4">Equipment ID</th>
                      <th className="py-3 px-4">Dates</th>
                      <th className="py-3 px-4">Total Cost</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-400">
                          No bookings in system yet.
                        </td>
                      </tr>
                    ) : (
                      bookings.map((b) => (
                        <tr key={b.booking_id} className="hover:bg-zinc-50/50">
                          <td className="py-3 px-4 font-mono text-zinc-400">#{b.booking_id}</td>
                          <td className="py-3 px-4 font-mono">Farmer #{b.renter_id}</td>
                          <td className="py-3 px-4 font-mono">Equip #{b.equipment_id}</td>
                          <td className="py-3 px-4 text-zinc-600">
                            {b.start_date} → {b.end_date}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-700">
                            ₹{Number(b.total_cost).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-4">
                            <BookingStatusBadge status={b.status} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PAYMENTS */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Payment ID</th>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-400">
                          No payment records found.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.payment_id} className="hover:bg-zinc-50/50">
                          <td className="py-3 px-4 font-mono text-zinc-400">#{p.payment_id}</td>
                          <td className="py-3 px-4 font-mono">Booking #{p.booking_id}</td>
                          <td className="py-3 px-4 font-bold text-zinc-900">
                            ₹{Number(p.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-4 text-zinc-600">{p.payment_method}</td>
                          <td className="py-3 px-4">
                            <PaymentStatusBadge status={p.payment_status} />
                          </td>
                          <td className="py-3 px-4 text-zinc-400">
                            {new Date(p.transaction_time).toLocaleDateString("en-IN")}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Review ID</th>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Reviewer</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Comments</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {reviews.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-400">
                          No reviews submitted yet.
                        </td>
                      </tr>
                    ) : (
                      reviews.map((r) => (
                        <tr key={r.review_id} className="hover:bg-zinc-50/50">
                          <td className="py-3 px-4 font-mono text-zinc-400">#{r.review_id}</td>
                          <td className="py-3 px-4 font-mono">Booking #{r.booking_id}</td>
                          <td className="py-3 px-4 font-mono">User #{r.reviewer_id}</td>
                          <td className="py-3 px-4 text-amber-500 font-bold">
                            {"★".repeat(r.rating)} ({r.rating}/5)
                          </td>
                          <td className="py-3 px-4 text-zinc-700">{r.comments || "—"}</td>
                          <td className="py-3 px-4 text-zinc-400">
                            {new Date(r.created_at).toLocaleDateString("en-IN")}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
