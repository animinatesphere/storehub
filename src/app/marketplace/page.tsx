import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { VendorCategory } from "@/generated/prisma/client";

export const metadata = {
  title: "Marketplace — ClientFlow",
  description: "Browse products from thousands of Nigerian sellers on ClientFlow.",
};

const CATEGORY_LABEL: Record<VendorCategory, string> = {
  PHYSICAL_GOODS:    "Physical goods",
  DIGITAL_PRODUCTS:  "Digital products",
  REAL_ESTATE:       "Real estate",
  SERVICES:          "Services",
  AUTHORS_CREATORS:  "Authors & creators",
  PORTFOLIO_GENERAL: "Portfolio",
};

const CATEGORY_COLOR: Record<VendorCategory, string> = {
  PHYSICAL_GOODS:    "bg-slate-200",
  DIGITAL_PRODUCTS:  "bg-blue-200",
  REAL_ESTATE:       "bg-amber-200",
  SERVICES:          "bg-violet-200",
  AUTHORS_CREATORS:  "bg-rose-200",
  PORTFOLIO_GENERAL: "bg-emerald-200",
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const categoryFilter = Object.keys(CATEGORY_LABEL).includes(category ?? "")
    ? (category as VendorCategory)
    : undefined;

  // Fetch active products with vendor info
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(categoryFilter ? { vendor: { category: categoryFilter } } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      vendor: {
        select: {
          businessName: true,
          username: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  // Fetch vendor count for the header stat
  const vendorCount = await prisma.vendor.count();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="text-base font-bold text-slate-900 shrink-0">
            ClientFlow
          </Link>

          {/* Search */}
          <form method="GET" action="/marketplace" className="flex-1 max-w-lg">
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search products..."
                className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </form>

          <Link
            href="/account"
            className="shrink-0 text-sm text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
          >
            My account
          </Link>
          <Link
            href="/signup?role=vendor"
            className="shrink-0 text-sm bg-slate-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-slate-700 transition-colors"
          >
            Start selling
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">

        {/* Hero strip */}
        {!q && !categoryFilter && (
          <div className="mb-8 bg-slate-900 rounded-2xl px-8 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">ClientFlow Marketplace</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Shop from {vendorCount.toLocaleString()}+ Nigerian sellers
              </h1>
              <p className="text-white/60 text-sm mt-2">
                Pay securely with Paystack. Every seller is verified.
              </p>
            </div>
            <Link
              href="/signup?role=vendor"
              className="shrink-0 bg-white text-slate-900 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Open your own store
            </Link>
          </div>
        )}

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <Link
            href="/marketplace"
            className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
              !categoryFilter
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            All
          </Link>
          {(Object.keys(CATEGORY_LABEL) as VendorCategory[]).map((cat) => (
            <Link
              key={cat}
              href={`/marketplace?category=${cat}`}
              className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {CATEGORY_LABEL[cat]}
            </Link>
          ))}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-500">
            {q && (
              <span>
                Results for <strong className="text-slate-900">&ldquo;{q}&rdquo;</strong> —{" "}
              </span>
            )}
            {products.length} product{products.length !== 1 ? "s" : ""}
            {categoryFilter && (
              <span> in <strong className="text-slate-900">{CATEGORY_LABEL[categoryFilter]}</strong></span>
            )}
          </p>
          {(q || categoryFilter) && (
            <Link href="/marketplace" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Clear filters
            </Link>
          )}
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 px-8 py-24 text-center">
            <p className="text-slate-500 font-medium text-sm">No products found</p>
            <p className="text-slate-400 text-xs mt-1">Try a different search or browse all categories.</p>
            <Link href="/marketplace" className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-2">
              Browse all
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.vendor.username}`}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-sm transition-all group"
              >
                {/* Product image */}
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-xl ${CATEGORY_COLOR[product.vendor.category]}`} />
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="p-3.5">
                  <p className="text-xs text-slate-400 truncate mb-1">{product.vendor.businessName}</p>
                  <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 mb-2">
                    {product.title}
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {naira(Number(product.price))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16 py-8 px-5 text-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} ClientFlow ·{" "}
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          {" · "}
          <Link href="/signup?role=vendor" className="hover:text-slate-600 transition-colors">Start selling</Link>
        </p>
      </footer>
    </div>
  );
}
