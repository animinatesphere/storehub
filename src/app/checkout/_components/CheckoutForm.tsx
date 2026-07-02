"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPendingOrder, verifyOrder } from "@/app/actions/order";

type Props = {
  productId: string;
  productTitle: string;
  price: number;
  vendorName: string;
  defaultEmail?: string;
  defaultName?: string;
};

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

export default function CheckoutForm({
  productId,
  productTitle,
  price,
  vendorName,
  defaultEmail,
  defaultName,
}: Props) {
  const router  = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<"idle" | "loading" | "error" | "redirecting">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paystackReady, setPaystackReady] = useState(false);

  // Load Paystack inline.js once
  useEffect(() => {
    if (document.getElementById("paystack-inline-js")) {
      setPaystackReady(true);
      return;
    }
    const script  = document.createElement("script");
    script.id     = "paystack-inline-js";
    script.src    = "https://js.paystack.co/v1/inline.js";
    script.async  = true;
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!paystackReady || !window.PaystackPop) {
      setErrorMsg("Payment provider is still loading — please try again in a moment.");
      return;
    }

    setState("loading");
    setErrorMsg(null);

    try {
      const formData = new FormData(formRef.current!);
      formData.set("productId", productId);

      const { orderId, reference, amountKobo, subaccountCode, transactionCharge } =
        await createPendingOrder(formData);

      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) throw new Error("Paystack public key not set");

      const config: Record<string, unknown> = {
        key:    publicKey,
        email:  formData.get("email") as string,
        amount: amountKobo,
        ref:    reference,
        label:  `${productTitle} — ${vendorName}`,
        onSuccess: async (transaction: { reference: string }) => {
          setState("redirecting");
          try {
            const { orderId: completedOrderId } = await verifyOrder(transaction.reference);
            router.push(`/checkout/success?order=${completedOrderId}`);
          } catch {
            // Payment succeeded but verify failed — still go to success, webhook will catch it
            router.push(`/checkout/success?order=${orderId}&ref=${transaction.reference}`);
          }
        },
        onClose: () => {
          setState("idle");
        },
      };

      if (subaccountCode) {
        config.subaccount = subaccountCode;
        config.bearer     = "account"; // vendor bears the Paystack fee
        if (transactionCharge != null) {
          config.transaction_charge = transactionCharge; // platform commission in kobo
        }
      }

      window.PaystackPop.setup(config).openIframe();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrorMsg(
        msg === "missing_fields"
          ? "Please fill in your name and email address."
          : msg === "product_not_found"
          ? "This product is no longer available."
          : "An error occurred. Please try again.",
      );
      setState("error");
    }
  }

  const naira = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultName}
          placeholder="Ada Okafor"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email address <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={defaultEmail}
          placeholder="ada@example.com"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
        <p className="mt-1.5 text-xs text-slate-400">Your receipt and order updates will be sent here.</p>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="080 0000 0000"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading" || state === "redirecting"}
        className="w-full bg-slate-900 text-white px-5 py-4 rounded-2xl text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "loading"
          ? "Opening payment..."
          : state === "redirecting"
          ? "Confirming payment..."
          : `Pay ${naira(price)} with Paystack`}
      </button>

      <p className="text-center text-xs text-slate-400">
        Secured by Paystack. Your card details are never stored.
      </p>
    </form>
  );
}
