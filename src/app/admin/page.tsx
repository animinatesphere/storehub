import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TIER, TIER_ORDER } from "@/lib/tier";
import { SubscriptionTier } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin overview — ClientFlow" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

const TIER_ACCENT: Record<SubscriptionTier, string> = {
  FREE:     "text-slate-300",
  STARTER:  "text-blue-300",
  PRO:      "text-violet-300",
  BUSINESS: "text-amber-300",
};

export default async function AdminOverviewPage() {
  const now      = new Date();
  const start30d = new Date(now); start30d.setDate(now.getDate() - 29); start30d.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    totalVendors,
    totalProducts,
    totalOrders,
    revenueAgg,
    revenue30dAgg,
    newUsers30d,
    newVendors30d,
    recentOrders,
    tierBreakdown,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.vendor.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ where: { paymentStatus: "PAID" }, _sum: { totalAmount: true } }),
    prisma.order.aggregate({ where: { paymentStatus: "PAID", createdAt: { gte: start30d } }, _sum: { totalAmount: true } }),
    prisma.user.count({ where: { createdAt: { gte: start30d } } }),
    prisma.vendor.count({ where: { createdAt: { gte: start30d } } }),
    prisma.order.findMany({
      where:   { paymentStatus: "PAID" },
      include: {
        customer: { select: { name: true, email: true } },
        vendor:   { select: { businessName: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
      take:    8,
    }),
    prisma.vendor.groupBy({ by: ["subscriptionTier"], _count: { id: true } }),
  ]);

  const totalRevenue = Number(revenueAgg._sum.totalAmount ?? 0);
  const revenue30d   = Number(revenue30dAgg._sum.totalAmount ?? 0);

  // Build tier count map
  const tierMap: Record<string, number> = {};
  for (const t of tierBreakdown) tierMap[t.subscriptionTier] = t._count.id;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Platform overview</h1>
        <p className="text-sm text-slate-400 mt-1">All-time stats for ClientFlow</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total GMV",           value: naira(totalRevenue), sub: `${naira(revenue30d)} last 30d`,  accent: "text-emerald-400" },
          { label: "Total orders",         value: String(totalOrders),  sub: "All time",                    accent: "text-blue-400"    },
          { label: "Registered vendors",   value: String(totalVendors), sub: `+${newVendors30d} last 30d`,  accent: "text-violet-400"  },
          { label: "Total users",          value: String(totalUsers),   sub: `+${newUsers30d} last 30d`,    accent: "text-amber-400"   },
        ].map(({ label, value, sub, accent }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-xs text-slate-500 mb-3">{label}</p>
            <p className={`text-2xl font-bold ${accent}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-1.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Plan distribution */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-5">Vendor plan distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TIER_ORDER.map((tier) => {
            const cfg   = TIER[tier];
            const count = tierMap[tier] ?? 0;
            const pct   = totalVendors === 0 ? 0 : Math.round((count / totalVendors) * 100);

            return (
              <div key={tier} className="text-center">
                <p className={`text-3xl font-bold ${TIER_ACCENT[tier]}`}>{count}</p>
                <p className="text-xs text-slate-400 mt-1">{cfg.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">{pct}% of vendors</p>
                <p className="text-xs text-slate-600">
                  {cfg.priceNGN === 0 ? "Free" : naira(cfg.priceNGN) + "/mo"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan feature matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white">Plan feature matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 w-48">Feature</th>
                {TIER_ORDER.map((tier) => (
                  <th key={tier} className="px-4 py-3 text-center">
                    <p className={`text-sm font-bold ${TIER_ACCENT[tier]}`}>{TIER[tier].label}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {TIER[tier].priceNGN === 0 ? "Free" : naira(TIER[tier].priceNGN) + "/mo"}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { label: "Products",          values: ["5", "25", "100", "Unlimited"] },
                { label: "Public storefront", values: [true, true, true, true]        },
                { label: "Paystack checkout", values: [true, true, true, true]        },
                { label: "Custom bio",        values: [false, true, true, true]       },
                { label: "Brand colour",      values: [false, true, true, true]       },
                { label: "Logo upload",       values: [false, true, true, true]       },
                { label: "Social links",      values: [false, true, true, true]       },
                { label: "Analytics",         values: [false, false, true, true]      },
                { label: "Revenue charts",    values: [false, false, true, true]      },
                { label: "Priority support",  values: [false, false, true, true]      },
                { label: "Subaccount payouts",values: [false, false, false, true]     },
                { label: "Unlimited products",values: [false, false, false, true]     },
                { label: "Custom domain",     values: ["—", "—", "—", "Soon"]         },
              ].map(({ label, values }) => (
                <tr key={label} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3 text-xs text-slate-400">{label}</td>
                  {values.map((val, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {val === true  ? <span className="text-emerald-400 text-base">✓</span>
                     : val === false ? <span className="text-slate-700 text-base">—</span>
                     : <span className="text-xs text-slate-300">{val}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick admin links */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { href: "/admin/vendors", label: "Manage vendors", count: totalVendors },
          { href: "/admin/users",   label: "Manage users",   count: totalUsers   },
          { href: "/admin/orders",  label: "All orders",     count: totalOrders  },
        ].map(({ href, label, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-colors"
          >
            <p className="text-xl font-bold text-white">{count.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">{label} →</p>
          </Link>
        ))}
      </div>

      {/* Recent paid orders */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent paid orders</h2>
          <Link href="/admin/orders" className="text-xs text-slate-400 hover:text-white transition-colors">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-slate-800/60">
          {recentOrders.map((order) => (
            <div key={order.id} className="px-6 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                  {order.customer.name ?? order.customer.email ?? "Customer"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  {order.vendor.businessName}
                </p>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <p className="text-sm font-semibold text-emerald-400 tabular-nums shrink-0">
                {naira(Number(order.totalAmount))}
              </p>
            </div>
          ))}
          {recentOrders.length === 0 && (
            <p className="px-6 py-8 text-sm text-slate-500 text-center">No paid orders yet.</p>
          )}
        </div>
      </div>

      {/* Products stat */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs text-slate-500 mb-2">Total products listed</p>
        <p className="text-3xl font-bold text-white">{totalProducts.toLocaleString()}</p>
      </div>
    </div>
  );
}
