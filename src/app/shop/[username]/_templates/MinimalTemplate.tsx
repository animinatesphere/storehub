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

function TwitterIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

export default function MinimalTemplate({ vendor, username }: TemplateProps) {
  const settings   = vendor.storefrontSetting;
  const brandColor = settings?.brandColor ?? "#10b981";
  const logoUrl    = settings?.logoUrl;
  const bioText    = settings?.bioText ?? `Welcome to ${vendor.businessName}. Explore our collection and shop with confidence.`;
  const social     = (settings?.socialLinks ?? {}) as SocialLinks;
  const products   = vendor.products;
  const waLink     = social.whatsapp ? `https://wa.me/${social.whatsapp.replace(/\D/g, "")}` : null;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-3 min-w-0">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={vendor.businessName} className="w-9 h-9 rounded-lg object-cover shrink-0" />
              ) : (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  {initials(vendor.businessName)}
                </div>
              )}
              <span className="font-bold text-gray-900 text-base truncate">{vendor.businessName}</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Products</a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</a>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all hover:opacity-90"
                  style={{ backgroundColor: brandColor }}
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              )}
            </nav>

            <div className="flex md:hidden items-center gap-2">
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-white px-3.5 py-2 rounded-full"
                  style={{ backgroundColor: brandColor }}
                >
                  <WhatsAppIcon />
                  Chat
                </a>
              )}
              <Link href="/marketplace" className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2">
                Marketplace
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: `linear-gradient(135deg, ${brandColor}18 0%, ${brandColor}08 50%, #ffffff 100%)` }}
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{ backgroundColor: brandColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 translate-y-1/2 -translate-x-1/4 pointer-events-none"
          style={{ backgroundColor: brandColor }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={vendor.businessName}
              className="w-24 h-24 rounded-2xl object-cover mx-auto mb-6 shadow-xl"
              style={{ boxShadow: `0 0 0 4px ${brandColor}30, 0 20px 40px ${brandColor}20` }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black shadow-xl"
              style={{ backgroundColor: brandColor, boxShadow: `0 20px 40px ${brandColor}40` }}
            >
              {initials(vendor.businessName)}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            {vendor.businessName}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">{bioText}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a
              href="#products"
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: brandColor, boxShadow: `0 8px 24px ${brandColor}40` }}
            >
              Shop Now
            </a>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full text-sm font-bold border-2 border-gray-200 text-gray-700 hover:border-gray-400 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="text-green-500" />
                WhatsApp Us
              </a>
            )}
          </div>
          <div className="flex justify-center gap-10 sm:gap-16 border-t border-gray-100 pt-8">
            <div className="text-center">
              <p className="text-3xl font-black text-gray-900">{products.length}</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5 uppercase tracking-wider">Products</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <CheckCircleIcon />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Verified</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <ShieldCheckIcon />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Secure Pay</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section id="products" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brandColor }}>
                Our Collection
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">All Products</h2>
              <p className="text-sm text-gray-400 mt-1">
                {products.length} item{products.length !== 1 ? "s" : ""} available
              </p>
            </div>
            {social.instagram && (
              <a
                href={`https://instagram.com/${social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
              >
                <InstagramIcon /> Follow us
              </a>
            )}
          </div>

          {products.length === 0 ? (
            <div
              className="text-center py-24 border-2 border-dashed rounded-3xl"
              style={{ borderColor: `${brandColor}40` }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
              >
                <BagIcon />
              </div>
              <p className="text-lg font-bold text-gray-900">Coming Soon</p>
              <p className="text-sm text-gray-400 mt-1">Products will be available shortly. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${username}/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <ImagePlaceholderIcon />
                      </div>
                    )}
                    {product.stockCount != null && product.stockCount > 0 && product.stockCount <= 5 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Only {product.stockCount} left!
                      </div>
                    )}
                    {product.stockCount === 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2.5 leading-snug">
                      {product.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black" style={{ color: brandColor }}>
                        {naira(Number(product.price))}
                      </p>
                      <span className="text-xs text-gray-300 group-hover:text-gray-500 transition-colors font-medium">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: brandColor }}>
                Our Story
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5">
                About {vendor.businessName}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-8">{bioText}</p>
              <div className="flex flex-wrap gap-3">
                {social.instagram && (
                  <a
                    href={`https://instagram.com/${social.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all"
                  >
                    <InstagramIcon /> Instagram
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={`https://x.com/${social.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all"
                  >
                    <TwitterIcon /> Twitter / X
                  </a>
                )}
                {social.website && (
                  <a
                    href={social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all"
                  >
                    Website ↗
                  </a>
                )}
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 text-sm font-medium text-green-700 hover:bg-green-50 transition-all"
                  >
                    <WhatsAppIcon className="text-green-500" /> WhatsApp
                  </a>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <TruckIcon />, title: "Fast Dispatch", desc: "Orders processed and shipped quickly" },
                { icon: <CheckCircleIcon />, title: "Quality Assured", desc: "Every product carefully selected" },
                { icon: <ShieldCheckIcon />, title: "Secure Payment", desc: "Protected by Paystack technology" },
                { icon: <ChatBubbleIcon />, title: "Always Available", desc: "Reach us anytime on WhatsApp" },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl p-5 border border-gray-100 hover:border-gray-200 transition-colors"
                  style={{ backgroundColor: `${brandColor}06` }}
                >
                  <div className="mb-3" style={{ color: brandColor }}>{icon}</div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA Band ── */}
      {waLink && (
        <section className="py-16 sm:py-20" style={{ backgroundColor: brandColor }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white/20 flex items-center justify-center text-white">
              <ChatBubbleIcon />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Questions? Let&apos;s Talk</h2>
            <p className="text-white/75 mb-8 text-base">
              Message us on WhatsApp and we&apos;ll respond instantly.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-2xl transition-all hover:-translate-y-0.5"
              style={{ color: brandColor }}
            >
              <WhatsAppIcon />
              Open WhatsApp Chat
            </a>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
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
                {bioText?.slice(0, 90)}{bioText && bioText.length > 90 ? "…" : ""}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Shop</p>
              <ul className="space-y-2.5">
                <li><a href="#products" className="text-sm text-gray-400 hover:text-white transition-colors">All Products</a></li>
                <li><a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About Store</a></li>
                {waLink && (
                  <li>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                      WhatsApp Us
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Follow</p>
              <ul className="space-y-2.5">
                {social.instagram && (
                  <li>
                    <a href={`https://instagram.com/${social.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Instagram
                    </a>
                  </li>
                )}
                {social.twitter && (
                  <li>
                    <a href={`https://x.com/${social.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Twitter / X
                    </a>
                  </li>
                )}
                {social.website && (
                  <li>
                    <a href={social.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Website
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">StoreHub</p>
              <ul className="space-y-2.5">
                <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/marketplace" className="text-sm text-gray-400 hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} {vendor.businessName}. All rights reserved.</p>
            <p className="text-xs text-gray-600">
              Powered by{" "}
              <Link href="/" className="font-semibold hover:text-white transition-colors" style={{ color: brandColor }}>
                StoreHub
              </Link>
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
