import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionTier } from "@/generated/prisma/client";
import { TIER, TIER_ORDER } from "@/lib/tier";
import UpgradeButton from "./_components/UpgradeButton";
import { adminSetOwnTier } from "@/app/actions/admin";

export const metadata = { title: "Settings — ClientFlow" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { upgraded } = await searchParams;
  const isAdmin = session.user.role === "ADMIN";

  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id },
    include: { user: { select: { email: true } } },
  });
  if (!vendor) redirect("/onboarding");

  const productCount   = await prisma.product.count({ where: { vendorId: vendor.id } });
  const currentTier    = vendor.subscriptionTier;
  const currentConfig  = TIER[currentTier];

  return (
    <div className="p-5 sm:p-8 max-w-4xl mx-auto">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your plan and store details.</p>
      </div>

      {upgraded === "1" && (
        <div className="mb-6 text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Plan updated to <strong>{currentConfig.label}</strong>. All features are now active.
        </div>
      )}

      {/* Current plan card */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Current plan</p>
            <p className="text-2xl font-bold">
              {currentConfig.label}
              {currentConfig.highlight && (
                <span className="ml-2 text-xs font-semibold text-violet-300 bg-violet-900/60 px-2 py-0.5 rounded-full align-middle">
                  Most popular
                </span>
              )}
            </p>
            <p className="text-white/50 text-sm mt-0.5">
              {currentConfig.priceNGN === 0 ? "Free forever" : `${naira(currentConfig.priceNGN)}/month`}
            </p>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full ${
              vendor.subscriptionStatus === "ACTIVE"
                ? "bg-emerald-900/60 text-emerald-300"
                : "bg-amber-900/60 text-amber-300"
            }`}
          >
            {vendor.subscriptionStatus.charAt(0) + vendor.subscriptionStatus.slice(1).toLowerCase()}
          </span>
        </div>

        {/* Usage bar */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-xs text-white/50">Products used</p>
            <p className="text-xs text-white/70 font-medium">
              {productCount} / {currentConfig.maxProducts === -1 ? "∞" : currentConfig.maxProducts}
            </p>
          </div>
          {currentConfig.maxProducts !== -1 && (
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${Math.min((productCount / currentConfig.maxProducts) * 100, 100)}%` }}
              />
            </div>
          )}
          {currentConfig.maxProducts === -1 && (
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-full" />
            </div>
          )}
        </div>

        {/* Active features */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currentConfig.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-white/70">
              <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── Plan comparison ── */}
      <h2 className="text-base font-semibold text-slate-800 mb-4">All plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {TIER_ORDER.map((tier) => {
          const cfg       = TIER[tier];
          const isCurrent = tier === currentTier;
          const tierIndex = TIER_ORDER.indexOf(tier);
          const curIndex  = TIER_ORDER.indexOf(currentTier);
          const isUpgrade = tierIndex > curIndex;
          const isDowngrade = tierIndex < curIndex;

          return (
            <div
              key={tier}
              className={`rounded-2xl border flex flex-col transition-shadow ${
                isCurrent
                  ? "border-slate-900 shadow-lg"
                  : "border-slate-100 hover:border-slate-200"
              } bg-white`}
            >
              {/* Header */}
              <div className={`rounded-t-2xl px-5 pt-5 pb-4 ${isCurrent ? "bg-slate-900" : "bg-white"}`}>
                {cfg.highlight && !isCurrent && (
                  <p className="text-xs font-semibold text-violet-600 mb-1.5">Most popular</p>
                )}
                <p className={`text-xs uppercase tracking-widest mb-1 ${isCurrent ? "text-white/40" : "text-slate-400"}`}>
                  {cfg.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <p className={`text-2xl font-bold ${isCurrent ? "text-white" : "text-slate-900"}`}>
                    {cfg.priceNGN === 0 ? "Free" : naira(cfg.priceNGN)}
                  </p>
                  {cfg.priceNGN > 0 && (
                    <p className={`text-xs ${isCurrent ? "text-white/40" : "text-slate-400"}`}>/mo</p>
                  )}
                </div>
                <p className={`text-xs mt-1 ${isCurrent ? "text-white/50" : "text-slate-400"}`}>
                  {cfg.maxProducts === -1 ? "Unlimited products" : `Up to ${cfg.maxProducts} products`}
                </p>
              </div>

              {/* Features list */}
              <div className="px-5 py-4 flex-1">
                <ul className="space-y-2">
                  {cfg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                {isCurrent ? (
                  <div className="w-full text-center text-xs font-semibold text-white/50 bg-slate-900 py-3 rounded-xl">
                    Current plan
                  </div>
                ) : isAdmin ? (
                  /* Admin instant switch — no Paystack needed */
                  <form
                    action={async () => {
                      "use server";
                      await adminSetOwnTier(tier as SubscriptionTier);
                    }}
                  >
                    <button
                      type="submit"
                      className={`w-full text-sm font-semibold py-3 rounded-xl transition-colors ${
                        isUpgrade
                          ? "bg-slate-900 text-white hover:bg-slate-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {isUpgrade ? `Upgrade to ${cfg.label}` : `Downgrade to ${cfg.label}`}
                    </button>
                  </form>
                ) : isUpgrade ? (
                  <UpgradeButton
                    tier={tier as SubscriptionTier}
                    label={cfg.label}
                    priceNGN={cfg.priceNGN}
                    email={vendor.user.email ?? ""}
                  />
                ) : (
                  <div className="w-full text-center text-xs text-slate-300 py-3">
                    {isDowngrade ? "Contact support to downgrade" : "Lower tier"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Store details */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-5">Store details</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Business name</p>
            <p className="text-slate-800 font-medium">{vendor.businessName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Store username</p>
            <p className="text-slate-800 font-medium">@{vendor.username}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Category</p>
            <p className="text-slate-800 font-medium capitalize">
              {vendor.category.toLowerCase().replace(/_/g, " ")}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Store URL</p>
            <a
              href={`/shop/${vendor.username}`}
              className="text-slate-900 font-medium hover:underline"
            >
              /shop/{vendor.username}
            </a>
          </div>
          {isAdmin && (
            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-0.5">Account type</p>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Admin — instant plan switching enabled
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
