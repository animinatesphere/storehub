import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Orders — ClientFlow" };

const PAYMENT_BADGE: Record<string, string> = {
  PENDING:  "bg-amber-50 text-amber-700 border border-amber-100",
  PAID:     "bg-emerald-50 text-emerald-700 border border-emerald-100",
  FAILED:   "bg-red-50 text-red-700 border border-red-100",
  REFUNDED: "bg-slate-100 text-slate-500 border border-slate-200",
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const orders = await prisma.order.findMany({
    where: { vendorId: vendor.id },
    include: { customer: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const paidTotal = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + Number(o.totalAmount), 0);

  return (
    <div className="p-5 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-400 mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
          {orders.length > 0 && (
            <span className="ml-2 text-emerald-600 font-medium">{naira(paidTotal)} received</span>
          )}
        </p>
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 px-8 py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700 mb-1">No orders yet</p>
          <p className="text-xs text-slate-400">Orders will appear here once customers start buying.</p>
        </div>
      )}

      {/* Orders table */}
      {orders.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100">
            <p className="col-span-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Customer</p>
            <p className="col-span-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</p>
            <p className="col-span-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</p>
            <p className="col-span-2 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Total</p>
          </div>

          <div className="divide-y divide-slate-50">
            {orders.map((order) => {
              const items = order.items as Array<{ title?: string; quantity?: number }>;
              const itemSummary = Array.isArray(items)
                ? items.map((i) => `${i.quantity ?? 1}× ${i.title ?? "item"}`).join(", ")
                : "Order";

              return (
                <div key={order.id} className="px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                  {/* Customer */}
                  <div className="sm:col-span-4 flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-xs font-semibold text-slate-500">
                      {(order.customer.name ?? order.customer.email ?? "?")[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {order.customer.name ?? "Customer"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{order.customer.email}</p>
                      {/* Item summary — mobile only */}
                      <p className="sm:hidden text-xs text-slate-300 truncate mt-0.5">{itemSummary}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-3 hidden sm:block">
                    <p className="text-sm text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5 truncate">{itemSummary}</p>
                  </div>

                  {/* Status */}
                  <div className="sm:col-span-3 flex items-center justify-between sm:block">
                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${PAYMENT_BADGE[order.paymentStatus] ?? ""}`}>
                      {order.paymentStatus.charAt(0) + order.paymentStatus.slice(1).toLowerCase()}
                    </span>
                    {/* Amount — mobile only */}
                    <span className="sm:hidden text-sm font-semibold text-slate-900 tabular-nums">
                      {naira(Number(order.totalAmount))}
                    </span>
                  </div>

                  {/* Total — desktop only */}
                  <div className="sm:col-span-2 hidden sm:block text-right">
                    <p className="text-sm font-semibold text-slate-900 tabular-nums">
                      {naira(Number(order.totalAmount))}
                    </p>
                    {order.paystackReference && (
                      <p className="text-xs text-slate-300 mt-0.5 truncate" title={order.paystackReference}>
                        {order.paystackReference.slice(0, 12)}…
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
