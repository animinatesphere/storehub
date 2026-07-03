import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ClientFlow — Nigeria's Seller Platform",
  description: "ClientFlow helps anyone in Nigeria sell online in minutes. Build a storefront, share a link, and accept payments — no coding needed.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#10b981" />
              <path d="M13 15.5V13a5 5 0 0 1 10 0v2.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <rect x="8" y="15.5" width="20" height="13" rx="3" fill="white" fillOpacity="0.9" />
              <circle cx="18" cy="22" r="2.5" fill="#10b981" />
            </svg>
            <span className="font-bold text-gray-900">Store<span className="text-emerald-500">Hub</span></span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-emerald-950 text-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">About ClientFlow</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Built for Nigerian sellers
          </h1>
          <p className="text-lg text-emerald-100/70 leading-relaxed">
            ClientFlow gives every Nigerian business owner a professional online presence — without needing a developer, a website, or a big budget.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nigeria has millions of talented entrepreneurs selling on Instagram DMs, WhatsApp messages, and Facebook groups — yet they lack the tools that properly represent their businesses online.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                ClientFlow changes that. In minutes, any seller can have a professional storefront with a unique link, beautiful product pages, and Paystack-powered checkout. No coding. No expensive agencies. Just a link you&apos;re proud to share.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe commerce should be accessible. Whether you sell fashion, food, electronics, handmade goods, or services — ClientFlow is the platform that grows with your business.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Simple to start",
                  desc: "Sign up, add your products, customise your storefront, and share your link — all in under 10 minutes.",
                },
                {
                  title: "Built for Nigeria",
                  desc: "Naira pricing, Paystack checkout, WhatsApp sharing — designed around how Nigerian commerce actually works.",
                },
                {
                  title: "Grow on your own terms",
                  desc: "From free starter plans to fully featured Pro stores. Pay only for what you need, scale when you&apos;re ready.",
                },
                {
                  title: "Always improving",
                  desc: "We listen to sellers and constantly ship new features based on what Nigerian businesses actually need.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-50 py-16 border-y border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: "10,000+", label: "Active Sellers" },
              { num: "₦2B+", label: "GMV Processed" },
              { num: "36 States", label: "Nationwide Reach" },
              { num: "4.9/5", label: "Seller Rating" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">{num}</p>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">What we believe in</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Accessibility",
                desc: "Great tools shouldn&apos;t cost a fortune. Our free tier lets any seller get started without spending a naira.",
              },
              {
                title: "Transparency",
                desc: "No hidden fees, no surprise charges. We take a small percentage only on successful sales. Your success is our success.",
              },
              {
                title: "Community",
                desc: "We&apos;re building more than software — we&apos;re building a community of Nigerian entrepreneurs who support each other.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-200">
                <div className="w-8 h-1 bg-emerald-500 rounded-full mb-4" />
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Ready to start selling?
          </h2>
          <p className="text-emerald-100 mb-8">
            Join thousands of Nigerian sellers already using ClientFlow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3.5 rounded-full bg-white text-emerald-700 font-bold text-sm hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Create Free Store
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} ClientFlow. All rights reserved.</p>
          <nav className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
            <Link href="/marketplace" className="hover:text-gray-700 transition-colors">Marketplace</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
