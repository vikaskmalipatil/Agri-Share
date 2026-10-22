import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100/70 bg-emerald-50/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-800">Agri-Share</span>
              <span>&bull;</span>
              <span>Farm Equipment Sharing Platform</span>
            </div>
            <nav className="hidden sm:flex items-center gap-3">
              <Link
                href="/"
                className="hover:text-emerald-700 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/equipment"
                className="hover:text-emerald-700 transition-colors"
              >
                Equipment
              </Link>
              <Link
                href="/login"
                className="hover:text-emerald-700 transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
          <p>&copy; 2026 Agri-Share. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
