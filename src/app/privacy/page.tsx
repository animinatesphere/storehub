import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClientFlow",
  description: "ClientFlow Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = "1 July 2026";

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-600">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              ClientFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the ClientFlow platform, which allows sellers (&quot;Vendors&quot;) to create online storefronts and accept payments from buyers. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="mt-3">
              By using ClientFlow, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="font-semibold text-gray-800 mb-2">Information you provide directly:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account registration information (name, email address, password)</li>
              <li>Business information (business name, description, category)</li>
              <li>Product information (titles, descriptions, prices, images)</li>
              <li>Storefront settings (logo, brand colors, social media links)</li>
              <li>Bank account or payment information (processed by Paystack — we do not store card numbers)</li>
              <li>Communication records when you contact our support team</li>
            </ul>
            <p className="font-semibold text-gray-800 mb-2 mt-4">Information collected automatically:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Create and manage your ClientFlow account</li>
              <li>Display your storefront and products to buyers</li>
              <li>Process orders and facilitate payments through Paystack</li>
              <li>Send transactional emails (order confirmations, payment receipts)</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Detect fraud, abuse, and violations of our Terms of Service</li>
              <li>Improve our platform through analytics</li>
              <li>Send product updates and marketing communications (you may opt out at any time)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">4. Sharing Your Information</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Paystack:</strong> Our payment processor. Paystack has its own privacy policy and handles payment data in accordance with PCI DSS standards.</li>
              <li><strong>Neon Database:</strong> Our database infrastructure provider, operating under strict data processing agreements.</li>
              <li><strong>Buyers:</strong> When a buyer places an order, their name, delivery address, and contact information are shared with the vendor to fulfil the order.</li>
              <li><strong>Legal requirements:</strong> We may disclose information when required by law or to protect the rights and safety of our users and the public.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">5. Data Retention</h2>
            <p>
              We retain your account information for as long as your account is active, or as necessary to provide you with our services. You may request deletion of your account and associated data at any time by contacting us at{" "}
              <a href="mailto:privacy@ClientFlow.ng" className="text-emerald-600 hover:underline">privacy@ClientFlow.ng</a>. We may retain certain information as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">6. Security</h2>
            <p>
              We implement industry-standard security measures including encrypted connections (HTTPS), hashed passwords, and secure infrastructure. However, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your ClientFlow account.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">8. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to maintain your session, remember preferences, and analyse usage patterns. You can control cookie settings through your browser, though disabling cookies may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our platform. Your continued use of ClientFlow after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p>
              For privacy-related questions or requests, please contact us at:{" "}
              <a href="mailto:privacy@ClientFlow.ng" className="text-emerald-600 hover:underline">privacy@ClientFlow.ng</a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} ClientFlow. All rights reserved.</p>
          <nav className="flex gap-6 text-xs text-gray-400">
            <Link href="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
