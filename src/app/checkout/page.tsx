import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import CheckoutForm from "./_components/CheckoutForm";

export const metadata = { title: "Checkout — ClientFlow" };

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; vendor?: string }>;
}) {
  const { product: productId, vendor: vendorUsername } = await searchParams;

  if (!productId) notFound();

  const [product, session] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId, status: "ACTIVE" },
      include: {
        vendor: {
          select: {
            businessName: true,
            username: true,
            storefrontSetting: { select: { logoUrl: true, brandColor: true } },
          },
        },
      },
    }),
    auth(),
  ]);

  if (!product) notFound();
  if (vendorUsername && product.vendor.username !== vendorUsername) notFound();

  const price      = Number(product.price);
  const settings   = product.vendor.storefrontSetting;
  const brandColor = settings?.brandColor ?? "#0f172a";
  const logoUrl    = settings?.logoUrl;

  function initials(name: string) {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href={`/shop/${product.vendor.username}`} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {product.vendor.businessName}
          </Link>
          <Link href="/" className="text-sm font-bold text-slate-900">ClientFlow</Link>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Order summary (left) ── */}
          <div>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Order summary</h2>

            {/* Vendor */}
            <div className="flex items-center gap-3 mb-6">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={product.vendor.businessName} className="w-9 h-9 rounded-xl object-cover border border-slate-100" />
              ) : (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  {initials(product.vendor.businessName)}
                </div>
              )}
              <p className="text-sm text-slate-600">{product.vendor.businessName}</p>
            </div>

            {/* Product card */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden mb-6">
              <div className="flex items-center gap-4 p-4">
                {product.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-xl shrink-0 opacity-20"
                    style={{ backgroundColor: brandColor }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 leading-snug">{product.title}</p>
                  <p className="text-xs text-slate-400 mt-1">Qty: 1</p>
                </div>
                <p className="text-sm font-bold text-slate-900 shrink-0">{naira(price)}</p>
              </div>

              {/* Total row */}
              <div className="border-t border-slate-100 px-4 py-3 flex justify-between items-center bg-slate-50">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-base font-bold text-slate-900">{naira(price)}</p>
              </div>
            </div>

            {/* Trust */}
            <div className="flex flex-col gap-2">
              {[
                "Payment secured by Paystack",
                "Seller verified on ClientFlow",
                "Your email keeps a record of this purchase",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Buyer details + CTA (right) ── */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Your details</h1>
            <p className="text-sm text-slate-400 mb-6">We&apos;ll send your receipt and order updates here.</p>

            <div className="bg-white border border-slate-100 rounded-2xl p-6">
              <CheckoutForm
                productId={product.id}
                productTitle={product.title}
                price={price}
                vendorName={product.vendor.businessName}
                defaultEmail={session?.user?.email ?? undefined}
                defaultName={session?.user?.name  ?? undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
