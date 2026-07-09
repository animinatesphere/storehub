"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/auth";

const ERROR_MESSAGES: Record<string, string> = {
  email_taken:    "An account with this email already exists.",
  invalid_fields: "Please provide a valid email and a password of at least 8 characters.",
};

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

export default function SignupForm({ defaultRole }: { defaultRole: "vendor" | "customer" }) {
  const router  = useRouter();
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const isVendor = defaultRole === "vendor";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // 1. Create user in DB
    const result = await createUser(formData);
    if (result.error) {
      setError(ERROR_MESSAGES[result.error] ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    // 2. Sign in client-side so the browser gets the session cookie properly
    await signIn("credentials", {
      email:    formData.get("email")    as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    // 3. Route based on role
    const dest = result.role === "VENDOR" ? "/onboarding" : "/marketplace";
    router.push(dest);
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: isVendor ? "/onboarding" : "/auth/redirect" });
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center">
        <div className="flex-1 border-t border-slate-100" />
        <span className="mx-4 text-xs text-slate-400 uppercase tracking-widest">or</span>
        <div className="flex-1 border-t border-slate-100" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="role" value={defaultRole} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
          <input
            id="name" name="name" type="text" required autoComplete="name"
            placeholder="Ada Okafor"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
          <input
            id="email" name="email" type="email" required autoComplete="email"
            placeholder="you@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            id="password" name="password" type="password" required minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        {defaultRole === "customer" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">I want to</label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium cursor-pointer has-[:checked]:border-slate-900 has-[:checked]:bg-slate-50 transition-colors">
                <input type="radio" name="role" value="customer" defaultChecked className="sr-only" />
                Shop
              </label>
              <label className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium cursor-pointer has-[:checked]:border-slate-900 has-[:checked]:bg-slate-50 transition-colors">
                <input type="radio" name="role" value="vendor" className="sr-only" />
                Sell
              </label>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account…" : (isVendor ? "Create seller account" : "Create account")}
        </button>
      </form>
    </div>
  );
}
