import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminRefundOrder } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

const PAYMENT_COLOR: Record<string, string> = {
  PENDING:  "text-amber-300 bg-amber-900/40",
  PAID:     "text-emerald-300 bg-emerald-900/40",
  FAILED:   "text-red-300 bg-red-900/40",
  REFUNDED: "text-slate-400 bg-slate-800",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      vendor:   { select: { businessName: true, username: true } },
    },
  });

  if (!order) notFound();

  const items = order.items as Array<{ productId?: string; title?: string; quantity?: number; price?: number }>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/orders" className="text-xs text-slate-400 hover:text-white transition-colors">
          ← Orders
        </Link>
        <span className="text-slate-700">/</span>
        <p className="text-xs text-slate-500 truncate">{order.id}</p>
      </div>

      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Order detail</h1>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${PAYMENT_COLOR[order.paymentStatus] ?? ""}`}>
          {order.paymentStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Customer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Customer</p>
          <p className="text-sm font-semibold text-white">{order.customer.name ?? "—"}</p>
          <p className="text-xs text-slate-400 mt-1">{order.customer.email}</p>
          {order.customer.phone && <p className="text-xs text-slate-400 mt-0.5">{order.customer.phone}</p>}
        </div>

        {/* Vendor */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Vendor</p>
          <p className="text-sm font-semibold text-white">{order.vendor.businessName}</p>
          <Link href={`/shop/${order.vendor.username}`} target="_blank" className="text-xs text-slate-400 hover:text-white mt-1 block transition-colors">
            @{order.vendor.username} →
          </Link>
        </div>
      </div>

      {/* Items */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Items</p>
        </div>
        <div className="divide-y divide-slate-800/60">
          {items.map((item, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white">{item.title ?? "Item"}</p>
                <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity ?? 1}</p>
              </div>
              {item.price != null && (
                <p className="text-sm font-semibold text-white tabular-nums">{naira(item.price)}</p>
              )}
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 flex justify-between">
          <p className="text-sm text-slate-400">Total</p>
          <p className="text-sm font-bold text-white">{naira(Number(order.totalAmount))}</p>
        </div>
      </div>

      {/* Payment info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Payment</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Status</p>
            <p className="text-white font-medium">{order.paymentStatus}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Date</p>
            <p className="text-white">
              {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          {order.paystackReference && (
            <div className="col-span-2">
              <p className="text-xs text-slate-500 mb-0.5">Paystack reference</p>
              <p className="text-slate-300 font-mono text-xs break-all">{order.paystackReference}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {order.paymentStatus === "PAID" && (
        <form action={adminRefundOrder.bind(null, order.id)}>
          <button
            type="submit"
            className="w-full bg-red-900/50 border border-red-800 text-red-300 text-sm font-semibold py-3.5 rounded-2xl hover:bg-red-900 transition-colors"
          >
            Issue refund via Paystack
          </button>
          <p className="text-xs text-slate-500 text-center mt-2">
            This will call the Paystack refund API and mark the order as refunded.
          </p>
        </form>
      )}
      {order.paymentStatus === "REFUNDED" && (
        <div className="bg-slate-800 rounded-2xl px-5 py-4 text-center">
          <p className="text-sm text-slate-400">This order has been refunded.</p>
        </div>
      )}
    </div>
  );
}
