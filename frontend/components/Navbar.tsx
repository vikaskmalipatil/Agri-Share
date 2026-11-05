"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AppUser } from "@/lib/types";

interface NavbarProps {
  activePage?: "home" | "equipment" | "login";
}

export default function Navbar({ activePage }: NavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<Pick<
    AppUser,
    "full_name" | "role_type"
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data?.user) {
            setUser({
              full_name: data.user.full_name,
              role_type: data.user.role_type,
            });
          }
        }
      } catch {
        // DB or network offline
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setUser(null);
    router.push("/");
    router.refresh();
  }

  const linkBase =
    "px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors";
  const activeLink =
    "text-white bg-white/10 ring-1 ring-amber-400/50 font-semibold";
  const inactiveLink =
    "text-white/90 hover:text-white hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 bg-emerald-900 border-b border-emerald-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-2 py-2 sm:h-16 sm:flex-nowrap sm:py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 ring-1 ring-amber-400/40 shadow-sm shadow-black/15 group-hover:bg-white/15 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 20h10" />
                <path d="M12 20v-8" />
                <path d="M12 12a5 5 0 0 0 5-5c0-3-5-3-5-3s0 3 0 3" />
                <path d="M12 12a5 5 0 0 1-5-5c0-3 5-3 5-3s0 3 0 3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-amber-100 transition-colors leading-none">
                Agri<span className="text-crop">-Share</span>
              </span>
              <span className="hidden text-[9px] uppercase font-semibold tracking-wider text-emerald-100 sm:block">
                Farm Equipment Rentals
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end">
            <Link
              href="/"
              className={`${linkBase} ${
                activePage === "home" ? activeLink : inactiveLink
              }`}
            >
              Home
            </Link>
            <Link
              href="/equipment"
              className={`${linkBase} ${
                activePage === "equipment" ? activeLink : inactiveLink
              }`}
            >
              Equipment
            </Link>

            {/* Auth section */}
            {loading ? (
              <div className="ml-2 h-8 w-24 bg-white/15 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="ml-0 flex items-center gap-2 sm:ml-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-semibold text-white leading-none">
                    {user.full_name}
                  </span>
                  <span className="text-[10px] text-emerald-100 font-medium uppercase tracking-wide">
                    {user.role_type}
                  </span>
                </div>
                <Link
                  href={`/dashboard/${user.role_type.toLowerCase()}`}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/25 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl border border-white/25 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-0 px-3 sm:ml-2 sm:px-4 py-2 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md shadow-emerald-950/15 transition-all duration-200 active:scale-95"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
