import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — ClientFlow",
  description: "Get in touch with the ClientFlow team. We're here to help with your selling journey.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
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
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">← Home</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Contact</p>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5">Get in Touch</h1>
            <p className="text-gray-500 leading-relaxed mb-10">
              We&apos;re here to help you grow your business. Whether you have a question about your account, need technical support, or want to explore partnership opportunities — reach out and we&apos;ll get back to you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Email Support</p>
                  <a href="mailto:support@ClientFlow.ng" className="text-sm text-emerald-600 hover:underline">support@ClientFlow.ng</a>
                  <p className="text-xs text-gray-400 mt-0.5">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">WhatsApp Support</p>
                  <a
                    href="https://wa.me/2348000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">Mon – Fri, 9am – 6pm WAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Head Office</p>
                  <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                  <p className="text-xs text-gray-400 mt-0.5">Walk-ins by appointment only</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Quick Links</p>
              <div className="space-y-2">
                <Link href="/about" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">About ClientFlow →</Link>
                <Link href="/privacy" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy →</Link>
                <Link href="/terms" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms of Service →</Link>
                <Link href="/marketplace" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Browse Marketplace →</Link>
              </div>
            </div>
          </div>

          {/* Right: Contact form (static, for now) */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Send us a message</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">First Name</label>
                    <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-400">
                      Your first name
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Name</label>
                    <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-400">
                      Your last name
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-400">
                    your@email.com
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Subject</label>
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-400">
                    What&apos;s this about?
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Message</label>
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-400 min-h-[120px]">
                    Tell us how we can help...
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:support@ClientFlow.ng"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    Send via Email
                  </a>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Or use your preferred email client to send a message to{" "}
                    <a href="mailto:support@ClientFlow.ng" className="text-emerald-600 hover:underline">support@ClientFlow.ng</a>
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {[
                  {
                    q: "How do I get paid?",
                    a: "Payments go through Paystack and are settled directly to your bank account, typically within 1-3 business days.",
                  },
                  {
                    q: "Can I use my own domain?",
                    a: "Custom domains are available on Pro plans. Contact us to set one up for your storefront.",
                  },
                  {
                    q: "How do I delete my account?",
                    a: "Email us at support@ClientFlow.ng and we'll process your account deletion within 48 hours.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{q}</p>
                    <p className="text-sm text-gray-500">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} ClientFlow. All rights reserved.</p>
          <nav className="flex gap-6 text-xs text-gray-400">
            <Link href="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
