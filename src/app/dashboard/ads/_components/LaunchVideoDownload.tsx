"use client";

import { useState } from "react";

type State = "idle" | "rendering" | "done" | "error";

export default function LaunchVideoDownload() {
  const [state,    setState]    = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleDownload() {
    setState("rendering");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/ads/render-launch", { method: "POST" });

      if (!res.ok) {
        const json = await res.json().catch(() => ({ error: "Render failed" }));
        throw new Error(json.error ?? "Render failed");
      }

      const blob     = await res.blob();
      const url      = URL.createObjectURL(blob);
      const anchor   = document.createElement("a");
      anchor.href     = url;
      anchor.download = "clientflow-coming-soon.mp4";
      anchor.click();
      URL.revokeObjectURL(url);

      setState("done");
      setTimeout(() => setState("idle"), 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-950 to-slate-900 rounded-2xl p-6 border border-emerald-900/40">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M12 12.75v4.5m0 0l-1.5-1.5m1.5 1.5 1.5-1.5" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-semibold text-white">Coming Soon promo video</h3>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">NEW</span>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            A 10-second animated promo video for ClientFlow — ready to post on WhatsApp, Instagram, or TikTok to build hype before launch.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={state === "rendering"}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "rendering" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Rendering… (~30–60 s)
                </>
              ) : state === "done" ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Downloaded!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download promo video
                </>
              )}
            </button>

            <span className="text-xs text-slate-500">1920×1080 · MP4 · H.264</span>
          </div>

          {state === "error" && errorMsg && (
            <p className="mt-3 text-xs text-red-400 bg-red-950/40 border border-red-900/40 rounded-lg px-3 py-2">
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
