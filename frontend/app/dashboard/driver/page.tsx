"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingStatusBadge } from "@/components/StatusBadge";
import type { AppUser, Booking, EquipmentDriver } from "@/lib/types";

export default function DriverDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [eligibleEquipment, setEligibleEquipment] = useState<
    (EquipmentDriver & {
      equipment: { model_name: string; daily_rate: number } | null;
    })[]
  >([]);
  const [assignedBookings, setAssignedBookings] = useState<
    (Booking & {
      equipment: { model_name: string } | null;
      users: { full_name: string; phone: string | null } | null;
    })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) {
          router.replace("/login");
          return;
        }
        const userData = await userRes.json();
        if (!userData?.user) {
          router.replace("/login");
          return;
        }

        const profile = userData.user as AppUser;
        if (cancelled) return;

        if (profile.role_type !== "DRIVER") {
          router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
          return;
        }

        setUser(profile);

        // Fetch eligible equipment
        const eqRes = await fetch("/api/drivers/equipment");
        if (eqRes.ok) {
          const eqJson = await eqRes.json();
          if (!cancelled) setEligibleEquipment(eqJson.eligibleEquipment || []);
        }

        // Fetch bookings where this driver is assigned
        const bkRes = await fetch("/api/bookings?role=driver");
        if (bkRes.ok) {
          const bkJson = await bkRes.json();
          if (!cancelled) setAssignedBookings(bkJson.bookings || []);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load driver dashboard");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    initialLoad();

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
          <div className="text-center max-w-md">
            <p className="text-red-600 font-medium">{error}</p>
            <Link
              href="/login"
              className="mt-4 inline-block text-sm text-emerald-700 underline"
            >
              Back to Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 mb-2">
                Certified Operator
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Welcome, {user?.full_name}
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Manage your machinery certifications and review your field duty assignments.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right p-4 rounded-2xl bg-pasture border border-emerald-800/10 shadow-sm">
                <span className="text-xs text-harvest font-semibold block">Active Bookings</span>
                <span className="text-2xl font-bold text-harvest">
                  {assignedBookings.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Machinery Certifications Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center justify-between">
                <span>Eligible Machinery</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                  {eligibleEquipment.length} Qualified
                </span>
              </h2>

              {eligibleEquipment.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">
                  No machinery qualifications registered yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {eligibleEquipment.map((eq) => (
                    <div
                      key={eq.equipment_id}
                      className="p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-emerald-200 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-zinc-800">
                            {eq.equipment?.model_name || `Equipment #${eq.equipment_id}`}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Certified: {eq.cert_date ? new Date(eq.cert_date).toLocaleDateString() : "Active"}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                          ₹{eq.driver_hr_rate}/hr
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assigned Bookings Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center justify-between">
                <span>Field Operation Assignments</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                  {assignedBookings.length} Total
                </span>
              </h2>

              {assignedBookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-zinc-100 rounded-xl">
                  <p className="text-sm text-zinc-500">
                    No field assignments currently booked for you.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {assignedBookings.map((b) => (
                    <div key={b.booking_id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-600 mr-2">
                            #{b.booking_id}
                          </span>
                          <span className="font-bold text-zinc-900 text-base">
                            {b.equipment?.model_name || `Equipment #${b.equipment_id}`}
                          </span>
                        </div>
                        <BookingStatusBadge status={b.status} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <div>
                          <span className="text-zinc-400 block">Renter / Farmer:</span>
                          <span className="font-semibold text-zinc-800">
                            {b.users?.full_name || "Anonymous Farmer"}
                          </span>
                          {b.users?.phone && (
                            <span className="text-zinc-500 block">
                              📞 {b.users.phone}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-zinc-400 block">Rental Window:</span>
                          <span className="font-semibold text-zinc-800">
                            {b.start_date} to {b.end_date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
