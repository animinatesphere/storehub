import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardNav from "./_components/nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/dashboard");

  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id },
    select: {
      id:               true,
      businessName:     true,
      username:         true,
      subscriptionTier: true,
    },
  });
  if (!vendor) redirect("/onboarding");

  const [announcements, unreadNotices] = await Promise.all([
    prisma.announcement.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 1 }).catch(() => []),
    prisma.vendorNotice.findMany({ where: { vendorId: vendor.id, isRead: false }, orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);

  const initials = vendor.businessName
    .split(" ")
    .map((w: string) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const planLabel =
    vendor.subscriptionTier === "FREE" ? "Free plan" :
    vendor.subscriptionTier === "STARTER" ? "Starter" :
    vendor.subscriptionTier === "PRO" ? "Pro" : "Business";

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">

      {/* ── SIDEBAR (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-100 shrink-0 h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 h-14 flex items-center border-b border-slate-100">
          <Link href="/" className="text-base font-bold text-slate-900 tracking-tight">
            ClientFlow
          </Link>
        </div>

        {/* Vendor info */}
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{vendor.businessName}</p>
              <p className="text-xs text-slate-400">{planLabel}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <DashboardNav />
        </nav>

        {/* Bottom links */}
        <div className="px-3 py-4 border-t border-slate-100 space-y-0.5">
          <Link
            href={`/shop/${vendor.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View my store
          </Link>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors text-left"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-slate-100 h-14 flex items-center justify-between px-5">
        <Link href="/" className="text-base font-bold text-slate-900">ClientFlow</Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">{vendor.businessName}</span>
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
            {initials}
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-100 flex items-center justify-around px-2 h-16">
        {[
          { href: "/dashboard", label: "Home", exact: true, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
          { href: "/dashboard/products", label: "Products", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg> },
          { href: "/dashboard/orders", label: "Orders", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg> },
        ].map(({ href, label, icon, exact }) => (
          <MobileNavLink key={href} href={href} label={label} exact={exact}>{icon}</MobileNavLink>
        ))}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-w-0 pt-14 pb-20 lg:pt-0 lg:pb-0">

        {/* Announcement banner */}
        {announcements[0] && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 py-3">
            <p className="text-xs font-semibold text-amber-800">
              📢 {announcements[0].title}
              {" — "}
              <span className="font-normal">{announcements[0].body}</span>
            </p>
          </div>
        )}

        {/* Unread notices */}
        {unreadNotices.length > 0 && (
          <div className="bg-blue-50 border-b border-blue-200 px-5 py-3 space-y-1">
            {unreadNotices.map((n) => (
              <p key={n.id} className="text-xs text-blue-800">
                <span className="font-semibold">Notice: {n.title}</span>
                {" — "}
                {n.body}
              </p>
            ))}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}

// Tiny RSC-compatible mobile nav link (no usePathname needed — handled in DashboardNav which is already a client component)
function MobileNavLink({
  href,
  label,
  children,
  exact,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  // We pass exact as a data attribute; the client nav handles active state for desktop.
  // For mobile bottom nav, we use a simple Link without active styling for now.
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-3 py-1 text-slate-500 hover:text-slate-900 transition-colors"
    >
      {children}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
