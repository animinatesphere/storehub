import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ProductAdProps = {
  productTitle: string;
  productPrice: string;
  productImage: string | null;
  vendorName:   string;
  brandColor:   string;
  logoUrl:      string | null;
  ctaText:      string;
};

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function ProductAd({
  productTitle,
  productPrice,
  productImage,
  vendorName,
  brandColor,
  logoUrl,
  ctaText,
}: ProductAdProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Spring-in for the product card (starts at frame 10)
  const cardProgress = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const cardY        = interpolate(cardProgress, [0, 1], [60, 0]);
  const cardOpacity  = interpolate(cardProgress, [0, 1], [0, 1]);

  // Text slide-in (starts at frame 20)
  const textProgress = spring({ frame: frame - 20, fps, config: { damping: 18 } });
  const textX        = interpolate(textProgress, [0, 1], [-40, 0]);
  const textOpacity  = interpolate(textProgress, [0, 1], [0, 1]);

  // CTA pulse (last quarter of video)
  const ctaStart     = Math.floor(durationInFrames * 0.6);
  const ctaProgress  = spring({ frame: frame - ctaStart, fps, config: { damping: 12 } });
  const ctaScale     = interpolate(ctaProgress, [0, 1], [0.6, 1]);
  const ctaOpacity   = interpolate(ctaProgress, [0, 1], [0, 1]);

  // Subtle background gradient animation
  const bgRotate = interpolate(frame, [0, durationInFrames], [0, 15]);

  const isLight = (() => {
    const hex  = brandColor.replace("#", "");
    const r    = parseInt(hex.slice(0, 2), 16);
    const g    = parseInt(hex.slice(2, 4), 16);
    const b    = parseInt(hex.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 160;
  })();

  const textOnBrand = isLight ? "#111827" : "#ffffff";

  return (
    <AbsoluteFill style={{ backgroundColor: brandColor, fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>

      {/* Animated background circles */}
      <AbsoluteFill>
        <div style={{
          position: "absolute", top: "-30%", right: "-20%",
          width: "80%", height: "80%",
          borderRadius: "50%",
          background: `${textOnBrand}10`,
          transform: `rotate(${bgRotate}deg)`,
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "-15%",
          width: "60%", height: "60%",
          borderRadius: "50%",
          background: `${textOnBrand}08`,
          transform: `rotate(${-bgRotate * 0.7}deg)`,
        }} />
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill style={{ padding: 60, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

        {/* Header: Vendor */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: textOpacity, transform: `translateX(${textX}px)` }}>
          {logoUrl ? (
            <Img src={logoUrl} style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover", border: `2px solid ${textOnBrand}30` }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${textOnBrand}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: textOnBrand, fontSize: 18, fontWeight: 900 }}>
                {vendorName.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <span style={{ color: textOnBrand, fontSize: 22, fontWeight: 700, opacity: 0.9 }}>{vendorName}</span>
        </div>

        {/* Product card */}
        <div style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          borderRadius: 28,
          border: `1px solid ${textOnBrand}20`,
          display: "flex",
          gap: 32,
          alignItems: "center",
          padding: "28px 32px",
        }}>
          {/* Product image */}
          {productImage ? (
            <Img
              src={productImage}
              style={{ width: 220, height: 220, borderRadius: 20, objectFit: "cover", flexShrink: 0, border: `1px solid ${textOnBrand}20` }}
            />
          ) : (
            <div style={{ width: 220, height: 220, borderRadius: 20, background: `${textOnBrand}15`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 56 }}>🛍️</span>
            </div>
          )}

          {/* Product info */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ color: textOnBrand, fontSize: 36, fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
              {productTitle}
            </p>
            <p style={{ color: textOnBrand, fontSize: 48, fontWeight: 900, margin: 0 }}>
              {productPrice}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            opacity:    ctaOpacity,
            transform:  `scale(${ctaScale})`,
            background: textOnBrand,
            color:      brandColor,
            borderRadius: 100,
            paddingTop: 20, paddingBottom: 20,
            paddingLeft: 56, paddingRight: 56,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: -0.5,
          }}>
            {ctaText}
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
}
