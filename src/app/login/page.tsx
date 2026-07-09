import Image from "next/image";
import Link from "next/link";
import ClientFlowLogo from "@/components/ClientFlowLogo";
import LoginForm from "./_components/LoginForm";

export const metadata = { title: "Sign in — ClientFlow" };

const PANEL_IMG =
  "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=900&auto=format&fit=crop&q=80";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next: nextParam, error } = await searchParams;
  const next = nextParam ?? "";

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ── LEFT: image panel ── */}
      <div className="hidden lg:flex relative overflow-hidden">
        <Image
          src={PANEL_IMG}
          alt="Nigerian seller smiling"
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
            <blockquote>
              <p className="text-white text-2xl font-medium leading-relaxed">
                &ldquo;I share my ClientFlow link on my WhatsApp status every morning.
                Orders come in while I sleep.&rdquo;
              </p>
              <footer className="mt-5 text-white/50 text-sm">
                Ada O. &middot; Lagos &middot; Ankara fabric seller
              </footer>
            </blockquote>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { value: "₦0", label: "to start" },
                { value: "5 min", label: "to go live" },
                { value: "Paystack", label: "for payments" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-white text-lg font-bold">{value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
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
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-1.5 text-slate-500 text-sm">Sign in to your ClientFlow account</p>
          </div>

          <LoginForm next={next} initialError={!!error} />

          <p className="mt-7 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-slate-900 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
