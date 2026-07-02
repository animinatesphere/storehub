import Image from "next/image";
import Link from "next/link";
import LaunchVideoWrapper from "@/components/LaunchVideoWrapper";

function Check({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? "text-emerald-400" : "text-emerald-500"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ── Confirmed Unsplash CDN URLs ─────────────────────────────────────────────
const HERO_IMG =
  "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=900&auto=format&fit=crop&q=80";
const SELLER_IMG =
  "https://images.unsplash.com/photo-1602342323893-b11f757957c9?w=700&auto=format&fit=crop&q=80";
const PAYMENT_IMG =
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80";

// ── Confirmed Pexels HD video (woman doing online shopping) ─────────────────
const DEMO_VIDEO =
  "https://videos.pexels.com/video-files/6238179/6238179-hd_1920_1080_25fps.mp4";

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-slate-900">ClientFlow</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#categories" className="hover:text-slate-900 transition-colors">What you can sell</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <Link href="/marketplace" className="hover:text-slate-900 transition-colors">Marketplace</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">
              Sign in
            </Link>
            <Link
              href="/signup?role=vendor"
              className="text-sm bg-slate-900 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-slate-700 transition-colors"
            >
              Start selling free
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text + CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Built for Nigerian sellers. Payments via Paystack.
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight">
              Your store.<br />Your link.<br />Your money.
            </h1>

            <p className="mt-6 text-xl text-slate-500 leading-relaxed">
              Build a beautiful online store in minutes — no website skills needed.
              Share one link on WhatsApp or Instagram and let customers buy directly from you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup?role=vendor"
                className="bg-slate-900 text-white px-7 py-4 rounded-xl text-base font-medium hover:bg-slate-700 transition-colors text-center"
              >
                Create my free store
              </Link>
              <Link
                href="/marketplace"
                className="border border-slate-200 text-slate-700 px-7 py-4 rounded-xl text-base font-medium hover:bg-slate-50 transition-colors text-center"
              >
                Browse the marketplace
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">Free forever on the starter plan. No credit card required.</p>
          </div>

          {/* Right: real photo + floating notification cards */}
          <div className="relative h-[520px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={HERO_IMG}
              alt="Nigerian seller smiling, ready to grow her business online"
              fill
              unoptimized
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Floating: payment confirmed notification */}
            <div className="absolute bottom-20 left-5 right-5 sm:left-8 sm:right-auto sm:w-72 bg-white rounded-xl p-4 shadow-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Payment confirmed</p>
                  <p className="text-xs text-slate-500">Tunde just paid ₦12,500 for 2 items</p>
                </div>
              </div>
            </div>

            {/* Floating: daily earnings */}
            <div className="absolute top-6 right-5 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-slate-100">
              <p className="text-xs text-slate-400">Today&apos;s earnings</p>
              <p className="text-base font-bold text-slate-900">₦48,200</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAUNCH VIDEO (Remotion) ── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">ClientFlow Preview</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">See what we&apos;re building</h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <LaunchVideoWrapper />
        </div>
      </section>

      {/* ── VIDEO DEMO ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900" style={{ aspectRatio: "16/7" }}>
          {/* Pexels stock video — woman doing online shopping */}
          <video
            src={DEMO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          {/* Centre overlay text */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 py-14">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">The platform</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
              Thousands of sellers.<br />One platform.
            </h2>
            <p className="mt-5 text-base text-white/60 max-w-xl">
              Manage products, track orders, and accept Paystack payments — all from one simple dashboard
              your customers will never see.
            </p>
          </div>

          {/* Stats strip pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border-t border-white/10">
              {[
                { value: "₦0", label: "to get started" },
                { value: "5 min", label: "to go live" },
                { value: "Paystack", label: "secure checkout" },
                { value: "1 link", label: "to share everywhere" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center py-5 px-3">
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="text-xs text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Up and running in minutes</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              Built for people who want to sell online but don&apos;t want a complicated website setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Sign up and pick your category",
                body: "Create an account in under a minute. Tell us what you sell — physical goods, digital products, real estate, services, or more. Each category gets its own purpose-built storefront design.",
                visual: (
                  <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
                    {["Physical goods", "Digital products", "Services"].map((cat, i) => (
                      <div key={cat} className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${i === 0 ? "border-slate-800 bg-white font-medium" : "border-slate-100 text-slate-400"}`}>
                        <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? "border-slate-800 bg-slate-800" : "border-slate-200"}`} />
                        {cat}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                step: "02",
                title: "Customise and add your products",
                body: "Upload your logo, set your brand color, write your bio, and add your products or listings. Every change is live instantly. No developer needed.",
                visual: (
                  <div className="bg-slate-50 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-300" />
                      <div>
                        <div className="text-sm font-semibold text-slate-800">Ada Styles</div>
                        <div className="text-xs text-slate-400">ClientFlow.ng/shop/ada-styles</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`rounded-lg aspect-square ${["bg-slate-300", "bg-slate-200", "bg-slate-300"][i]}`} />
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                step: "03",
                title: "Share your link and get paid",
                body: "Your store lives at ClientFlow.ng/shop/yourname. Share it on WhatsApp, Instagram, TikTok. Customers pay via Paystack — money goes straight to your account.",
                visual: (
                  <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                      <p className="text-xs font-medium text-emerald-700">New order received</p>
                      <p className="text-xs text-emerald-600 mt-1">Tunde paid ₦12,500 for 2 items</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-xs text-slate-600">Today&apos;s earnings</span>
                      <span className="text-sm font-bold text-slate-900">₦48,200</span>
                    </div>
                  </div>
                ),
              },
            ].map(({ step, title, body, visual }) => (
              <div key={step} className="bg-white border border-slate-100 rounded-2xl p-8">
                {visual}
                <div className="text-xs font-mono font-bold text-slate-300 mb-3 tracking-widest">{step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR SELLERS VS CUSTOMERS ── */}
      <section className="bg-slate-50 py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Sellers — dark panel with real photo background */}
          <div className="relative bg-slate-900 text-white rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={SELLER_IMG}
                alt="Nigerian seller managing her online business"
                fill
                unoptimized
                className="object-cover object-top opacity-20"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/95" />
            </div>
            <div className="relative z-10 p-10">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">For sellers</p>
              <h2 className="text-3xl font-bold leading-snug mb-6">
                Everything you need to run your business online
              </h2>
              <ul className="space-y-4">
                {[
                  "Your own storefront at ClientFlow.ng/shop/you",
                  "Paystack checkout — card, bank transfer, or USSD",
                  "Automatic payment splitting — platform fee handled, rest goes to you",
                  "Real-time order notifications when a customer buys",
                  "Add, edit, or hide products at any time",
                  "Custom domains, analytics, and auto-posting on higher plans",
                  "WhatsApp button so customers can message you directly",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check dark />
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?role=vendor"
                className="mt-8 inline-block bg-white text-slate-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Start selling free
              </Link>
            </div>
          </div>

          {/* Customers */}
          <div className="bg-white border border-slate-100 rounded-2xl p-10">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">For customers</p>
            <h2 className="text-3xl font-bold text-slate-900 leading-snug mb-6">
              Shop from verified Nigerian sellers, all in one place
            </h2>
            <ul className="space-y-4">
              {[
                "Browse thousands of products across every category",
                "Discover independent Nigerian sellers and their unique offerings",
                "Secure checkout via Paystack — the payment method you already trust",
                "Track your orders from payment to delivery in one place",
                "Visit seller storefronts directly from their WhatsApp links",
                "Leave reviews and build a purchase history across all orders",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-8 inline-block border border-slate-200 text-slate-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Create a free account
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Built for every type of seller</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              Each category gets a storefront designed specifically for what you&apos;re selling —
              not a generic template that sort of works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                label: "Physical goods",
                examples: "Shoes, clothes, accessories, electronics, food, books",
                features: ["Product grid with photos", "Sizes and variants", "Stock tracking", "Cart and checkout"],
                accent: "bg-slate-200",
              },
              {
                label: "Digital products",
                examples: "Ebooks, courses, templates, music, software",
                features: ["Instant delivery after payment", "No shipping required", "Download links auto-sent", "License management"],
                accent: "bg-blue-200",
              },
              {
                label: "Real estate",
                examples: "Houses, apartments, commercial property, land for sale or rent",
                features: ["Photo galleries per listing", "Location and price tags", "Enquiry form for leads", "WhatsApp contact button"],
                accent: "bg-amber-200",
              },
              {
                label: "Services",
                examples: "Tutors, freelancers, photographers, hair stylists, consultants",
                features: ["Service menu with pricing", "Booking or enquiry form", "Portfolio photos", "No physical cart needed"],
                accent: "bg-violet-200",
              },
              {
                label: "Authors and creators",
                examples: "Writers, musicians, artists, podcasters, YouTubers",
                features: ["Bio-forward showcase layout", "Buy or follow links", "Multiple product types", "Social link integrations"],
                accent: "bg-rose-200",
              },
              {
                label: "Portfolio and general",
                examples: "Anyone who needs a personal online presence with a shareable link",
                features: ["Flexible bio-link page", "Any mix of content", "Custom colors and logo", "Works like a mini-website"],
                accent: "bg-emerald-200",
              },
            ].map(({ label, examples, features, accent }) => (
              <div key={label} className="border border-slate-100 rounded-2xl p-7 hover:border-slate-300 transition-colors">
                <div className={`w-10 h-10 rounded-xl ${accent} mb-5`} />
                <h3 className="text-base font-semibold text-slate-900 mb-1">{label}</h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">{examples}</p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAYMENT SECTION ── */}
      <section className="bg-slate-50 py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">Payments</p>
            <h2 className="text-4xl font-bold text-slate-900 leading-snug mb-6">
              Powered by Paystack. Money in your account automatically.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Every ClientFlow store uses Paystack — Nigeria&apos;s most trusted payment processor — for checkout.
              When a customer pays, the platform fee is deducted automatically and the rest lands directly in
              your Paystack account. No waiting. No manual transfers.
            </p>
            <ul className="space-y-4">
              {[
                "Card payments — Visa, Mastercard, Verve",
                "Bank transfer — works for every bank in Nigeria",
                "USSD — no internet required for your customer",
                "Automatic payment splitting — we take our cut, you get the rest",
                "Real-time order notifications when payment clears",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Real photo + checkout UI */}
          <div className="space-y-4">
            <div className="relative h-52 rounded-xl overflow-hidden">
              <Image
                src={PAYMENT_IMG}
                alt="Person completing a secure online payment with credit card"
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white text-slate-900 text-xs font-medium px-3 py-1.5 rounded-full shadow">
                  Secured by Paystack
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
                <span className="text-white text-sm font-medium">Checkout</span>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-slate-600" />)}
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Ankara dress (size M)</span>
                  <span className="text-sm font-medium text-slate-900">₦15,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Delivery</span>
                  <span className="text-sm font-medium text-slate-900">₦1,500</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-900">Total</span>
                  <span className="text-base font-bold text-slate-900">₦16,500</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Card", "Transfer", "USSD"].map((method, i) => (
                    <button key={method} className={`text-xs py-2.5 rounded-lg border font-medium ${i === 0 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-500"}`}>
                      {method}
                    </button>
                  ))}
                </div>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium">
                  Pay ₦16,500
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Start free. Grow when you&apos;re ready.</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              Every plan includes Paystack checkout, your own storefront link, and order management.
              Upgrade only when you need more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                tier: "Free",
                price: "₦0",
                period: "forever",
                description: "Perfect for trying ClientFlow or selling just a few products.",
                products: "Up to 5 products",
                highlight: false,
                features: ["1 storefront", "Paystack checkout", "Basic product grid", "Order notifications", "ClientFlow branding shown"],
                cta: "Get started free",
              },
              {
                tier: "Starter",
                price: "₦3,000",
                period: "per month",
                description: "For sellers who are actively growing and need more room.",
                products: "Up to 30 products",
                highlight: false,
                features: ["Everything in Free", "Remove ClientFlow branding", "Custom colors and logo", "Basic sales analytics", "WhatsApp button"],
                cta: "Start Starter",
              },
              {
                tier: "Pro",
                price: "₦8,000",
                period: "per month",
                description: "For serious sellers who want full control and visibility.",
                products: "Unlimited products",
                highlight: true,
                features: ["Everything in Starter", "All storefront templates", "Custom domain support", "Full analytics dashboard", "Social media auto-posting", "Email order notifications"],
                cta: "Go Pro",
              },
              {
                tier: "Business",
                price: "₦20,000",
                period: "per month",
                description: "For established businesses with a team and high volume.",
                products: "Unlimited + staff accounts",
                highlight: false,
                features: ["Everything in Pro", "Multiple staff logins", "Bulk CSV product upload", "API access", "Abandoned cart reminders", "Priority support"],
                cta: "Go Business",
              },
            ].map(({ tier, price, period, description, products, highlight, features, cta }) => (
              <div
                key={tier}
                className={`rounded-2xl p-7 flex flex-col border ${highlight ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100"}`}
              >
                <div className="mb-6">
                  {highlight && (
                    <div className="inline-block text-xs font-medium bg-emerald-500 text-white px-2.5 py-1 rounded-full mb-3">Most popular</div>
                  )}
                  <p className="text-xs font-medium uppercase tracking-widest mb-2 text-slate-400">{tier}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${highlight ? "text-white" : "text-slate-900"}`}>{price}</span>
                    <span className="text-xs text-slate-400">/{period}</span>
                  </div>
                  <p className={`text-sm mt-3 leading-relaxed ${highlight ? "text-slate-400" : "text-slate-500"}`}>{description}</p>
                  <p className={`text-xs font-medium mt-3 ${highlight ? "text-emerald-400" : "text-emerald-600"}`}>{products}</p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check dark={highlight} />
                      <span className={`text-xs leading-relaxed ${highlight ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup?role=vendor"
                  className={`text-center text-sm font-medium px-5 py-3 rounded-xl transition-colors ${highlight ? "bg-white text-slate-900 hover:bg-slate-100" : "border border-slate-200 text-slate-900 hover:bg-slate-50"}`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Common questions</h2>
          <div className="space-y-8">
            {[
              {
                q: "Do I need a website or any technical skills?",
                a: "None at all. If you can fill in a form and upload a photo, you can build a ClientFlow store. We handle hosting, security, payments, and everything technical for you.",
              },
              {
                q: "How do I receive money from sales?",
                a: "Through Paystack. When you set up your store, you connect your Paystack account (or we help you create one). Every time a customer pays, the money is split automatically — our platform fee is deducted and the rest lands in your Paystack account immediately.",
              },
              {
                q: "What happens when a customer visits my link?",
                a: "They see your store — your branding, your products, your prices. They can browse, add to cart, and pay via Paystack without ever leaving your storefront. It feels like they are shopping on your own website.",
              },
              {
                q: "Can I use my own domain name?",
                a: "Yes, on the Pro plan and above. Instead of ClientFlow.ng/shop/yourname, you can use yourbrand.com. We walk you through pointing your domain to ClientFlow — no technical setup required.",
              },
              {
                q: "What is the marketplace?",
                a: "ClientFlow also has a combined marketplace at ClientFlow.ng/marketplace where customers can browse products from all sellers at once. Your products automatically appear there alongside your own storefront.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes, any time. Your store and products are never deleted when you change plans. If you downgrade past a feature limit, we will let you know what needs adjusting before the change takes effect.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 pb-8">
                <h3 className="text-base font-semibold text-slate-900 mb-3">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-5 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
            Your store is one link away
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            Nigerian sellers are already using ClientFlow to reach customers on WhatsApp,
            Instagram, and beyond. Join them — it takes less than five minutes to go live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=vendor" className="bg-slate-900 text-white px-10 py-4 rounded-xl text-base font-medium hover:bg-slate-700 transition-colors">
              Create my free store
            </Link>
            <Link href="/marketplace" className="border border-slate-200 text-slate-700 px-10 py-4 rounded-xl text-base font-medium hover:bg-slate-50 transition-colors">
              Browse the marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div className="max-w-xs">
              <p className="text-lg font-bold text-slate-900 mb-2">ClientFlow</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                The simplest way for Nigerian sellers to build an online store, share a link, and get paid.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
              <div>
                <p className="font-medium text-slate-700 mb-3">Platform</p>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/marketplace" className="hover:text-slate-700 transition-colors">Marketplace</Link></li>
                  <li><Link href="/signup?role=vendor" className="hover:text-slate-700 transition-colors">Start selling</Link></li>
                  <li><a href="#pricing" className="hover:text-slate-700 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-slate-700 mb-3">Account</p>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/login" className="hover:text-slate-700 transition-colors">Sign in</Link></li>
                  <li><Link href="/signup" className="hover:text-slate-700 transition-colors">Create account</Link></li>
                  <li><Link href="/dashboard" className="hover:text-slate-700 transition-colors">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-slate-700 mb-3">Company</p>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/about" className="hover:text-slate-700 transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-slate-700 transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy policy</Link></li>
                  <li><Link href="/terms" className="hover:text-slate-700 transition-colors">Terms of service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} ClientFlow. All rights reserved.</p>
            <p className="text-xs text-slate-400">Payments powered by Paystack</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
