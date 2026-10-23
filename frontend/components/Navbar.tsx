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
    "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors";
  const activeLink =
    "text-emerald-700 bg-emerald-50 font-semibold";
  const inactiveLink =
    "text-zinc-600 hover:text-emerald-700 hover:bg-zinc-50";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 group-hover:bg-emerald-700 transition-colors">
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
              <span className="font-bold text-lg tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors leading-none">
                Agri<span className="text-emerald-600">-Share</span>
              </span>
              <span className="text-[9px] uppercase font-semibold tracking-wider text-emerald-600">
                Farm Equipment Rentals
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
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
              <div className="ml-2 h-8 w-24 bg-zinc-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="ml-2 flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-semibold text-zinc-800 leading-none">
                    {user.full_name}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wide">
                    {user.role_type}
                  </span>
                </div>
                <Link
                  href={`/dashboard/${user.role_type.toLowerCase()}`}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-zinc-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs hover:shadow-sm transition-all"
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
