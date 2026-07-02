import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signOut } from "@/lib/auth";

export const metadata = { title: "My account — StoreHub" };

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

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/account");

  const orders = await prisma.order.findMany({
    where: { customerId: session.user.id },
    include: {
      vendor: { select: { businessName: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalSpent = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + Number(o.totalAmount), 0);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, createdAt: true, vendor: { select: { id: true } } },
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/marketplace" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            Marketplace
          </Link>
          <Link href="/" className="text-sm font-bold text-slate-900">StoreHub</Link>
          {user?.vendor ? (
            <Link href="/dashboard" className="text-xs text-slate-600 hover:text-slate-900 transition-colors">
              Vendor dashboard
            </Link>
          ) : (
            <Link href="/onboarding" className="text-xs text-slate-600 hover:text-slate-900 transition-colors">
              Start selling
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10">

        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {(user?.name ?? user?.email ?? "?")[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-slate-900">{user?.name ?? "Customer"}</p>
            <p className="text-sm text-slate-400 truncate">{user?.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="text-xs text-slate-400 hover:text-red-500 transition-colors px-3 py-1.5">
              Sign out
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs text-slate-400 mb-2">Total orders</p>
            <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs text-slate-400 mb-2">Total spent</p>
            <p className="text-2xl font-bold text-emerald-600">{naira(totalSpent)}</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-400 mb-2">Member since</p>
            <p className="text-base font-semibold text-slate-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-NG", {
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Your orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 px-8 py-20 text-center">
            <p className="text-sm font-medium text-slate-600 mb-1">No orders yet</p>
            <p className="text-xs text-slate-400 mb-6">Discover products from Nigerian sellers.</p>
            <Link
              href="/marketplace"
              className="inline-block bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors"
            >
              Browse marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const items = order.items as Array<{ title?: string; quantity?: number }>;
              const summary = Array.isArray(items)
                ? items.map((i) => `${i.quantity ?? 1}× ${i.title ?? "item"}`).join(", ")
                : "Order";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{summary}</p>
                      <Link
                        href={`/shop/${order.vendor.username}`}
                        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {order.vendor.businessName}
                      </Link>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                        PAYMENT_BADGE[order.paymentStatus] ?? ""
                      }`}
                    >
                      {order.paymentStatus.charAt(0) + order.paymentStatus.slice(1).toLowerCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {naira(Number(order.totalAmount))}
                    </p>
                  </div>

                  {order.paystackReference && (
                    <p className="text-xs text-slate-300 mt-2 truncate" title={order.paystackReference}>
                      Ref: {order.paystackReference}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
