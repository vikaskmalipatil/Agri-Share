"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { UserRole } from "@/lib/types";

const ALLOWED_ROLES: UserRole[] = ["FARMER", "OWNER", "DRIVER"];

const DASHBOARD_MAP: Record<UserRole, string> = {
  FARMER: "/dashboard/farmer",
  OWNER: "/dashboard/owner",
  DRIVER: "/dashboard/driver",
  ADMIN: "/dashboard/admin",
};

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    role_type: "FARMER" as UserRole,
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!ALLOWED_ROLES.includes(form.role_type)) {
      setError("Invalid role selected.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          phone: form.phone || null,
          address: form.address || null,
          role_type: form.role_type,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      setSuccess(true);
      router.push(DASHBOARD_MAP[form.role_type]);
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

  if (success && !error) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md text-center bg-white rounded-2xl border border-emerald-100 shadow-sm p-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-zinc-900">Account Created!</h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Please check your email to confirm your account, then{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-700 hover:underline"
              >
                sign in
              </Link>
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-emerald-50/40 to-stone-50">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-zinc-900">
                Create your account
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Join Agri-Share as a Farmer, Equipment Owner, or Driver
              </p>
            </div>

            {error && (
              <div className="mb-5 flex gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <svg
                  className="w-4 h-4 shrink-0 mt-0.5"
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
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className={labelClass}>
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.full_name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Ravi Kumar"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className={labelClass}>
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  value={form.address}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Village, Taluk, District, State"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role_type" className={labelClass}>
                  I am a <span className="text-red-500">*</span>
                </label>
                <select
                  id="role_type"
                  name="role_type"
                  required
                  value={form.role_type}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="FARMER">Farmer – I want to rent equipment</option>
                  <option value="OWNER">
                    Equipment Owner – I want to list my machinery
                  </option>
                  <option value="DRIVER">
                    Driver – I operate farm equipment
                  </option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Min. 8 characters"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm_password" className={labelClass}>
                  Confirm password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95 mt-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
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
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
