"use client";

import { useEffect, useState } from "react";
import { initUpgrade, applyUpgrade } from "@/app/actions/subscription";
import { SubscriptionTier } from "@/generated/prisma/client";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (c: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

type Props = {
  tier:       SubscriptionTier;
  label:      string;
  priceNGN:   number;
  email:      string;
};

export default function UpgradeButton({ tier, label, priceNGN, email }: Props) {
  const [loading,        setLoading]        = useState(false);
  const [paystackReady,  setPaystackReady]  = useState(false);
  const [error,          setError]          = useState<string | null>(null);

  useEffect(() => {
    if (document.getElementById("paystack-inline-js")) { setPaystackReady(true); return; }
    const s    = document.createElement("script");
    s.id       = "paystack-inline-js";
    s.src      = "https://js.paystack.co/v1/inline.js";
    s.async    = true;
    s.onload   = () => setPaystackReady(true);
    document.body.appendChild(s);
  }, []);

  async function handleClick() {
    if (!paystackReady || !window.PaystackPop) {
      setError("Payment provider still loading — try again.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { reference, amountKobo, planCode } = await initUpgrade(tier);
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) throw new Error("Public key missing");

      const config: Record<string, unknown> = {
        key:    publicKey,
        email,
        amount: amountKobo,
        ref:    reference,
        label:  `StoreHub ${label} Plan`,
        onSuccess: async (tx: { reference: string }) => {
          setLoading(true);
          await applyUpgrade(tier, tx.reference);
        },
        onClose: () => setLoading(false),
      };

      if (planCode) config.plan = planCode;

      window.PaystackPop.setup(config).openIframe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const naira = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);

  return (
    <div>
      {error && (
        <p className="text-xs text-red-500 mb-2">{error}</p>
      )}
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : `Upgrade — ${naira(priceNGN)}/mo`}
      </button>
    </div>
  );
}
