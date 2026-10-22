"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EquipmentStatusBadge } from "@/components/StatusBadge";
import type { Equipment } from "@/lib/types";

// Extended type to include the joined equipment_types
type EquipmentWithType = Omit<Equipment, "equipment_types"> & {
  equipment_types?:
    | { category_name: string }
    | { category_name: string }[]
    | null;
};

export default function EquipmentPage() {
  const [allEquipment, setAllEquipment] = useState<EquipmentWithType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categories = useMemo(() => {
    return [
      ...new Set(
        allEquipment
          .map((e) =>
            Array.isArray(e.equipment_types)
              ? e.equipment_types[0]?.category_name
              : e.equipment_types?.category_name
          )
          .filter(Boolean) as string[]
      ),
    ].sort();
  }, [allEquipment]);

  const filtered = useMemo(() => {
    let result = [...allEquipment];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((e) => e.model_name.toLowerCase().includes(q));
    }

    if (selectedCategory !== "ALL") {
      result = result.filter((e) => {
        const cat = Array.isArray(e.equipment_types)
          ? e.equipment_types[0]?.category_name
          : e.equipment_types?.category_name;
        return cat === selectedCategory;
      });
    }

    if (maxPrice !== "") {
      result = result.filter((e) => Number(e.daily_rate) <= Number(maxPrice));
    }

    result.sort((a, b) =>
      sortOrder === "asc"
        ? Number(a.daily_rate) - Number(b.daily_rate)
        : Number(b.daily_rate) - Number(a.daily_rate)
    );

    return result;
  }, [search, selectedCategory, maxPrice, sortOrder, allEquipment]);

  const fetchEquipment = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase
        .from("equipment")
        .select(
          "equipment_id, model_name, daily_rate, status, owner_id, type_id, equipment_types(category_name)"
        )
        .eq("status", "AVAILABLE");

      if (error) throw new Error(error.message);
      setAllEquipment((data as unknown as EquipmentWithType[]) || []);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to load equipment list."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function initialLoad() {
      try {
        const { data, error } = await supabase
          .from("equipment")
          .select(
            "equipment_id, model_name, daily_rate, status, owner_id, type_id, equipment_types(category_name)"
          )
          .eq("status", "AVAILABLE");

        if (isCancelled) return;
        if (error) throw new Error(error.message);

        setAllEquipment((data as unknown as EquipmentWithType[]) || []);
      } catch (err: unknown) {
        if (!isCancelled) {
          setErrorMessage(
            err instanceof Error ? err.message : "Failed to load equipment list."
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    initialLoad();

    return () => {
      isCancelled = true;
    };
  }, []);

  function resetFilters() {
    setSearch("");
    setSelectedCategory("ALL");
    setMaxPrice("");
    setSortOrder("asc");
  }

  const formatPrice = (price: number | string) => {
    const num = typeof price === "number" ? price : parseFloat(String(price));
    if (isNaN(num)) return `₹${price}`;
    return `₹${num.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const hasFilters =
    search !== "" ||
    selectedCategory !== "ALL" ||
    maxPrice !== "" ||
    sortOrder !== "asc";

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col font-sans">
      <Navbar activePage="equipment" />

      <main className="flex-1 py-10 sm:py-14 bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 pb-6 border-b border-emerald-100/80">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Live Catalog
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                  Available Farm Equipment
                </h1>
                <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl">
                  Browse verified machinery ready for rental from local farmers.
                </p>
              </div>

              {!isLoading && !errorMessage && (
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-medium text-zinc-500 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg">
                    {filtered.length} of {allEquipment.length} items
                  </span>
                  <button
                    type="button"
                    onClick={fetchEquipment}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200/80 transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Refresh
                  </button>
                </div>
              )}
            </div>

            {/* Filters */}
            {!isLoading && !errorMessage && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3 flex-wrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search by model name…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Category filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-w-[160px]"
                >
                  <option value="ALL">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* Max price */}
                <input
                  type="number"
                  placeholder="Max price/day (₹)"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  min={0}
                  className="px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44"
                />

                {/* Sort */}
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "asc" | "desc")
                  }
                  className="px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>

                {/* Reset */}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="py-6">
              <div className="flex items-center justify-center gap-2 mb-8 text-emerald-700 text-sm font-medium">
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading available equipment…</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-zinc-100 bg-white animate-pulse flex flex-col gap-3"
                  >
                    <div className="flex justify-between">
                      <div className="h-6 w-24 bg-zinc-200 rounded-full" />
                      <div className="h-4 w-16 bg-zinc-100 rounded" />
                    </div>
                    <div className="h-6 w-3/4 bg-zinc-200 rounded" />
                    <div className="h-4 w-1/2 bg-zinc-100 rounded" />
                    <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between">
                      <div className="h-6 w-24 bg-zinc-200 rounded" />
                      <div className="h-8 w-20 bg-zinc-100 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {!isLoading && errorMessage && (
            <div className="max-w-lg mx-auto my-12 p-8 rounded-2xl bg-white border border-red-200 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 8.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-1">
                Unable to Load Equipment
              </h3>
              <p className="text-sm text-zinc-600 mb-6">{errorMessage}</p>
              <button
                type="button"
                onClick={fetchEquipment}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !errorMessage && filtered.length === 0 && (
            <div className="max-w-md mx-auto my-16 p-10 rounded-3xl bg-white border border-emerald-100/90 shadow-xs text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17h18" />
                  <circle cx="7" cy="17" r="3" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M7 14h4l3-6h4v6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">
                {hasFilters
                  ? "No equipment matches your filters"
                  : "No Equipment Available"}
              </h3>
              <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed">
                {hasFilters
                  ? "Try adjusting your search criteria or resetting the filters."
                  : "There is currently no AVAILABLE equipment in the catalog. Please check back soon."}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={fetchEquipment}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
                >
                  Refresh Catalog
                </button>
              </div>
            </div>
          )}

          {/* Equipment Grid */}
          {!isLoading && !errorMessage && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Link
                  key={item.equipment_id}
                  href={`/equipment/${item.equipment_id}`}
                  className="group block rounded-2xl border border-zinc-200/80 bg-white hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <EquipmentStatusBadge status={item.status} pulse />
                      <span className="text-[11px] font-mono text-zinc-400">
                        #{item.equipment_id}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {item.model_name}
                    </h2>

                    {(() => {
                      const cat = Array.isArray(item.equipment_types)
                        ? item.equipment_types[0]?.category_name
                        : item.equipment_types?.category_name;
                      return cat ? (
                        <p className="text-xs text-emerald-700 font-medium mt-1">
                          {cat}
                        </p>
                      ) : null;
                    })()}

                    <p className="text-xs text-zinc-500 mt-1">
                      Verified farm machinery · ready for deployment
                    </p>
                  </div>

                  <div className="p-6 pt-4 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                        Daily Rate
                      </span>
                      <div className="text-lg font-extrabold text-emerald-700">
                        {formatPrice(item.daily_rate)}
                        <span className="text-xs font-medium text-zinc-500">
                          {" "}
                          / day
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-emerald-800 bg-white border border-emerald-200 px-3.5 py-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                      View Details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
