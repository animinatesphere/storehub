import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ClientFlow — Nigeria's seller platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0d1f18",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 600, height: 630,
          background: "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(5,150,105,0.25) 0%, transparent 70%)",
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 32 }}>
          {/* CF icon */}
          <div style={{
            width: 112, height: 112, borderRadius: 24,
            background: "#059669",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="72" height="72" viewBox="0 0 40 40" fill="none">
              <path d="M18 15A7 7 0 1 0 18 25" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="22" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M27 15.5L32 20L27 24.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Wordmark */}
          <div style={{ display: "flex", gap: 0 }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: "white", letterSpacing: -3 }}>Client</span>
            <span style={{ fontSize: 80, fontWeight: 900, color: "#10b981", letterSpacing: -3 }}>Flow</span>
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 36, color: "rgba(255,255,255,0.85)",
          fontWeight: 700, letterSpacing: -0.5, marginBottom: 20,
        }}>
          Build your store. Share one link. Get paid.
        </div>

        <div style={{
          fontSize: 24, color: "rgba(255,255,255,0.45)",
          fontWeight: 400, marginBottom: 48,
        }}>
          Nigeria&apos;s simplest seller platform — free to start, Paystack built in.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 14 }}>
          {["Free to start", "Paystack checkout", "WhatsApp sharing", "5 min setup"].map((t) => (
            <div key={t} style={{
              padding: "12px 24px", borderRadius: 100,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: 18, color: "rgba(255,255,255,0.7)", fontWeight: 600,
            }}>
              {t}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute", bottom: 36, right: 64,
          fontSize: 18, color: "rgba(255,255,255,0.2)", fontWeight: 500,
        }}>
          storehub.ng
        </div>
      </div>
    ),
    { ...size }
  );
}
