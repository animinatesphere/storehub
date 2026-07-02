import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reports — Admin" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

export default async function AdminReportsPage() {
  const now      = new Date();
  const start30d = new Date(now); start30d.setDate(now.getDate() - 29); start30d.setHours(0, 0, 0, 0);
  const start7d  = new Date(now); start7d.setDate(now.getDate() - 6);   start7d.setHours(0, 0, 0, 0);

  const [
    gmvAll, gmv30d, gmv7d,
    ordersAll, orders30d, orders7d,
    vendorsAll, vendors30d,
    usersAll, users30d,
    productsAll, productsActive,
    topVendors,
  ] = await Promise.all([
    prisma.order.aggregate({ where: { paymentStatus: "PAID" }, _sum: { totalAmount: true } }).catch(() => ({ _sum: { totalAmount: null } })),
    prisma.order.aggregate({ where: { paymentStatus: "PAID", createdAt: { gte: start30d } }, _sum: { totalAmount: true } }).catch(() => ({ _sum: { totalAmount: null } })),
    prisma.order.aggregate({ where: { paymentStatus: "PAID", createdAt: { gte: start7d  } }, _sum: { totalAmount: true } }).catch(() => ({ _sum: { totalAmount: null } })),
    prisma.order.count().catch(() => 0),
    prisma.order.count({ where: { createdAt: { gte: start30d } } }).catch(() => 0),
    prisma.order.count({ where: { createdAt: { gte: start7d  } } }).catch(() => 0),
    prisma.vendor.count().catch(() => 0),
    prisma.vendor.count({ where: { createdAt: { gte: start30d } } }).catch(() => 0),
    prisma.user.count().catch(() => 0),
    prisma.user.count({ where: { createdAt: { gte: start30d } } }).catch(() => 0),
    prisma.product.count().catch(() => 0),
    prisma.product.count({ where: { status: "ACTIVE" } }).catch(() => 0),
    prisma.order.groupBy({
      by: ["vendorId"],
      where: { paymentStatus: "PAID" },
      _sum: { totalAmount: true },
      _count: { id: true },
      orderBy: { _sum: { totalAmount: "desc" } },
      take: 10,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).catch(() => [] as any[]),
  ]);

  // Fetch vendor names for top vendors
  const vendorIds = topVendors.map((v) => v.vendorId);
  const vendorNames = vendorIds.length
    ? await prisma.vendor.findMany({
        where:  { id: { in: vendorIds } },
        select: { id: true, businessName: true, username: true },
      }).catch(() => [])
    : [];
  const vendorMap: Record<string, { businessName: string; username: string }> = {};
  for (const v of vendorNames) vendorMap[v.id] = v;

  const maxVendorRevenue = Number(topVendors[0]?._sum.totalAmount ?? 1);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Platform performance snapshot</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/api/admin/reports/orders"
            target="_blank"
            className="text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors"
          >
            Export orders CSV
          </Link>
          <Link
            href="/api/admin/reports/vendors"
            target="_blank"
            className="text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors"
          >
            Export vendors CSV
          </Link>
        </div>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "GMV (all time)", value: naira(Number(gmvAll._sum.totalAmount ?? 0)), accent: "text-emerald-400" },
          { label: "GMV (30d)",      value: naira(Number(gmv30d._sum.totalAmount  ?? 0)), accent: "text-emerald-400" },
          { label: "GMV (7d)",       value: naira(Number(gmv7d._sum.totalAmount   ?? 0)), accent: "text-emerald-400" },
          { label: "Orders (all)",   value: ordersAll.toLocaleString(),  accent: "text-blue-400" },
          { label: "Orders (30d)",   value: orders30d.toLocaleString(),  accent: "text-blue-400" },
          { label: "Orders (7d)",    value: orders7d.toLocaleString(),   accent: "text-blue-400" },
          { label: "Vendors",        value: `${vendorsAll} (+${vendors30d} 30d)`, accent: "text-violet-400" },
          { label: "Users",          value: `${usersAll} (+${users30d} 30d)`,    accent: "text-amber-400" },
          { label: "Products",       value: `${productsActive} active / ${productsAll} total`, accent: "text-slate-300" },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-xs text-slate-500 mb-2">{label}</p>
            <p className={`text-lg font-bold ${accent}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Top vendors */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white">Top 10 vendors by GMV</h2>
        </div>
        <div className="divide-y divide-slate-800/60">
          {topVendors.map((v, i) => {
            const revenue = Number(v._sum.totalAmount ?? 0);
            const info    = vendorMap[v.vendorId];
            return (
              <div key={v.vendorId} className="px-5 py-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-slate-600 w-5 shrink-0">#{i + 1}</span>
                    <p className="text-sm font-medium text-white truncate">
                      {info?.businessName ?? v.vendorId}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-emerald-400">{naira(revenue)}</p>
                    <p className="text-xs text-slate-500">{v._count.id} orders</p>
                  </div>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${Math.round((revenue / maxVendorRevenue) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
          {topVendors.length === 0 && (
            <p className="px-5 py-8 text-sm text-slate-500 text-center">No paid orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
