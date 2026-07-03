import { prisma } from "@/lib/prisma";
import { adminUpdateSetting } from "@/app/actions/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings — Admin" };

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;

  const settingsRows = await prisma.platformSetting.findMany().catch(() => [] as { key: string; value: string; updatedAt: Date }[]);
  const settings: Record<string, string> = {};
  for (const row of settingsRows) settings[row.key] = row.value;

  const commission  = settings["commission_percent"] ?? "0";
  const maintenance = settings["maintenance_mode"]   ?? "false";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Platform settings</h1>
        <p className="text-sm text-slate-400 mt-1">Global configuration for ClientFlow</p>
      </div>

      {saved && (
        <div className="text-sm text-emerald-300 bg-emerald-900/30 border border-emerald-800 rounded-xl px-4 py-3">
          Settings saved.
        </div>
      )}

      {/* Commission */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-1">Platform commission</h2>
        <p className="text-xs text-slate-500 mb-5">
          Percentage ClientFlow takes from each paid order when a vendor has a Paystack subaccount.
          Set to 0 to disable.
        </p>
        <form
          action={async (fd: FormData) => {
            "use server";
            await adminUpdateSetting("commission_percent", fd.get("commission_percent") as string);
          }}
          className="flex items-end gap-3"
        >
          <div className="flex-1">
            <label className="block text-xs text-slate-400 mb-1.5">Commission %</label>
            <div className="relative">
              <input
                name="commission_percent"
                type="number"
                min="0"
                max="30"
                step="0.5"
                defaultValue={commission}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
            </div>
          </div>
          <button type="submit" className="bg-white text-slate-900 text-sm font-semibold px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors shrink-0">
            Save
          </button>
        </form>
        <p className="text-xs text-slate-600 mt-3">
          Current: {commission}% · Applied via Paystack <code>transaction_charge</code> on subaccount orders.
        </p>
      </div>

      {/* Maintenance mode */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-1">Maintenance mode</h2>
        <p className="text-xs text-slate-500 mb-5">
          When active, a banner is shown in all vendor dashboards. Storefront pages remain accessible.
        </p>
        <div className="flex items-center gap-4">
          <form action={async () => {
            "use server";
            await adminUpdateSetting("maintenance_mode", maintenance === "true" ? "false" : "true");
          }}>
            <button
              type="submit"
              className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors ${
                maintenance === "true"
                  ? "bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900"
                  : "bg-amber-900/50 text-amber-300 hover:bg-amber-900"
              }`}
            >
              {maintenance === "true" ? "Disable maintenance" : "Enable maintenance"}
            </button>
          </form>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            maintenance === "true"
              ? "text-amber-300 bg-amber-900/40"
              : "text-emerald-300 bg-emerald-900/40"
          }`}>
            {maintenance === "true" ? "Maintenance ON" : "All systems normal"}
          </span>
        </div>
      </div>

      {/* All settings raw */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white">All settings</h2>
        </div>
        <div className="divide-y divide-slate-800/60">
          {settingsRows.map((row) => (
            <div key={row.key} className="px-5 py-3 flex justify-between items-center gap-4">
              <p className="text-xs font-mono text-slate-400">{row.key}</p>
              <p className="text-xs font-mono text-white">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
