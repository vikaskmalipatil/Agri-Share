"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/StatusBadge";
import type { AppUser, Booking, Payment } from "@/lib/types";

export default function FarmerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [bookings, setBookings] = useState<(Booking & { equipment: { model_name: string } | null })[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) { router.replace("/login"); return; }
        const userData = await userRes.json();
        if (!userData?.user) { router.replace("/login"); return; }

        const profile = userData.user as AppUser;
        if (cancelled) return;
        if (profile.role_type !== "FARMER") {
          router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
          return;
        }

        setUser(profile);

        // Load farmer's bookings from MySQL
        const bkRes = await fetch("/api/bookings?role=farmer");
        if (bkRes.ok) {
          const bkData = await bkRes.json();
          if (!cancelled) setBookings(bkData.bookings || []);
        }

        // Load payments
        const payRes = await fetch("/api/payments");
        if (payRes.ok) {
          const payData = await payRes.json();
          if (!cancelled) setPayments(payData.payments || []);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [router]);

  if (isLoading) return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </main>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 underline">Go to Login</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  const upcoming = bookings.filter(b => ["PENDING","CONFIRMED"].includes(b.status));
  const past = bookings.filter(b => ["COMPLETED","CANCELLED"].includes(b.status));

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 py-10 bg-gradient-to-b from-emerald-50/40 to-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-emerald-100">
            <h1 className="text-3xl font-extrabold text-zinc-900">
              Welcome, {user?.full_name?.split(" ")[0]} 👋
            </h1>
            <p className="text-zinc-600 mt-1 text-sm">Farmer Dashboard — manage your rentals and bookings.</p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <Link href="/equipment" className="p-5 rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95">
              <p className="font-bold text-lg">Browse Equipment</p>
              <p className="text-sm text-emerald-100 mt-0.5">Find available machinery to rent</p>
            </Link>
            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <p className="text-2xl font-extrabold text-harvest">{upcoming.length}</p>
              <p className="text-sm text-harvest mt-0.5">Active / Upcoming Bookings</p>
            </div>
            <div className="p-5 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
              <p className="text-2xl font-extrabold text-harvest">{past.length}</p>
              <p className="text-sm text-harvest mt-0.5">Past Bookings</p>
            </div>
          </div>

          {/* Upcoming bookings */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Active & Upcoming Bookings</h2>
            {upcoming.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/30">
                <p className="text-zinc-500 text-sm">No active bookings. <Link href="/equipment" className="text-emerald-700 font-medium hover:underline">Browse equipment →</Link></p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map(b => (
                  <div key={b.booking_id} className="p-5 rounded-xl border border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">{b.equipment?.model_name ?? `Equipment #${b.equipment_id}`}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{b.start_date} → {b.end_date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookingStatusBadge status={b.status} />
                      <span className="text-sm font-bold text-emerald-700">₹{Number(b.total_cost).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past bookings */}
          {past.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Past Bookings</h2>
              <div className="space-y-3">
                {past.map(b => (
                  <div key={b.booking_id} className="p-5 rounded-xl border border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-700">{b.equipment?.model_name ?? `Equipment #${b.equipment_id}`}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{b.start_date} → {b.end_date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookingStatusBadge status={b.status} />
                      <span className="text-sm font-semibold text-zinc-600">₹{Number(b.total_cost).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Payment history */}
          {payments.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Payment History</h2>
              <div className="space-y-3">
                {payments.map(p => (
                  <div key={p.payment_id} className="p-5 rounded-xl border border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">Booking #{p.booking_id}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{p.payment_method} · {new Date(p.transaction_time).toLocaleDateString("en-IN")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <PaymentStatusBadge status={p.payment_status} />
                      <span className="text-sm font-bold text-zinc-800">₹{Number(p.amount).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
