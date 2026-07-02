import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const EMERALD = "#10b981";
const EMERALD_DARK = "#059669";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function LogoMark({ opacity, scale }: { opacity: number; scale: number }) {
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* SVG Logo */}
      <svg width="120" height="120" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="9" fill={EMERALD} />
        <path d="M13 15.5V13a5 5 0 0 1 10 0v2.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="8" y="15.5" width="20" height="13" rx="3" fill="white" fillOpacity="0.9" />
        <circle cx="18" cy="22" r="2.5" fill={EMERALD} />
      </svg>

      {/* Wordmark */}
      <div style={{ display: "flex", gap: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <span style={{ fontSize: 72, fontWeight: 900, color: "white", letterSpacing: -2 }}>Store</span>
        <span style={{ fontSize: 72, fontWeight: 900, color: EMERALD, letterSpacing: -2 }}>Hub</span>
      </div>
    </div>
  );
}

function TaglineWord({ text, delay, fps }: { text: string; delay: number; fps: number }) {
  const frame = useCurrentFrame();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 120 } });
  const y = interpolate(progress, [0, 1], [30, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `translateY(${y}px)`,
        marginRight: "0.35em",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {text}
    </span>
  );
}

function FeaturePill({
  icon,
  text,
  delay,
  fps,
}: {
  icon: string;
  text: string;
  delay: number;
  fps: number;
}) {
  const frame = useCurrentFrame();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  const y = interpolate(progress, [0, 1], [40, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 100,
        padding: "14px 28px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <span style={{ fontSize: 28 }}>{icon}</span>
      <span style={{ color: "white", fontSize: 22, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

export function LaunchVideo() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scene 1: Logo reveal (0-60 frames)
  const logoProgress = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 80 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Background gradient rotation
  const bgAngle = interpolate(frame, [0, durationInFrames], [135, 200]);

  // Glow pulse in final scene
  const glowIntensity = interpolate(
    Math.sin((frame / fps) * Math.PI * 0.8),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #0a0a0a 0%, #111827 50%, #0f1f17 100%)`,
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Background decorative orbs */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${EMERALD}18 0%, transparent 70%)`,
            transform: `scale(${glowIntensity})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            left: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${EMERALD}10 0%, transparent 70%)`,
          }}
        />
      </AbsoluteFill>

      {/* Scene 1: Logo (frames 0-70) */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: frame < 65 ? 1 : interpolate(frame, [65, 80], [1, 0]),
          }}
        >
          <LogoMark opacity={logoOpacity} scale={logoScale} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Tagline (frames 70-150) */}
      <Sequence from={70} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            opacity: frame < 145 ? 1 : interpolate(frame, [145, 160], [1, 0]),
          }}
        >
          {/* Mini logo at top */}
          <div style={{ opacity: spring({ frame: frame - 70, fps, config: { damping: 20 } }) }}>
            <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill={EMERALD} />
              <path d="M13 15.5V13a5 5 0 0 1 10 0v2.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <rect x="8" y="15.5" width="20" height="13" rx="3" fill="white" fillOpacity="0.9" />
              <circle cx="18" cy="22" r="2.5" fill={EMERALD} />
            </svg>
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            <TaglineWord text="Build" delay={75} fps={fps} />
            <TaglineWord text="your" delay={80} fps={fps} />
            <TaglineWord text="store." delay={85} fps={fps} />
            <br />
            <TaglineWord text="Share" delay={92} fps={fps} />
            <TaglineWord text="one" delay={97} fps={fps} />
            <span style={{ color: EMERALD }}>
              <TaglineWord text="link." delay={102} fps={fps} />
            </span>
            <br />
            <TaglineWord text="Get" delay={109} fps={fps} />
            <span style={{ color: EMERALD }}>
              <TaglineWord text="paid." delay={114} fps={fps} />
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Features (frames 150-220) */}
      <Sequence from={150} durationInFrames={80}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            opacity: frame < 215 ? 1 : interpolate(frame, [215, 230], [1, 0]),
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: spring({ frame: frame - 150, fps, config: { damping: 20 } }),
            }}
          >
            Nigeria's Seller Platform
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            <FeaturePill icon="🛍️" text="Easy storefront" delay={158} fps={fps} />
            <FeaturePill icon="💳" text="Paystack payments" delay={166} fps={fps} />
            <FeaturePill icon="📱" text="WhatsApp sharing" delay={174} fps={fps} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Final CTA (frames 220-300) */}
      <Sequence from={220}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            opacity: spring({ frame: frame - 220, fps, config: { damping: 20 } }),
          }}
        >
          {/* Glowing logo */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${EMERALD}40 0%, transparent 70%)`,
                transform: `scale(${glowIntensity})`,
              }}
            />
            <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill={EMERALD} />
              <path d="M13 15.5V13a5 5 0 0 1 10 0v2.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <rect x="8" y="15.5" width="20" height="13" rx="3" fill="white" fillOpacity="0.9" />
              <circle cx="18" cy="22" r="2.5" fill={EMERALD} />
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: -3,
                background: `linear-gradient(135deg, white 40%, ${EMERALD} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Now Live
            </div>
            <div
              style={{
                fontSize: 30,
                color: "rgba(255,255,255,0.6)",
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              storehub.ng — Start selling in minutes
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 16,
              background: EMERALD,
              color: "white",
              fontSize: 28,
              fontWeight: 800,
              borderRadius: 100,
              padding: "22px 64px",
              letterSpacing: -0.5,
              transform: `scale(${interpolate(
                spring({ frame: frame - 230, fps, config: { damping: 12 } }),
                [0, 1],
                [0.8, 1]
              )})`,
              boxShadow: `0 0 60px ${EMERALD}60`,
            }}
          >
            Create Your Free Store
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Bottom watermark */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: 40,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.2)",
            fontWeight: 500,
            opacity: interpolate(frame, [10, 30], [0, 1]),
          }}
        >
          storehub.ng
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
