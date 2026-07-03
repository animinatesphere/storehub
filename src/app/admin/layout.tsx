import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const NAV = [
  { href: "/admin",                 label: "Overview"       },
  { href: "/admin/vendors",         label: "Vendors"        },
  { href: "/admin/products",        label: "Products"       },
  { href: "/admin/orders",          label: "Orders"         },
  { href: "/admin/users",           label: "Users"          },
  { href: "/admin/communications",  label: "Communications" },
  { href: "/admin/reports",         label: "Reports"        },
  { href: "/admin/settings",        label: "Settings"       },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id)            redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-slate-800/70 fixed top-0 left-0 h-full z-30">
        <div className="h-14 flex items-center gap-2 px-5 border-b border-slate-800/70">
          <span className="text-sm font-bold text-white">ClientFlow</span>
          <span className="text-xs font-semibold text-red-400 bg-red-900/40 px-1.5 py-0.5 rounded">
            Admin
          </span>
        </div>

        <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-slate-800/70 space-y-2">
          <Link href="/dashboard" className="block text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Vendor dashboard →
          </Link>
          <Link href="/" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">
            Back to site
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-56">

        {/* Mobile top bar */}
        <header className="lg:hidden h-12 border-b border-slate-800/70 flex items-center gap-1 px-3 overflow-x-auto">
          <span className="text-xs font-bold text-white shrink-0 mr-3">Admin</span>
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {label}
            </Link>
          ))}
        </header>

        <main className="flex-1 p-5 sm:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
