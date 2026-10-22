"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
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
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/login");
          return;
        }

        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("email", session.user.email!)
          .single();

        if (cancelled) return;

        if (!profile) {
          setError("Profile not found. Please log in again.");
          setIsLoading(false);
          return;
        }

        if (profile.role_type !== "DRIVER") {
          router.replace(`/dashboard/${profile.role_type.toLowerCase()}`);
          return;
        }

        setUser(profile as AppUser);

        // Fetch eligible equipment from equipment_drivers
        const { data: edData } = await supabase
          .from("equipment_drivers")
          .select("*, equipment:equipment_id(model_name, daily_rate)")
          .eq("driver_id", profile.user_id);

        if (cancelled) return;
        setEligibleEquipment(
          (edData as (EquipmentDriver & {
            equipment: { model_name: string; daily_rate: number } | null;
          })[]) || []
        );

        // Fetch bookings where this driver is assigned
        const { data: bkData } = await supabase
          .from("bookings")
          .select("*, equipment(model_name), users:renter_id(full_name, phone)")
          .eq("driver_id", profile.user_id)
          .order("start_date", { ascending: false });

        if (cancelled) return;
        setAssignedBookings(
          (bkData as (Booking & {
            equipment: { model_name: string } | null;
            users: { full_name: string; phone: string | null } | null;
          })[]) || []
        );
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
            <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 underline">
              Return to Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10 bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-6 mb-8 border-b border-emerald-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-2 border border-emerald-200">
              Machinery Operator Portal
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900">
              Welcome, {user?.full_name}
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              View your certified machinery, operational assignments, and hourly rates.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                Certified Machinery Types
              </p>
              <p className="text-2xl font-extrabold text-zinc-900">{eligibleEquipment.length}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                Total Assignments
              </p>
              <p className="text-2xl font-extrabold text-emerald-700">{assignedBookings.length}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                Active Trips / Jobs
              </p>
              <p className="text-2xl font-extrabold text-amber-600">
                {
                  assignedBookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED")
                    .length
                }
              </p>
            </div>
          </div>

          {/* Section 1: Assigned Bookings */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Driving & Field Assignments</h2>
            {assignedBookings.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/20 p-8">
                <p className="text-zinc-600 text-sm font-medium">No current equipment booking assignments.</p>
                <p className="text-zinc-400 text-xs mt-1">
                  When a farmer rents certified machinery and selects driver assistance, the dispatch will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {assignedBookings.map((b) => (
                  <div
                    key={b.booking_id}
                    className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-zinc-900">
                          {b.equipment?.model_name ?? `Equipment #${b.equipment_id}`}
                        </span>
                        <BookingStatusBadge status={b.status} />
                      </div>
                      <p className="text-xs text-zinc-500">
                        Farmer: {b.users?.full_name} {b.users?.phone && `(${b.users.phone})`}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Dates: {b.start_date} to {b.end_date}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-zinc-400 block uppercase font-semibold">Booking ID</span>
                      <span className="text-sm font-mono text-zinc-600">#{b.booking_id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 2: Certified Equipment & Rates */}
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Certified Machinery & Rate Card</h2>
            {eligibleEquipment.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/20 p-8">
                <p className="text-zinc-600 text-sm font-medium">No certified machinery linked to your profile yet.</p>
                <p className="text-zinc-400 text-xs mt-1">
                  Equipment owners link certified drivers using the equipment drivers register.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eligibleEquipment.map((ed) => (
                  <div
                    key={ed.equipment_id}
                    className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono text-zinc-400">Equipment #{ed.equipment_id}</span>
                      <h3 className="font-bold text-zinc-900 text-base">
                        {ed.equipment?.model_name ?? "Farm Machinery"}
                      </h3>
                      {ed.cert_date && (
                        <p className="text-xs text-zinc-500 mt-1">
                          Certified on: {new Date(ed.cert_date).toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] uppercase text-zinc-400 font-semibold block">Driver Rate</span>
                      <span className="text-lg font-extrabold text-emerald-700">
                        ₹{Number(ed.driver_hr_rate).toLocaleString("en-IN")} / hr
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
