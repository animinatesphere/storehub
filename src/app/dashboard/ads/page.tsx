import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TIER_ORDER } from "@/lib/tier";
import AdsGenerator from "./_components/AdsGenerator";
import LaunchVideoDownload from "./_components/LaunchVideoDownload";

export const metadata = { title: "Ads Generator — Dashboard" };

export default async function AdsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({
    where:   { userId: session.user.id },
    include: {
      storefrontSetting: true,
      products:          { where: { status: "ACTIVE" }, orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  if (!vendor) redirect("/onboarding");

  const isPro = TIER_ORDER.indexOf(vendor.subscriptionTier) >= TIER_ORDER.indexOf("PRO");

  if (!isPro) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Ads Generator</h1>
        <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Create stunning video ads for your products with AI-powered Remotion templates.
          Upgrade to <strong>PRO</strong> or higher to unlock this feature.
        </p>
        <a
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 bg-violet-600 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors"
        >
          Upgrade to PRO
        </a>
        <p className="text-xs text-slate-400 mt-4">Currently on {vendor.subscriptionTier} plan</p>
      </div>
    );
  }

  const products = vendor.products.map((p) => ({
    id:    p.id,
    title: p.title,
    price: Number(p.price),
    image: p.images[0] ?? null,
  }));

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-slate-900">Ads Generator</h1>
          <span className="text-xs font-bold text-violet-700 bg-violet-100 px-2.5 py-1 rounded-full uppercase tracking-wide">PRO</span>
        </div>
        <p className="text-sm text-slate-500">
          Generate a professional 4-second video ad for any of your products. Powered by Remotion.
        </p>
      </div>

      <AdsGenerator
        products={products}
        brandColor={vendor.storefrontSetting?.brandColor ?? "#6366f1"}
        vendorName={vendor.businessName}
        logoUrl={vendor.storefrontSetting?.logoUrl ?? null}
      />

      <div className="mt-10">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Brand content</p>
        <LaunchVideoDownload />
      </div>
    </div>
  );
}
