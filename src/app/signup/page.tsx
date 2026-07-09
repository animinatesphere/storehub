import Image from "next/image";
import Link from "next/link";
import ClientFlowLogo from "@/components/ClientFlowLogo";
import SignupForm from "./_components/SignupForm";

export const metadata = { title: "Create account — ClientFlow" };

const PANEL_IMG =
  "https://images.unsplash.com/photo-1602342323893-b11f757957c9?w=900&auto=format&fit=crop&q=80";

function BenefitRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-white/80 text-sm leading-relaxed">{text}</span>
    </li>
  );
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role: roleParam } = await searchParams;
  const defaultRole = roleParam === "vendor" ? "vendor" : "customer";
  const isVendor = defaultRole === "vendor";

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ── LEFT: image panel ── */}
      <div className="hidden lg:flex relative overflow-hidden">
        <Image
          src={PANEL_IMG}
          alt="Nigerian seller growing her business online"
          fill unoptimized
          className="object-cover object-top"
          priority sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/50 to-slate-900/85" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-tight">
            <ClientFlowLogo size={32} />
            ClientFlow
          </Link>

          <div>
            <div className="w-8 h-0.5 bg-white/40 mb-6" />
            <h2 className="text-white text-3xl font-bold leading-snug mb-3">
              {isVendor ? "Your store. Your brand. Your link." : "Discover the best of Nigerian sellers."}
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              {isVendor
                ? "Start free. Add your products, share your link, and accept Paystack payments in minutes — no website skills needed."
                : "Shop from thousands of verified Nigerian sellers across every category, all in one place."}
            </p>
            <ul className="space-y-4">
              {(isVendor
                ? [
                    "Your own storefront at clientflow.ng/shop/you",
                    "Paystack checkout built in — card, transfer, USSD",
                    "Share one link on WhatsApp and start selling",
                    "Free plan, no credit card required",
                  ]
                : [
                    "Browse products from thousands of Nigerian sellers",
                    "Secure Paystack payments you already trust",
                    "Track orders from payment to delivery",
                    "Free account, no credit card needed",
                  ]
              ).map((t) => <BenefitRow key={t} text={t} />)}
            </ul>
          </div>
        </div>
      </div>

      {/* ── RIGHT: form ── */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">

          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <ClientFlowLogo size={32} /> ClientFlow
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {isVendor ? "Create your seller account" : "Create your account"}
            </h1>
            <p className="mt-1.5 text-slate-500 text-sm">
              {isVendor
                ? "Free forever on the basic plan. No credit card required."
                : "Join ClientFlow and shop from the best Nigerian sellers."}
            </p>
          </div>

          <SignupForm defaultRole={defaultRole} />

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-900 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-slate-400">
            By creating an account you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
