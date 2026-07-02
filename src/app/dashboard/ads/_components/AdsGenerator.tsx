"use client";

import { useState } from "react";

type Product = { id: string; title: string; price: number; image: string | null };

type Props = {
  products:   Product[];
  brandColor: string;
  vendorName: string;
  logoUrl:    string | null;
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

export default function AdsGenerator({ products, brandColor, vendorName, logoUrl }: Props) {
  const [selectedId, setSelectedId] = useState<string>(products[0]?.id ?? "");
  const [ctaText,    setCtaText]    = useState("Shop Now");
  const [state,      setState]      = useState<"idle" | "rendering" | "done" | "error">("idle");
  const [errorMsg,   setErrorMsg]   = useState<string | null>(null);
  const [videoUrl,   setVideoUrl]   = useState<string | null>(null);

  const product = products.find((p) => p.id === selectedId) ?? products[0];

  async function handleGenerate() {
    if (!product) return;
    setState("rendering");
    setErrorMsg(null);
    setVideoUrl(null);

    try {
      const res = await fetch("/api/ads/render", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productTitle: product.title,
          productPrice: naira(product.price),
          productImage: product.image,
          ctaText,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(json.error ?? "Render failed");
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      setVideoUrl(url);
      setState("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  const isLight = (() => {
    const hex = brandColor.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 160;
  })();
  const textOnBrand = isLight ? "#111827" : "#ffffff";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Controls ── */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">Ad settings</h2>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Select product</label>
            {products.length === 0 ? (
              <p className="text-sm text-slate-400">No active products found. Add some products first.</p>
            ) : (
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 bg-slate-50"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} — {naira(p.price)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Call to action text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              maxLength={24}
              placeholder="Shop Now"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 bg-slate-50"
            />
          </div>

          <div className="pt-1">
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
              <div className="flex-1 h-px bg-slate-100" />
              Brand from your storefront settings
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-slate-200 shrink-0" style={{ backgroundColor: brandColor }} />
              <p className="text-sm text-slate-600 font-mono">{brandColor}</p>
              <a href="/dashboard/storefront" className="ml-auto text-xs text-slate-400 hover:text-slate-700 underline underline-offset-2 transition-colors">
                Edit
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={state === "rendering" || !product}
          className="w-full bg-slate-900 text-white text-sm font-semibold py-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {state === "rendering" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Rendering video… (this takes ~30s)
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Generate video ad
            </>
          )}
        </button>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {errorMsg}
          </div>
        )}

        {state === "done" && videoUrl && (
          <a
            href={videoUrl}
            download={`${product?.title ?? "ad"}-ad.mp4`}
            className="block w-full text-center bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Download video (.mp4)
          </a>
        )}
      </div>

      {/* ── Live preview mock ── */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ad preview</p>
        <div className="aspect-square rounded-3xl overflow-hidden relative" style={{ backgroundColor: brandColor }}>
          {/* BG decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full" style={{ background: `${textOnBrand}10` }} />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full" style={{ background: `${textOnBrand}08` }} />
          </div>

          <div className="relative h-full flex flex-col justify-between p-6">
            {/* Vendor header */}
            <div className="flex items-center gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={vendorName} className="w-9 h-9 rounded-xl object-cover" style={{ border: `2px solid ${textOnBrand}30` }} />
              ) : (
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black" style={{ background: `${textOnBrand}20`, color: textOnBrand }}>
                  {vendorName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-bold" style={{ color: textOnBrand, opacity: 0.9 }}>{vendorName}</span>
            </div>

            {/* Product card */}
            <div className="rounded-2xl p-4 flex gap-4 items-center" style={{ background: `${textOnBrand === "#ffffff" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)"}`, border: `1px solid ${textOnBrand}20` }}>
              {product?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${textOnBrand}15` }}>
                  🛍️
                </div>
              )}
              <div>
                <p className="text-sm font-bold line-clamp-2 mb-0.5" style={{ color: textOnBrand }}>{product?.title}</p>
                <p className="text-base font-black" style={{ color: textOnBrand }}>{product ? naira(product.price) : ""}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <div className="text-sm font-black px-6 py-2.5 rounded-full" style={{ background: textOnBrand, color: brandColor }}>
                {ctaText || "Shop Now"}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center">
          1080×1080 · 4 sec · MP4 · Perfect for Instagram, WhatsApp, TikTok
        </p>
      </div>
    </div>
  );
}
