import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — StoreHub",
  description: "StoreHub Terms of Service. Read the terms and conditions governing your use of the StoreHub platform.",
};

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: 1 July 2026</p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-gray-600">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using StoreHub (&quot;the Platform&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, do not use the Platform. These Terms apply to all visitors, vendors, buyers, and others who access or use StoreHub.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              StoreHub provides a platform that enables individuals and businesses (&quot;Vendors&quot;) to create online storefronts, list products, and receive payments from customers (&quot;Buyers&quot;). StoreHub acts as a technology provider and marketplace, not as a party to transactions between Vendors and Buyers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">3. Account Registration</h2>
            <p>
              To use StoreHub as a Vendor, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorised use of your account</li>
            </ul>
            <p className="mt-3">
              You must be at least 18 years old to create a vendor account. By registering, you represent that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">4. Vendor Obligations</h2>
            <p>As a Vendor, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>List only products you have the legal right to sell</li>
              <li>Provide accurate product descriptions, pricing, and inventory information</li>
              <li>Fulfil orders in a timely and professional manner</li>
              <li>Respond to buyer inquiries within a reasonable time</li>
              <li>Comply with all applicable Nigerian laws, including consumer protection and tax regulations</li>
              <li>Not list counterfeit, stolen, prohibited, or illegal products</li>
              <li>Not engage in fraudulent, misleading, or deceptive practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">5. Fees and Payments</h2>
            <p>
              StoreHub charges a commission on each successful transaction processed through the platform. The commission rate is displayed in your vendor dashboard and may vary by subscription tier. Payments are processed through Paystack, and payouts are subject to Paystack&apos;s processing schedules and terms.
            </p>
            <p className="mt-3">
              We reserve the right to change fee structures with 30 days&apos; notice to active vendors. Continued use of the platform after fee changes constitutes acceptance of the new rates.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">6. Prohibited Content</h2>
            <p>You may not use StoreHub to sell or promote:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Counterfeit, fake, or replica products misrepresented as genuine</li>
              <li>Illegal goods, controlled substances, or weapons</li>
              <li>Stolen goods or products infringing on intellectual property rights</li>
              <li>Adult-only content without proper age verification</li>
              <li>Hazardous materials</li>
              <li>Financial fraud schemes, pyramid schemes, or MLM products prohibited by Nigerian law</li>
              <li>Any product or service that violates applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>
              You retain ownership of content you upload to StoreHub (product images, descriptions, logos). By uploading content, you grant StoreHub a non-exclusive, royalty-free licence to display, reproduce, and distribute your content for the purpose of operating the platform, including displaying your storefront to potential buyers.
            </p>
            <p className="mt-3">
              The StoreHub brand, logo, and platform design are owned by StoreHub and may not be used without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">8. Termination</h2>
            <p>
              StoreHub reserves the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or for any reason with 7 days&apos; notice. You may close your account at any time by contacting support. Upon termination, your storefront will be taken offline, but we may retain transaction records as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p>
              StoreHub is a technology platform and is not responsible for the quality, safety, or legality of products sold by vendors, or for the accuracy of vendor listings. All disputes arising from transactions are between Buyers and Vendors. StoreHub&apos;s total liability to you shall not exceed the fees paid by you in the 3 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be resolved through negotiation, and if unresolved, through the courts of the Federal Capital Territory, Abuja.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">11. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify you of material changes via email or platform notice. Your continued use of StoreHub after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">12. Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:legal@storehub.ng" className="text-emerald-600 hover:underline">legal@storehub.ng</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} StoreHub. All rights reserved.</p>
          <nav className="flex gap-6 text-xs text-gray-400">
            <Link href="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
