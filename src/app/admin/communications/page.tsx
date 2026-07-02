import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import {
  adminCreateAnnouncement,
  adminToggleAnnouncement,
  adminDeleteAnnouncement,
  adminSendVendorNotice,
} from "@/app/actions/admin";

export const metadata = { title: "Communications — Admin" };

export default async function AdminCommunicationsPage() {
  const [announcements, vendors, recentNotices] = await Promise.all([
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.vendor.findMany({
      where:   { status: "ACTIVE" },
      select:  { id: true, businessName: true, username: true },
      orderBy: { businessName: "asc" },
    }),
    prisma.vendorNotice.findMany({
      include: { vendor: { select: { businessName: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }).catch(() => []),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Communications</h1>
        <p className="text-sm text-slate-400 mt-1">Announcements and vendor notices</p>
      </div>

      {/* ── Create announcement ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">New announcement</h2>
        <p className="text-xs text-slate-500 mb-5">
          Active announcements appear as a banner in every vendor&apos;s dashboard.
        </p>
        <form action={adminCreateAnnouncement} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Title</label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. Platform maintenance tonight at 10 PM"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Body</label>
            <textarea
              name="body"
              rows={3}
              required
              placeholder="Full message shown to vendors…"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Publish announcement
          </button>
        </form>
      </div>

      {/* ── Existing announcements ── */}
      {announcements.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">All announcements</h2>
          </div>
          <div className="divide-y divide-slate-800/60">
            {announcements.map((a) => (
              <div key={a.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{a.title}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                      a.isActive ? "text-emerald-300 bg-emerald-900/40" : "text-slate-400 bg-slate-800"
                    }`}>
                      {a.isActive ? "Live" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{a.body}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {new Date(a.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={adminToggleAnnouncement.bind(null, a.id, !a.isActive)}>
                    <button type="submit" className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                      {a.isActive ? "Hide" : "Show"}
                    </button>
                  </form>
                  <form action={adminDeleteAnnouncement.bind(null, a.id)}>
                    <button type="submit" className="text-xs text-red-400 hover:text-red-300 px-2.5 py-1.5 bg-red-900/30 hover:bg-red-900/50 rounded-lg transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Send vendor notice ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-1">Send vendor notice</h2>
        <p className="text-xs text-slate-500 mb-5">
          A private message shown only to the selected vendor in their dashboard.
        </p>
        <form action={adminSendVendorNotice} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Vendor</label>
            <select
              name="vendorId"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="">Select a vendor…</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>{v.businessName} (@{v.username})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Title</label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. Your store has been reviewed"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Message</label>
            <textarea
              name="body"
              rows={3}
              required
              placeholder="Private message for this vendor…"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-600 transition-colors"
          >
            Send notice
          </button>
        </form>
      </div>

      {/* ── Recent notices ── */}
      {recentNotices.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Recent notices sent</h2>
          </div>
          <div className="divide-y divide-slate-800/60">
            {recentNotices.map((n) => (
              <div key={n.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">To: {n.vendor.businessName}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{n.body}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                    n.isRead ? "text-slate-400 bg-slate-800" : "text-amber-300 bg-amber-900/40"
                  }`}>
                    {n.isRead ? "Read" : "Unread"}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    {new Date(n.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
