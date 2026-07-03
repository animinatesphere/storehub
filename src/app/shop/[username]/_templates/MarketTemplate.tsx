import Link from "next/link";
import type { TemplateProps, SocialLinks } from "./types";
import { naira, initials } from "./types";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

export default function MarketTemplate({ vendor, username }: TemplateProps) {
  const settings   = vendor.storefrontSetting;
  const brandColor = settings?.brandColor ?? "#059669";
  const logoUrl    = settings?.logoUrl;
  const bioText    = settings?.bioText ?? `Shop the best products at ${vendor.businessName}.`;
  const social     = (settings?.socialLinks ?? {}) as SocialLinks;
  const products   = vendor.products;
  const waLink     = social.whatsapp ? `https://wa.me/${social.whatsapp.replace(/\D/g, "")}` : null;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── Announcement Bar ── */}
      <div className="text-white text-center py-2 text-xs font-medium" style={{ backgroundColor: brandColor }}>
        Free WhatsApp support · Secure Paystack payments · Verified seller ✓
      </div>

      {/* ── Main Header ── */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top header row */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2.5 shrink-0">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={vendor.businessName} className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ backgroundColor: brandColor }}
                  >
                    {initials(vendor.businessName)}
                  </div>
                )}
                <div className="hidden sm:block">
                  <p className="text-sm font-black text-gray-900">{vendor.businessName}</p>
                  <p className="text-[10px] text-gray-400">Official Store</p>
                </div>
              </a>

              {/* Search bar */}
              <div className="flex-1 max-w-2xl relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <div
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-default"
                >
                  Search products in {vendor.businessName}...
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {social.instagram && (
                  <a
                    href={`https://instagram.com/${social.instagram.replace("@","")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <InstagramIcon />
                    Follow
                  </a>
                )}
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-lg transition-colors hover:opacity-90"
                    style={{ backgroundColor: brandColor }}
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Chat Now</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category / trust strip */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 h-10 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
                <TruckIcon />
                <span>Fast Delivery</span>
              </div>
              <div className="w-px h-4 bg-gray-200 shrink-0" />
              <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
                <ShieldIcon />
                <span>Secure Payment</span>
              </div>
              <div className="w-px h-4 bg-gray-200 shrink-0" />
              <Link href="/marketplace" className="text-xs text-gray-500 hover:text-gray-800 shrink-0 transition-colors">
                ← All Stores
              </Link>
              <div className="w-px h-4 bg-gray-200 shrink-0" />
              <span className="text-xs font-medium shrink-0" style={{ color: brandColor }}>
                {products.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Store Banner ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-5">
            {/* Store logo/avatar */}
            <div className="shrink-0">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={vendor.businessName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2"
                  style={{ borderColor: brandColor }}
                />
              ) : (
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-white text-2xl font-black"
                  style={{ backgroundColor: brandColor }}
                >
                  {initials(vendor.businessName)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">{vendor.businessName}</h1>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider"
                  style={{ backgroundColor: brandColor }}
                >
                  Verified
                </span>
              </div>
              {bioText && (
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{bioText}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="font-semibold text-gray-900">{products.length} Products</span>
                {social.instagram && (
                  <a
                    href={`https://instagram.com/${social.instagram.replace("@","")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-gray-800 transition-colors"
                  >
                    <InstagramIcon />
                    Instagram
                  </a>
                )}
                {social.website && (
                  <a href={social.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">
                    Website ↗
                  </a>
                )}
              </div>
            </div>

            {waLink && (
              <div className="hidden sm:block shrink-0">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-white px-5 py-3 rounded-xl transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#25d366" }}
                >
                  <WhatsAppIcon />
                  WhatsApp Chat
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">All Products</h2>
            <p className="text-xs text-gray-500">{products.length} item{products.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="text-xs text-gray-400">
            Sorted by: Latest
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl py-24 text-center border border-dashed border-gray-200">
            <div
              className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${brandColor}15` }}
            >
              <svg className="w-7 h-7" style={{ color: brandColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">No products yet</p>
            <p className="text-sm text-gray-400">Products will appear here soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${username}/${product.id}`}
                className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </div>
                  )}

                  {/* Price overlay */}
                  <div
                    className="absolute bottom-0 inset-x-0 px-2 py-1.5 text-xs font-black text-white text-right"
                    style={{ background: `linear-gradient(to top, ${brandColor}ee, transparent)` }}
                  >
                    {naira(Number(product.price))}
                  </div>

                  {product.stockCount != null && product.stockCount > 0 && product.stockCount <= 5 && (
                    <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Only {product.stockCount} left
                    </div>
                  )}
                  {product.stockCount === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="px-2.5 py-2.5">
                  <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5">
                    {product.title}
                  </p>
                  <p className="text-sm font-black" style={{ color: brandColor }}>
                    {naira(Number(product.price))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* ── Trust Badges ── */}
      <div className="bg-white border-t border-b border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              {
                icon: <TruckIcon />,
                title: "Fast Delivery",
                desc: "Quick dispatch nationwide",
              },
              {
                icon: <ShieldIcon />,
                title: "Secure Payment",
                desc: "Protected by Paystack",
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
                title: "Quality Checked",
                desc: "Every item inspected",
              },
              {
                icon: <WhatsAppIcon className="w-4 h-4" />,
                title: "24/7 Support",
                desc: "Always on WhatsApp",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white pt-10 pb-6 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-8 border-b border-gray-800">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: brandColor }}
                  >
                    {initials(vendor.businessName)}
                  </div>
                )}
                <span className="font-bold text-sm">{vendor.businessName}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {bioText?.slice(0, 80)}{bioText && bioText.length > 80 ? "…" : ""}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Shop</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">All Products</a></li>
                {waLink && <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">WhatsApp Chat</a></li>}
                {social.instagram && <li><a href={`https://instagram.com/${social.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">Instagram</a></li>}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Platform</p>
              <ul className="space-y-2">
                <li><Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">ClientFlow Home</Link></li>
                <li><Link href="/marketplace" className="text-xs text-gray-400 hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/about" className="text-xs text-gray-400 hover:text-white transition-colors">About ClientFlow</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Legal</p>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6">
            <p className="text-[11px] text-gray-600">
              © {new Date().getFullYear()} {vendor.businessName}. All rights reserved.
            </p>
            <p className="text-[11px] text-gray-600">
              Powered by{" "}
              <Link href="/" className="font-semibold hover:text-white transition-colors" style={{ color: brandColor }}>
                ClientFlow
              </Link>
              {" "}· Nigeria&apos;s Seller Platform
            </p>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ── */}
      {waLink && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25d366] hover:bg-[#20b558] text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
        >
          <WhatsAppIcon />
          <span className="text-sm font-bold hidden sm:block">Chat Us</span>
        </a>
      )}
    </div>
  );
}
