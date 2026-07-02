import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SubscriptionTier, VendorStatus } from "@/generated/prisma/client";
import { TIER, TIER_ORDER } from "@/lib/tier";
import {
  adminSetVendorTier,
  adminSetVendorStatus,
  adminVerifyVendor,
} from "@/app/actions/admin";

export const metadata = { title: "Vendors — Admin" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

const TIER_COLOR: Record<SubscriptionTier, string> = {
  FREE:     "text-slate-400 bg-slate-800",
  STARTER:  "text-blue-300 bg-blue-900/40",
  PRO:      "text-violet-300 bg-violet-900/40",
  BUSINESS: "text-amber-300 bg-amber-900/40",
};

const STATUS_COLOR: Record<VendorStatus, string> = {
  ACTIVE:    "text-emerald-300 bg-emerald-900/40",
  SUSPENDED: "text-amber-300 bg-amber-900/40",
  BANNED:    "text-red-300 bg-red-900/40",
};

export default async function AdminVendorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; open?: string }>;
}) {
  const { q, open } = await searchParams;

  const vendors = await prisma.vendor.findMany({
    where: q
      ? { OR: [
          { businessName: { contains: q, mode: "insensitive" } },
          { username:     { contains: q, mode: "insensitive" } },
        ]}
      : undefined,
    include: {
      user:   { select: { email: true, createdAt: true } },
      _count: { select: { products: true, orders: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Vendors</h1>
          <p className="text-sm text-slate-400 mt-1">{vendors.length} result{vendors.length !== 1 ? "s" : ""}</p>
        </div>
        <form method="GET" action="/admin/vendors">
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search vendors…"
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 w-56"
          />
        </form>
      </div>

      <div className="space-y-3">
        {vendors.map((vendor) => {
          const isOpen   = open === vendor.id;
          const cfg      = TIER[vendor.subscriptionTier];
          const qs       = q ? `&q=${encodeURIComponent(q)}` : "";
          const openHref = isOpen ? `/admin/vendors?${qs}` : `/admin/vendors?open=${vendor.id}${qs}`;

          return (
            <div key={vendor.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

              {/* Row */}
              <div className="px-5 py-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {vendor.businessName[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-white">{vendor.businessName}</p>
                    {vendor.isVerified && (
                      <span className="text-xs text-sky-300 bg-sky-900/40 px-2 py-0.5 rounded-md">Verified</span>
                    )}
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${TIER_COLOR[vendor.subscriptionTier]}`}>
                      {vendor.subscriptionTier}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${STATUS_COLOR[vendor.status]}`}>
                      {vendor.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    @{vendor.username} · {vendor.user.email}
                  </p>
                </div>

                <div className="hidden sm:flex gap-5 text-center shrink-0">
                  <div>
                    <p className="text-sm font-semibold text-white">{vendor._count.products}</p>
                    <p className="text-xs text-slate-500">products</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{vendor._count.orders}</p>
                    <p className="text-xs text-slate-500">orders</p>
                  </div>
                </div>

                <a
                  href={openHref}
                  className="shrink-0 text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {isOpen ? "Close" : "Manage"}
                </a>
              </div>

              {/* Expanded panel */}
              {isOpen && (
                <div className="border-t border-slate-800 p-5 space-y-6">

                  {/* Status controls */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Account status</p>
                    <div className="flex flex-wrap gap-2">
                      {(["ACTIVE", "SUSPENDED", "BANNED"] as VendorStatus[]).map((s) => {
                        const action = adminSetVendorStatus.bind(null, vendor.id, s);
                        return (
                          <form key={s} action={action}>
                            <button
                              type="submit"
                              disabled={vendor.status === s}
                              className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-default ${
                                s === "ACTIVE"    ? "bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900" :
                                s === "SUSPENDED" ? "bg-amber-900/50 text-amber-300 hover:bg-amber-900"   :
                                                    "bg-red-900/50 text-red-300 hover:bg-red-900"
                              }`}
                            >
                              {s === "ACTIVE" ? "Set active" : s === "SUSPENDED" ? "Suspend" : "Ban"}
                            </button>
                          </form>
                        );
                      })}

                      <form action={adminVerifyVendor.bind(null, vendor.id, !vendor.isVerified)}>
                        <button
                          type="submit"
                          className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${
                            vendor.isVerified
                              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              : "bg-sky-900/50 text-sky-300 hover:bg-sky-900"
                          }`}
                        >
                          {vendor.isVerified ? "Remove verified" : "Mark verified"}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Plan controls */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Change plan — instant, no payment
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIER_ORDER.map((tier) => {
                        const tcfg      = TIER[tier];
                        const isCurrent = tier === vendor.subscriptionTier;
                        const action    = adminSetVendorTier.bind(null, vendor.id, tier as SubscriptionTier);
                        return (
                          <form key={tier} action={action}>
                            <button
                              type="submit"
                              disabled={isCurrent}
                              className={`w-full text-left rounded-xl p-4 transition-colors disabled:cursor-default ${
                                isCurrent ? "bg-white text-slate-900" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                              }`}
                            >
                              <p className="text-sm font-bold">{tcfg.label}</p>
                              <p className="text-xs mt-0.5 opacity-60">
                                {tcfg.priceNGN === 0 ? "Free" : naira(tcfg.priceNGN) + "/mo"}
                              </p>
                              <p className="text-xs mt-1.5 opacity-50">
                                {tcfg.maxProducts === -1 ? "∞" : tcfg.maxProducts} products
                              </p>
                              {tcfg.features.slice(0, 2).map((f) => (
                                <p key={f} className="text-xs opacity-40 mt-0.5">✓ {f}</p>
                              ))}
                              {isCurrent && <p className="text-xs font-semibold text-slate-500 mt-2">Current</p>}
                            </button>
                          </form>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-800 text-xs text-slate-500">
                    <Link href={`/shop/${vendor.username}`} target="_blank" className="hover:text-white transition-colors">
                      View storefront →
                    </Link>
                    <span>Joined {new Date(vendor.user.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {vendors.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl px-8 py-16 text-center">
            <p className="text-sm text-slate-500">No vendors found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
