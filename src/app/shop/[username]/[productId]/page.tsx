import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; productId: string }>;
}) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { title: true, description: true },
  });
  if (!product) return { title: "Product not found — StoreHub" };
  return {
    title: `${product.title} — StoreHub`,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ username: string; productId: string }>;
}) {
  const { username, productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      vendor: {
        select: {
          businessName: true,
          username: true,
          storefrontSetting: {
            select: { logoUrl: true, brandColor: true },
          },
        },
      },
    },
  });

  if (!product || product.vendor.username !== username || product.status !== "ACTIVE") {
    notFound();
  }

  const vendor     = product.vendor;
  const settings   = vendor.storefrontSetting;
  const brandColor = settings?.brandColor ?? "#0f172a";
  const logoUrl    = settings?.logoUrl;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-12 flex items-center justify-between">
          <Link
            href={`/shop/${username}`}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {vendor.businessName}
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-900">StoreHub</Link>
          <Link href="/login" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Sign in</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Images ── */}
          <div>
            {product.images.length > 0 ? (
              <div className="space-y-3">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1, 5).map((img, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={img}
                        alt={`${product.title} ${i + 2}`}
                        className="aspect-square rounded-xl object-cover bg-slate-100"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="aspect-square rounded-2xl flex items-center justify-center opacity-20"
                style={{ backgroundColor: brandColor }}
              >
                <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* ── Product info + CTA ── */}
          <div className="flex flex-col">
            {/* Vendor badge */}
            <Link
              href={`/shop/${username}`}
              className="flex items-center gap-2.5 mb-5 group w-fit"
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={vendor.businessName}
                  className="w-7 h-7 rounded-lg object-cover border border-slate-100"
                />
              ) : (
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: brandColor }}
                >
                  {initials(vendor.businessName)}
                </div>
              )}
              <span className="text-sm text-slate-500 group-hover:text-slate-800 transition-colors">
                {vendor.businessName}
              </span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-3">
              {product.title}
            </h1>

            <p className="text-3xl font-bold text-slate-900 mb-4">
              {naira(Number(product.price))}
            </p>

            {product.stockCount != null && (
              <p className={`text-sm mb-4 font-medium ${product.stockCount <= 5 ? "text-amber-600" : "text-slate-400"}`}>
                {product.stockCount === 0
                  ? "Out of stock"
                  : product.stockCount <= 5
                  ? `Only ${product.stockCount} left`
                  : `${product.stockCount} in stock`}
              </p>
            )}

            {product.description && (
              <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6">
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* CTA — cart not built yet; links to checkout stub */}
            <div className="mt-auto space-y-3">
              {product.stockCount === 0 ? (
                <div className="w-full bg-slate-100 text-slate-400 text-center px-5 py-4 rounded-2xl text-sm font-semibold">
                  Out of stock
                </div>
              ) : (
                <Link
                  href={`/checkout?product=${product.id}&vendor=${username}`}
                  className="block w-full text-center px-5 py-4 rounded-2xl text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: brandColor }}
                >
                  Buy now
                </Link>
              )}

              <Link
                href={`/shop/${username}`}
                className="block w-full text-center bg-white border border-slate-200 text-slate-700 px-5 py-4 rounded-2xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Back to store
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure Paystack checkout
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified seller
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 mt-16 py-8 px-5 text-center">
        <p className="text-xs text-slate-400">
          Powered by{" "}
          <Link href="/" className="text-slate-600 font-medium hover:text-slate-900 transition-colors">
            StoreHub
          </Link>
        </p>
      </footer>
    </div>
  );
}
