import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col font-sans">
      <Navbar activePage="home" />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white py-16 sm:py-24">
          {/* Decorative background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
            <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute top-32 left-10 w-80 h-80 rounded-full bg-emerald-100/50 blur-2xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Empowering Local Agriculture
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight sm:leading-tight">
              Rent Farm Equipment{" "}
              <span className="text-emerald-600 underline decoration-emerald-200 decoration-wavy underline-offset-8">
                Easily
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Find reliable tractors, harvesters, tillers, and specialized farm
              tools right in your community. Lower your operating costs and get
              the job done on time.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/equipment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg shadow-emerald-700/20 hover:-translate-y-0.5 transition-all"
              >
                <span>Browse Equipment</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-emerald-700 bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-xl hover:-translate-y-0.5 transition-all"
              >
                Create Account
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="mt-14 pt-10 border-t border-emerald-100/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  ),
                  title: "Verified Owners",
                  desc: "Rent machinery directly from trusted local farmers.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  ),
                  title: "Flexible Daily Rates",
                  desc: "Pay only for the exact days you need during peak seasons.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  ),
                  title: "Fast Booking",
                  desc: "Simple request workflow so you can stay focused on the field.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-emerald-100/80 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category showcase — categories shown here are illustrative UI structure;
            actual categories come from the database on the /equipment page. */}
        <section className="py-14 bg-white border-t border-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-zinc-900">
                Popular Farm Machinery
              </h2>
              <p className="text-sm text-zinc-500 mt-2">
                Explore farming equipment categories available for hire
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Tractors & Tillers",
                  desc: "Compact to high-horsepower tractors for plowing and hauling.",
                  tag: "High Demand",
                },
                {
                  title: "Harvesters & Combines",
                  desc: "Efficient grain and crop harvesting machinery.",
                  tag: "Seasonal",
                },
                {
                  title: "Seeders & Planters",
                  desc: "Precision seeding and drilling equipment for optimal yield.",
                  tag: "Ready",
                },
                {
                  title: "Irrigation & Sprayers",
                  desc: "Water pumps, boom sprayers, and crop protection units.",
                  tag: "Available",
                },
              ].map((category) => (
                <Link
                  href="/equipment"
                  key={category.title}
                  className="group p-5 rounded-2xl border border-zinc-100 bg-white hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-900/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        {category.tag}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {category.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-50 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>View Category</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
