import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TIER } from "@/lib/tier";

export const metadata = { title: "Analytics — ClientFlow" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function pct(a: number, b: number): string {
  if (b === 0) return "0%";
  return `${Math.round((a / b) * 100)}%`;
}

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const tierConfig = TIER[vendor.subscriptionTier];

  // Analytics gated to PRO+
  if (!tierConfig.analytics) {
    return (
      <div className="p-5 sm:p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">Understand your store performance.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 px-8 py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-800 mb-1">Analytics is a Pro feature</p>
          <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
            Upgrade to Pro or Business to see detailed revenue charts, top products, and customer insights.
          </p>
          <Link
            href="/dashboard/settings"
            className="inline-block bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors"
          >
            Upgrade your plan
          </Link>
        </div>
      </div>
    );
  }

  // ── Real analytics for PRO+ vendors ──────────────────────────────────────────

  const now       = new Date();
  const startOf30 = new Date(now); startOf30.setDate(now.getDate() - 29); startOf30.setHours(0, 0, 0, 0);
  const startOf7  = new Date(now); startOf7.setDate(now.getDate() - 6);   startOf7.setHours(0, 0, 0, 0);
  const startPrev = new Date(startOf30); startPrev.setDate(startPrev.getDate() - 30);

  const [
    allOrders,
    orders30d,
    ordersPrev30d,
    orders7d,
    topProducts,
    productCount,
    activeProductCount,
  ] = await Promise.all([
    prisma.order.count({ where: { vendorId: vendor.id } }),

    prisma.order.findMany({
      where: { vendorId: vendor.id, createdAt: { gte: startOf30 } },
      select: { totalAmount: true, paymentStatus: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),

    prisma.order.aggregate({
      where: { vendorId: vendor.id, paymentStatus: "PAID", createdAt: { gte: startPrev, lt: startOf30 } },
      _sum: { totalAmount: true },
    }),

    prisma.order.findMany({
      where: { vendorId: vendor.id, paymentStatus: "PAID", createdAt: { gte: startOf7 } },
      select: { totalAmount: true },
    }),

    // Top products by order count — derived from JSON items array
    // Prisma doesn't aggregate JSON, so we fetch all orders and tally server-side
    prisma.order.findMany({
      where: { vendorId: vendor.id, paymentStatus: "PAID" },
      select: { items: true },
    }),

    prisma.product.count({ where: { vendorId: vendor.id } }),
    prisma.product.count({ where: { vendorId: vendor.id, status: "ACTIVE" } }),
  ]);

  // Tally revenue metrics
  const paidOrders30d     = orders30d.filter((o) => o.paymentStatus === "PAID");
  const revenue30d        = paidOrders30d.reduce((s, o) => s + Number(o.totalAmount), 0);
  const revenue7d         = orders7d.reduce((s, o) => s + Number(o.totalAmount), 0);
  const revenuePrev30d    = Number(ordersPrev30d._sum.totalAmount ?? 0);
  const revenueGrowth     = revenuePrev30d === 0
    ? (revenue30d > 0 ? 100 : 0)
    : Math.round(((revenue30d - revenuePrev30d) / revenuePrev30d) * 100);

  const conversionRate    = orders30d.length === 0 ? 0 : Math.round((paidOrders30d.length / orders30d.length) * 100);

  // Tally product revenue from order items
  const productRevenue: Record<string, { title: string; count: number; revenue: number }> = {};
  for (const order of topProducts) {
    const items = order.items as Array<{ productId?: string; title?: string; quantity?: number; price?: number }>;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const id  = item.productId ?? "unknown";
      const key = id;
      if (!productRevenue[key]) {
        productRevenue[key] = { title: item.title ?? "Unknown product", count: 0, revenue: 0 };
      }
      productRevenue[key].count   += item.quantity ?? 1;
      productRevenue[key].revenue += (item.price ?? 0) * (item.quantity ?? 1);
    }
  }
  const sortedProducts = Object.values(productRevenue)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const maxProductRevenue = sortedProducts[0]?.revenue ?? 1;

  // Daily revenue for sparkline (last 14 days)
  const days14: { label: string; revenue: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d); next.setDate(d.getDate() + 1);
    const dayRevenue = paidOrders30d
      .filter((o) => new Date(o.createdAt) >= d && new Date(o.createdAt) < next)
      .reduce((s, o) => s + Number(o.totalAmount), 0);
    days14.push({
      label:   d.toLocaleDateString("en-NG", { weekday: "short", day: "numeric" }),
      revenue: dayRevenue,
    });
  }
  const maxDay = Math.max(...days14.map((d) => d.revenue), 1);

  return (
    <div className="p-5 sm:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Last 30 days · {vendor.businessName}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label:  "Revenue (30d)",
            value:  naira(revenue30d),
            sub:    `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth}% vs prev 30d`,
            accent: revenueGrowth >= 0 ? "text-emerald-600" : "text-red-500",
          },
          {
            label:  "Revenue (7d)",
            value:  naira(revenue7d),
            sub:    `${orders7d.length} paid order${orders7d.length !== 1 ? "s" : ""}`,
            accent: "text-blue-600",
          },
          {
            label:  "Payment rate",
            value:  `${conversionRate}%`,
            sub:    `${paidOrders30d.length} of ${orders30d.length} orders paid`,
            accent: "text-violet-600",
          },
          {
            label:  "All-time orders",
            value:  String(allOrders),
            sub:    `${activeProductCount} / ${productCount} products active`,
            accent: "text-amber-600",
          },
        ].map(({ label, value, sub, accent }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs text-slate-400 mb-3">{label}</p>
            <p className={`text-2xl font-bold ${accent}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-1.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Daily revenue chart (CSS bar chart) */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Daily revenue — last 14 days</h2>
        <p className="text-xs text-slate-400 mb-6">{naira(revenue30d)} total this month</p>

        <div className="flex items-end gap-1.5 h-24">
          {days14.map(({ label, revenue }) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full bg-slate-900 rounded-sm transition-all group-hover:bg-slate-700 relative"
                style={{ height: `${Math.round((revenue / maxDay) * 96)}px`, minHeight: revenue > 0 ? "2px" : "0px" }}
                title={`${label}: ${naira(revenue)}`}
              />
              <p className="text-slate-300 rotate-45 origin-left" style={{ fontSize: "9px", width: "20px" }}>
                {label.split(" ")[1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-5">Top products by revenue</h2>
        {sortedProducts.length === 0 ? (
          <p className="text-sm text-slate-400">No paid orders yet.</p>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map(({ title, count, revenue }) => (
              <div key={title}>
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <p className="text-sm text-slate-700 truncate flex-1">{title}</p>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-900">{naira(revenue)}</p>
                    <p className="text-xs text-slate-400">{count} sold · {pct(revenue, revenue30d)} of revenue</p>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full"
                    style={{ width: pct(revenue, maxProductRevenue) }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
