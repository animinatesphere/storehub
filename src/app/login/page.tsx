import Image from "next/image";
import Link from "next/link";
import { loginUser } from "@/app/actions/auth";
import { signIn } from "@/lib/auth";

export const metadata = { title: "Sign in — ClientFlow" };

const PANEL_IMG =
  "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=900&auto=format&fit=crop&q=80";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

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
          fill
          unoptimized
          className="object-cover object-top"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/50 to-slate-900/85" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <Link href="/" className="text-white text-xl font-bold tracking-tight">
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
            <Link href="/" className="text-2xl font-bold text-slate-900">ClientFlow</Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-1.5 text-slate-500 text-sm">Sign in to your ClientFlow account</p>
          </div>

          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
              Invalid email or password. Please try again.
            </div>
          )}

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: next || "/marketplace" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-100" />
            <span className="mx-4 text-xs text-slate-400 uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-slate-100" />
          </div>

          <form action={loginUser} className="space-y-5">
            <input type="hidden" name="next" value={next} />

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Sign in
            </button>
          </form>

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
