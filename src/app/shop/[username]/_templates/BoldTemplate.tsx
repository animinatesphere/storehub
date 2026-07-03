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

export default function BoldTemplate({ vendor, username }: TemplateProps) {
  const settings   = vendor.storefrontSetting;
  const brandColor = settings?.brandColor ?? "#6366f1";
  const logoUrl    = settings?.logoUrl;
  const bioText    = settings?.bioText ?? `${vendor.businessName} — Premium products, exceptional quality. We deliver excellence in every order.`;
  const social     = (settings?.socialLinks ?? {}) as SocialLinks;
  const products   = vendor.products;
  const waLink     = social.whatsapp ? `https://wa.me/${social.whatsapp.replace(/\D/g, "")}` : null;

  const isLight = (() => {
    const hex = brandColor.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 160;
  })();
  const textOnBrand = isLight ? "#111" : "#fff";

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* ── Fixed Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={vendor.businessName} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                  style={{ backgroundColor: brandColor, color: textOnBrand }}
                >
                  {initials(vendor.businessName)}
                </div>
              )}
              <span className="font-black text-white uppercase tracking-wider text-sm">
                {vendor.businessName}
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                Products
              </a>
              <a href="#story" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                Our Story
              </a>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all"
                  style={{ backgroundColor: brandColor, color: textOnBrand }}
                >
                  <WhatsAppIcon />
                  Chat
                </a>
              )}
            </nav>

            <div className="flex md:hidden items-center gap-2">
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-full"
                  style={{ backgroundColor: brandColor, color: textOnBrand }}
                >
                  <WhatsAppIcon />
                </a>
              )}
              <Link href="/marketplace" className="text-xs text-white/40 hover:text-white px-3 py-2 uppercase tracking-widest font-bold">
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-16 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${brandColor} 0%, transparent 70%)`,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${brandColor}40 1px, transparent 1px), linear-gradient(90deg, ${brandColor}40 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={vendor.businessName}
              className="w-20 h-20 rounded-2xl object-cover mx-auto mb-8"
              style={{ boxShadow: `0 0 60px ${brandColor}60`, outline: `2px solid ${brandColor}`, outlineOffset: "2px" }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center text-2xl font-black"
              style={{ backgroundColor: brandColor, color: textOnBrand, boxShadow: `0 0 60px ${brandColor}60` }}
            >
              {initials(vendor.businessName)}
            </div>
          )}

          <div
            className="inline-block text-xs font-black uppercase tracking-[0.3em] mb-6 px-4 py-1.5 rounded-full border"
            style={{ borderColor: `${brandColor}60`, color: brandColor }}
          >
            Official Store
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6 leading-none">
            {vendor.businessName}
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            {bioText}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#products"
              className="px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: brandColor, color: textOnBrand, boxShadow: `0 0 40px ${brandColor}50` }}
            >
              Shop the Collection
            </a>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-white/20">
              <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
              <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${brandColor}80, transparent)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee Strip ── */}
      <div className="py-4 border-y border-white/10 overflow-hidden" style={{ backgroundColor: brandColor }}>
        <div className="flex gap-8 whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-xs font-black uppercase tracking-widest shrink-0" style={{ color: textOnBrand }}>
              <span>Free Delivery</span>
              <span className="opacity-50">✦</span>
              <span>Secure Payment</span>
              <span className="opacity-50">✦</span>
              <span>Quality Guaranteed</span>
              <span className="opacity-50">✦</span>
              <span>WhatsApp Support</span>
              <span className="opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Products ── */}
      <section id="products" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-xs font-black uppercase tracking-[0.3em] mb-3"
                style={{ color: brandColor }}
              >
                The Collection
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                All Products
              </h2>
            </div>
            <p className="text-sm text-white/30 font-bold">{products.length} items</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-32 border border-white/10 rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-white/10 flex items-center justify-center text-white/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
              </div>
              <p className="text-lg font-black uppercase tracking-widest text-white/50">Coming Soon</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${username}/${product.id}`}
                  className="group block bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "0 0 0 0 transparent" }}
                >
                  <div className="aspect-square relative overflow-hidden bg-neutral-800">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                        </svg>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ background: `linear-gradient(to top, ${brandColor}, transparent)` }}
                    />
                    {product.stockCount != null && product.stockCount > 0 && product.stockCount <= 5 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        Last {product.stockCount}
                      </div>
                    )}
                    {product.stockCount === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white/60 text-xs font-black uppercase tracking-widest">Sold Out</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-white/80 line-clamp-2 mb-3 leading-snug group-hover:text-white transition-colors">
                      {product.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black" style={{ color: brandColor }}>
                        {naira(Number(product.price))}
                      </p>
                      <span
                        className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: brandColor }}
                      >
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

      {/* ── Brand Story ── */}
      <section id="story" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs font-black uppercase tracking-[0.3em] mb-4"
                style={{ color: brandColor }}
              >
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-6">
                About {vendor.businessName}
              </h2>
              <p className="text-white/50 leading-relaxed text-base mb-8">{bioText}</p>
              <div className="flex flex-wrap gap-3">
                {social.instagram && (
                  <a
                    href={`https://instagram.com/${social.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:border-white/30 transition-all"
                  >
                    <InstagramIcon /> Instagram
                  </a>
                )}
                {social.website && (
                  <a
                    href={social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:border-white/30 transition-all"
                  >
                    Website ↗
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "24h", label: "Response Time" },
                { num: "100%", label: "Quality Checked" },
                { num: "Safe", label: "Secure Checkout" },
                { num: "Fast", label: "Fast Delivery" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="rounded-2xl p-6 text-center border border-white/5 bg-white/5"
                >
                  <p className="text-2xl font-black mb-2" style={{ color: brandColor }}>
                    {num}
                  </p>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      {waLink && (
        <section
          className="py-16 sm:py-20 relative overflow-hidden"
          style={{ backgroundColor: brandColor }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${textOnBrand}40 1px, transparent 1px), linear-gradient(90deg, ${textOnBrand}40 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4"
              style={{ color: textOnBrand }}
            >
              Ready to Order?
            </h2>
            <p className="mb-8 opacity-70 text-base" style={{ color: textOnBrand }}>
              Message us directly and we&apos;ll help you place your order instantly.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest border-2 transition-all hover:scale-105"
              style={{ borderColor: textOnBrand, color: textOnBrand }}
            >
              <WhatsAppIcon />
              Open WhatsApp
            </a>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-black border-t border-white/5 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-white/5">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
                    style={{ backgroundColor: brandColor, color: textOnBrand }}
                  >
                    {initials(vendor.businessName)}
                  </div>
                )}
                <span className="font-black text-sm uppercase tracking-wider text-white">{vendor.businessName}</span>
              </div>
              <p className="text-xs text-white/25 leading-relaxed">
                {bioText?.slice(0, 90)}{bioText && bioText.length > 90 ? "…" : ""}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Shop</p>
              <ul className="space-y-2.5">
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">Products</a></li>
                <li><a href="#story" className="text-sm text-white/40 hover:text-white transition-colors">Our Story</a></li>
                {waLink && <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">WhatsApp</a></li>}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Follow</p>
              <ul className="space-y-2.5">
                {social.instagram && <li><a href={`https://instagram.com/${social.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">Instagram</a></li>}
                {social.twitter   && <li><a href={`https://x.com/${social.twitter.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">Twitter / X</a></li>}
                {social.website   && <li><a href={social.website} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">Website</a></li>}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">ClientFlow</p>
              <ul className="space-y-2.5">
                <li><Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/marketplace" className="text-sm text-white/40 hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/about" className="text-sm text-white/40 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-white/40 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/contact" className="text-sm text-white/40 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <p className="text-xs text-white/15">© {new Date().getFullYear()} {vendor.businessName}. All rights reserved.</p>
            <p className="text-xs text-white/15">
              Powered by{" "}
              <Link href="/" className="font-bold transition-colors hover:text-white" style={{ color: brandColor }}>
                ClientFlow
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Float ── */}
      {waLink && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25d366] hover:bg-[#20b558] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:shadow-[0_0_40px_#25d36660] transition-all hover:-translate-y-0.5"
        >
          <WhatsAppIcon />
          <span className="text-sm font-bold hidden sm:block">Chat Us</span>
        </a>
      )}
    </div>
  );
}
