import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma/client";
import { adminSetUserRole, adminSetUserSuspended } from "@/app/actions/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Users — Admin" };

const ROLE_COLOR: Record<UserRole, string> = {
  CUSTOMER: "text-slate-400 bg-slate-800",
  VENDOR:   "text-blue-300 bg-blue-900/40",
  ADMIN:    "text-red-300 bg-red-900/40",
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const users = await prisma.user.findMany({
    where: q
      ? { OR: [
          { name:  { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ]}
      : undefined,
    include: {
      _count:  { select: { orders: true } },
      vendor:  { select: { businessName: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-slate-400 mt-1">{users.length.toLocaleString()} result{users.length !== 1 ? "s" : ""}</p>
        </div>
        <form method="GET" action="/admin/users">
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search users…"
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 w-56"
          />
        </form>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 flex items-center gap-4">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {(user.name ?? user.email ?? "?")[0]?.toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-white">{user.name ?? "—"}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${ROLE_COLOR[user.role]}`}>
                  {user.role}
                </span>
                {user.isSuspended && (
                  <span className="text-xs font-semibold text-amber-300 bg-amber-900/40 px-2 py-0.5 rounded-md">
                    Suspended
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                {user.email ?? user.phone ?? "—"}
                {user.vendor && <span className="ml-2 text-slate-600">· {user.vendor.businessName}</span>}
              </p>
            </div>

            {/* Orders count */}
            <div className="text-center shrink-0 hidden sm:block">
              <p className="text-sm font-semibold text-white">{user._count.orders}</p>
              <p className="text-xs text-slate-500">orders</p>
            </div>

            {/* Joined */}
            <p className="text-xs text-slate-500 shrink-0 hidden md:block">
              {new Date(user.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Role cycling */}
              {user.role !== "ADMIN" && (
                <form action={adminSetUserRole.bind(null, user.id, user.role === "CUSTOMER" ? "VENDOR" : "CUSTOMER")}>
                  <button type="submit" className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                    {user.role === "CUSTOMER" ? "→ Vendor" : "→ Customer"}
                  </button>
                </form>
              )}
              {/* Suspend/unsuspend */}
              <form action={adminSetUserSuspended.bind(null, user.id, !user.isSuspended)}>
                <button
                  type="submit"
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    user.isSuspended
                      ? "text-emerald-400 hover:text-emerald-300 bg-emerald-900/30 hover:bg-emerald-900/50"
                      : "text-amber-400 hover:text-amber-300 bg-amber-900/30 hover:bg-amber-900/50"
                  }`}
                >
                  {user.isSuspended ? "Unsuspend" : "Suspend"}
                </button>
              </form>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl px-8 py-16 text-center">
            <p className="text-sm text-slate-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
