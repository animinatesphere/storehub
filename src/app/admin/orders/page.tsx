import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Orders — Admin" };

const PAYMENT_COLOR: Record<string, string> = {
  PENDING:  "text-amber-300 bg-amber-900/40",
  PAID:     "text-emerald-300 bg-emerald-900/40",
  FAILED:   "text-red-300 bg-red-900/40",
  REFUNDED: "text-slate-400 bg-slate-800",
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const validStatuses = ["PENDING", "PAID", "FAILED", "REFUNDED"];
  const statusFilter  = validStatuses.includes(status ?? "") ? status : undefined;

  const [orders, totalRevenue, counts] = await Promise.all([
    prisma.order.findMany({
      where: statusFilter ? { paymentStatus: statusFilter as "PENDING" | "PAID" | "FAILED" | "REFUNDED" } : undefined,
      include: {
        customer: { select: { name: true, email: true } },
        vendor:   { select: { businessName: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.order.aggregate({ where: { paymentStatus: "PAID" }, _sum: { totalAmount: true } }),
    prisma.order.groupBy({ by: ["paymentStatus"], _count: { id: true } }),
  ]);

  const gmv       = Number(totalRevenue._sum.totalAmount ?? 0);
  const countMap: Record<string, number> = {};
  for (const c of counts) countMap[c.paymentStatus] = c._count.id;
  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-slate-400 mt-1">{naira(gmv)} total GMV</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[undefined, ...validStatuses].map((s) => {
          const count    = s ? (countMap[s] ?? 0) : total;
          const isActive = statusFilter === s;
          return (
            <a
              key={s ?? "all"}
              href={s ? `/admin/orders?status=${s}` : "/admin/orders"}
              className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                isActive ? "bg-white text-slate-900 border-white" : "text-slate-400 border-slate-700 hover:border-slate-500"
              }`}
            >
              {s ?? "All"} ({count})
            </a>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-slate-800 bg-slate-950/40">
          <p className="col-span-3 text-xs text-slate-500 uppercase tracking-wider">Customer</p>
          <p className="col-span-3 text-xs text-slate-500 uppercase tracking-wider">Vendor</p>
          <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wider">Date</p>
          <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wider">Status</p>
          <p className="col-span-1 text-xs text-slate-500 uppercase tracking-wider text-right">Amount</p>
          <p className="col-span-1" />
        </div>

        <div className="divide-y divide-slate-800/60">
          {orders.map((order) => (
            <div key={order.id} className="px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
              <div className="sm:col-span-3 min-w-0">
                <p className="text-sm text-white truncate">{order.customer.name ?? "Guest"}</p>
                <p className="text-xs text-slate-500 truncate">{order.customer.email}</p>
              </div>
              <p className="sm:col-span-3 text-sm text-slate-300 truncate">{order.vendor.businessName}</p>
              <p className="sm:col-span-2 text-xs text-slate-500">
                {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <div className="sm:col-span-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${PAYMENT_COLOR[order.paymentStatus] ?? ""}`}>
                  {order.paymentStatus}
                </span>
              </div>
              <p className="sm:col-span-1 text-sm font-semibold text-white text-right tabular-nums">
                {naira(Number(order.totalAmount))}
              </p>
              <div className="sm:col-span-1 flex justify-end">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
