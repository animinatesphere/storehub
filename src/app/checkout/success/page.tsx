import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Order confirmed — ClientFlow" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; ref?: string }>;
}) {
  const { order: orderId } = await searchParams;

  const order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          vendor: { select: { businessName: true, username: true } },
        },
      })
    : null;

  const items = order
    ? (order.items as Array<{ title?: string; quantity?: number; price?: number }>)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Nav */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-center">
          <Link href="/" className="text-sm font-bold text-slate-900">ClientFlow</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-md text-center">

          {/* Success icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment confirmed!</h1>
          <p className="text-sm text-slate-500 mb-8">
            {order
              ? `Your order from ${order.vendor.businessName} has been received.`
              : "Your payment was successful. Check your email for details."}
          </p>

          {/* Order details */}
          {order && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left mb-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Order details</p>

              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800 truncate">{item.title ?? "Item"}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity ?? 1}</p>
                    </div>
                    {item.price != null && (
                      <p className="text-sm font-semibold text-slate-900 shrink-0">
                        {naira(item.price)}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between">
                <p className="text-sm text-slate-500">Total paid</p>
                <p className="text-sm font-bold text-slate-900">{naira(Number(order.totalAmount))}</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    order.paymentStatus === "PAID"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {order.paymentStatus === "PAID" ? "Paid" : "Processing"}
                </span>
                {order.paystackReference && (
                  <p className="text-xs text-slate-300 truncate">{order.paystackReference}</p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {order && (
              <Link
                href={`/shop/${order.vendor.username}`}
                className="block w-full bg-slate-900 text-white text-sm font-semibold px-5 py-3.5 rounded-2xl hover:bg-slate-700 transition-colors"
              >
                Back to {order.vendor.businessName}
              </Link>
            )}
            <Link
              href="/marketplace"
              className="block w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium px-5 py-3.5 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
