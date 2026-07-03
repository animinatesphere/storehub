import Link from "next/link";
import type { TemplateProps, SocialLinks } from "./types";
import { naira, initials } from "./types";

const CREAM  = "#faf8f5";
const BROWN  = "#3c1f08";
const WARM   = "#9a7d5a";
const HONEY  = "#d97706";

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

export default function WarmTemplate({ vendor, username }: TemplateProps) {
  const settings   = vendor.storefrontSetting;
  const brandColor = settings?.brandColor ?? HONEY;
  const logoUrl    = settings?.logoUrl;
  const bioText    = settings?.bioText ?? `Handcrafted with love and care. ${vendor.businessName} brings you quality products made to last.`;
  const social     = (settings?.socialLinks ?? {}) as SocialLinks;
  const products   = vendor.products;
  const waLink     = social.whatsapp ? `https://wa.me/${social.whatsapp.replace(/\D/g, "")}` : null;
  const featured   = products.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM, fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* ── Sticky Header ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: `${CREAM}f0`, borderColor: `${WARM}30` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={vendor.businessName} className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${WARM}50` }} />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: brandColor }}
                >
                  {initials(vendor.businessName)}
                </div>
              )}
              <span className="text-lg font-bold italic" style={{ color: BROWN }}>{vendor.businessName}</span>
            </a>

            <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: "system-ui, sans-serif" }}>
              <a href="#collection" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: BROWN }}>
                Collection
              </a>
              <a href="#story" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: BROWN }}>
                Our Story
              </a>
              {social.instagram && (
                <a
                  href={`https://instagram.com/${social.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ color: WARM }}
                >
                  <InstagramIcon />
                </a>
              )}
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90"
                  style={{ backgroundColor: brandColor }}
                >
                  <WhatsAppIcon />
                  Chat
                </a>
              )}
            </nav>

            <div className="flex md:hidden items-center gap-2" style={{ fontFamily: "system-ui, sans-serif" }}>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-white px-3.5 py-2 rounded-full"
                  style={{ backgroundColor: brandColor }}
                >
                  <WhatsAppIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-32"
        style={{ background: `linear-gradient(160deg, ${CREAM} 0%, #f0e8dc 50%, ${CREAM} 100%)` }}
      >
        {/* Decorative abstract shape */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-8 -translate-y-20 translate-x-20 pointer-events-none"
          style={{ backgroundColor: brandColor, borderRadius: "40% 60% 70% 30% / 30% 40% 60% 70%", filter: "blur(60px)" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={vendor.businessName}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-6 shadow-xl"
              style={{ border: `4px solid ${WARM}50` }}
            />
          ) : (
            <div
              className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-xl"
              style={{ backgroundColor: brandColor, border: `4px solid ${brandColor}40` }}
            >
              {initials(vendor.businessName)}
            </div>
          )}

          <p className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: WARM, fontFamily: "system-ui, sans-serif" }}>
            Handcrafted with love
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold italic mb-4 leading-tight" style={{ color: BROWN }}>
            {vendor.businessName}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: WARM }}>
            {bioText}
          </p>

          <div className="flex flex-wrap justify-center gap-4" style={{ fontFamily: "system-ui, sans-serif" }}>
            <a
              href="#collection"
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: brandColor }}
            >
              Explore Collection
            </a>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full text-sm font-semibold border transition-all flex items-center gap-2 hover:-translate-y-0.5"
                style={{ borderColor: `${WARM}50`, color: BROWN }}
              >
                <WhatsAppIcon className="text-green-600" />
                Chat with Us
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Featured (top 3 products) ── */}
      {featured.length > 0 && (
        <section className="py-14 sm:py-20" style={{ backgroundColor: "#f5ede2" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: WARM, fontFamily: "system-ui, sans-serif" }}>
                Handpicked
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold italic" style={{ color: BROWN }}>
                Featured Pieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featured.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/shop/${username}/${product.id}`}
                  className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: CREAM }}
                >
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${brandColor}15` }}>
                        <svg className="w-10 h-10" style={{ color: `${brandColor}50` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className="absolute bottom-0 inset-x-0 h-24"
                      style={{ background: `linear-gradient(to top, ${BROWN}80, transparent)` }}
                    />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white text-sm font-semibold line-clamp-1">{product.title}</p>
                      <p className="text-white/80 text-xs mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {naira(Number(product.price))}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Products ── */}
      <section id="collection" className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: WARM, fontFamily: "system-ui, sans-serif" }}>
              Our Collection
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold italic" style={{ color: BROWN }}>
              All Products
            </h2>
            <p className="mt-2 text-sm" style={{ color: WARM, fontFamily: "system-ui, sans-serif" }}>
              {products.length} item{products.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed rounded-3xl" style={{ borderColor: `${WARM}40` }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
              </div>
              <p className="text-lg font-bold italic" style={{ color: BROWN }}>Coming Soon</p>
              <p className="text-sm mt-1" style={{ color: WARM, fontFamily: "system-ui, sans-serif" }}>
                New products arriving shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${username}/${product.id}`}
                  className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: CREAM, border: `1px solid ${WARM}25` }}
                >
                  <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#f0e8dc" }}>
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${WARM}15` }}>
                        <svg className="w-8 h-8 opacity-20" style={{ color: BROWN }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                        </svg>
                      </div>
                    )}
                    {product.stockCount != null && product.stockCount > 0 && product.stockCount <= 5 && (
                      <div
                        className="absolute top-2 left-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: brandColor, fontFamily: "system-ui, sans-serif" }}
                      >
                        Almost Gone
                      </div>
                    )}
                    {product.stockCount === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${BROWN}40` }}>
                        <span
                          className="bg-white text-xs font-medium px-3 py-1 rounded-full"
                          style={{ color: BROWN, fontFamily: "system-ui, sans-serif" }}
                        >
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold line-clamp-2 mb-2 leading-snug" style={{ color: BROWN }}>
                      {product.title}
                    </p>
                    <div className="flex items-center justify-between" style={{ fontFamily: "system-ui, sans-serif" }}>
                      <p className="text-sm font-bold" style={{ color: brandColor }}>
                        {naira(Number(product.price))}
                      </p>
                      <span className="text-xs opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: WARM }}>
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

      {/* ── Our Story ── */}
      <section id="story" className="py-14 sm:py-20" style={{ backgroundColor: "#f5ede2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: WARM, fontFamily: "system-ui, sans-serif" }}>
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold italic mb-6" style={{ color: BROWN }}>
                Made with Passion
              </h2>
              <p className="leading-relaxed mb-6 text-base" style={{ color: WARM }}>
                {bioText}
              </p>
              <p className="leading-relaxed text-sm" style={{ color: WARM }}>
                Every product we make is crafted with attention to detail and a commitment to quality. We believe in slow,
                intentional craftsmanship that stands the test of time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                {social.instagram && (
                  <a
                    href={`https://instagram.com/${social.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                    style={{ borderColor: `${WARM}50`, color: BROWN }}
                  >
                    <InstagramIcon /> Follow on Instagram
                  </a>
                )}
                {social.website && (
                  <a
                    href={social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                    style={{ borderColor: `${WARM}50`, color: BROWN }}
                  >
                    Visit Website ↗
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                {[
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>,
                    title: "Natural Materials",
                    desc: "Ethically sourced",
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
                    title: "Handcrafted",
                    desc: "Made with care",
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
                    title: "Secure Pay",
                    desc: "Paystack protected",
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
                    title: "Safe Delivery",
                    desc: "Carefully packed",
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 rounded-2xl text-center"
                    style={{ backgroundColor: CREAM, border: `1px solid ${WARM}25` }}
                  >
                    <div className="flex justify-center mb-2" style={{ color: brandColor }}>{icon}</div>
                    <p className="text-xs font-bold" style={{ color: BROWN }}>{title}</p>
                    <p className="text-xs mt-0.5" style={{ color: WARM }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: BROWN }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-white/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold italic text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-white/60 mb-8 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
            Follow us on WhatsApp or Instagram for new arrivals and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center" style={{ fontFamily: "system-ui, sans-serif" }}>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-white bg-[#25d366] hover:bg-[#20b558] transition-all"
              >
                <WhatsAppIcon />
                Follow on WhatsApp
              </a>
            )}
            {social.instagram && (
              <a
                href={`https://instagram.com/${social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                <InstagramIcon />
                Follow on Instagram
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-12 pb-8 border-t" style={{ backgroundColor: "#2a1604", borderColor: `${WARM}20` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b" style={{ borderColor: `${WARM}20` }}>
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: brandColor }}
                  >
                    {initials(vendor.businessName)}
                  </div>
                )}
                <span className="font-bold italic text-white text-sm">{vendor.businessName}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: `${WARM}80` }}>
                {bioText?.slice(0, 90)}{bioText && bioText.length > 90 ? "…" : ""}
              </p>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: `${WARM}60` }}>Shop</p>
              <ul className="space-y-2.5">
                <li><a href="#collection" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>All Products</a></li>
                <li><a href="#story" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Our Story</a></li>
                {waLink && <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>WhatsApp Us</a></li>}
              </ul>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: `${WARM}60` }}>Follow</p>
              <ul className="space-y-2.5">
                {social.instagram && <li><a href={`https://instagram.com/${social.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Instagram</a></li>}
                {social.twitter   && <li><a href={`https://x.com/${social.twitter.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Twitter / X</a></li>}
                {social.website   && <li><a href={social.website} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Website</a></li>}
              </ul>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: `${WARM}60` }}>ClientFlow</p>
              <ul className="space-y-2.5">
                <li><Link href="/" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Home</Link></li>
                <li><Link href="/marketplace" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Marketplace</Link></li>
                <li><Link href="/about" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>About</Link></li>
                <li><Link href="/privacy" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Privacy</Link></li>
                <li><Link href="/terms" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Terms</Link></li>
                <li><Link href="/contact" className="text-sm transition-colors hover:text-white" style={{ color: `${WARM}80` }}>Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ fontFamily: "system-ui, sans-serif" }}>
            <p className="text-xs" style={{ color: `${WARM}40` }}>© {new Date().getFullYear()} {vendor.businessName}. All rights reserved.</p>
            <p className="text-xs" style={{ color: `${WARM}40` }}>
              Powered by{" "}
              <Link href="/" className="font-semibold hover:text-white transition-colors" style={{ color: brandColor }}>
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
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25d366] hover:bg-[#20b558] text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <WhatsAppIcon />
          <span className="text-sm font-bold hidden sm:block">Chat Us</span>
        </a>
      )}
    </div>
  );
}
