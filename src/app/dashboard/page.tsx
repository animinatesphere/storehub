import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Dashboard — StoreHub" };

const PAYMENT_BADGE: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border border-amber-100",
  PAID:    "bg-emerald-50 text-emerald-700 border border-emerald-100",
  FAILED:  "bg-red-50 text-red-700 border border-red-100",
  REFUNDED:"bg-slate-100 text-slate-500 border border-slate-200",
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const [activeProducts, totalOrders, revenueAgg, pendingOrders, recentOrders] =
    await Promise.all([
      prisma.product.count({ where: { vendorId: vendor.id, status: "ACTIVE" } }),
      prisma.order.count({ where: { vendorId: vendor.id } }),
      prisma.order.aggregate({
        where: { vendorId: vendor.id, paymentStatus: "PAID" },
        _sum: { totalAmount: true },
      }),
      prisma.order.count({ where: { vendorId: vendor.id, paymentStatus: "PENDING" } }),
      prisma.order.findMany({
        where: { vendorId: vendor.id },
        include: { customer: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

  const revenue = Number(revenueAgg._sum.totalAmount ?? 0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = vendor.businessName.split(" ")[0];

  return (
    <div className="p-5 sm:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}, {firstName}</h1>
          <p className="text-slate-400 text-sm mt-1">Here&apos;s what&apos;s happening with your store.</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="shrink-0 hidden sm:flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total revenue", value: naira(revenue), note: "From paid orders", accent: "text-emerald-600" },
          { label: "All orders", value: String(totalOrders), note: `${pendingOrders} pending`, accent: "text-blue-600" },
          { label: "Active products", value: String(activeProducts), note: "Live on your store", accent: "text-violet-600" },
          { label: "Pending payment", value: String(pendingOrders), note: "Need to be paid", accent: "text-amber-600" },
        ].map(({ label, value, note, accent }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs text-slate-400 mb-3">{label}</p>
            <p className={`text-2xl font-bold ${accent}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-1.5">{note}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          {
            href: "/dashboard/products/new",
            title: "Add a product",
            desc: "List something new for sale",
            icon: <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
          },
          {
            href: `/shop/${vendor.username}`,
            title: "View your store",
            desc: `storehub.ng/shop/${vendor.username}`,
            external: true,
            icon: <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>,
          },
          {
            href: "/dashboard/orders",
            title: "Manage orders",
            desc: "Track and process orders",
            icon: <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
          },
        ].map(({ href, title, desc, icon, external }) => (
          <Link
            key={href}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start gap-4 hover:border-slate-200 hover:shadow-sm transition-all group"
          >
            <div className="mt-0.5">{icon}</div>
            <div>
              <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{title}</p>
              <p className="text-xs text-slate-400 mt-0.5 truncate">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Recent orders</h2>
          <Link href="/dashboard/orders" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-slate-400">No orders yet.</p>
            <p className="text-xs text-slate-300 mt-1">Share your store link to start getting orders.</p>
            <Link
              href={`/shop/${vendor.username}`}
              target="_blank"
              className="mt-4 inline-block text-xs font-medium text-slate-900 underline underline-offset-2"
            >
              storehub.ng/shop/{vendor.username}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                {/* Customer avatar */}
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-xs font-semibold text-slate-500">
                  {(order.customer.name ?? order.customer.email ?? "?")[0]?.toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {order.customer.name ?? order.customer.email ?? "Customer"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-NG", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>

                {/* Status + amount */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${PAYMENT_BADGE[order.paymentStatus] ?? ""}`}>
                    {order.paymentStatus.charAt(0) + order.paymentStatus.slice(1).toLowerCase()}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 tabular-nums">
                    {naira(Number(order.totalAmount))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
