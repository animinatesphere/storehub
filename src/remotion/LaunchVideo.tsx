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

// ── New ClientFlow CF logo (C + arrow) ──────────────────────────────────────
function CFLogo({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="9" fill={EMERALD_DARK} />
      {/* C arc */}
      <path d="M18 15A7 7 0 1 0 18 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrow shaft */}
      <line x1="22" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrow head */}
      <path d="M27 15.5L32 20L27 24.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
        gap: 28,
      }}
    >
      <CFLogo size={120} />
      <div style={{ display: "flex", gap: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <span style={{ fontSize: 72, fontWeight: 900, color: "white", letterSpacing: -2 }}>Client</span>
        <span style={{ fontSize: 72, fontWeight: 900, color: EMERALD, letterSpacing: -2 }}>Flow</span>
      </div>
    </div>
  );
}

function TaglineWord({ text, delay, fps, color = "white" }: { text: string; delay: number; fps: number; color?: string }) {
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
        color,
      }}
    >
      {text}
    </span>
  );
}

// SVG icons — no emoji
function StoreIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function FeaturePill({
  icon,
  text,
  delay,
  fps,
}: {
  icon: React.ReactNode;
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
        gap: 12,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 100,
        padding: "14px 28px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {icon}
      <span style={{ color: "white", fontSize: 22, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

export function LaunchVideo() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoProgress = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 80 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  const bgAngle = interpolate(frame, [0, durationInFrames], [135, 200]);
  const glowIntensity = interpolate(Math.sin((frame / fps) * Math.PI * 0.8), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #0a0a0a 0%, #111827 50%, #0f1f17 100%)`,
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Background orbs */}
      <AbsoluteFill>
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${EMERALD}18 0%, transparent 70%)`,
          transform: `scale(${glowIntensity})`,
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${EMERALD}10 0%, transparent 70%)`,
        }} />
      </AbsoluteFill>

      {/* Scene 1: Logo reveal (0-80) */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: frame < 65 ? 1 : interpolate(frame, [65, 80], [1, 0]),
        }}>
          <LogoMark opacity={logoOpacity} scale={logoScale} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Tagline (70-160) */}
      <Sequence from={70} durationInFrames={100}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 32,
          opacity: frame < 150 ? 1 : interpolate(frame, [150, 170], [1, 0]),
        }}>
          <div style={{ opacity: spring({ frame: frame - 70, fps, config: { damping: 20 } }) }}>
            <CFLogo size={56} />
          </div>
          <div style={{
            fontSize: 72, fontWeight: 900, color: "white",
            textAlign: "center", lineHeight: 1.1, letterSpacing: -2,
          }}>
            <TaglineWord text="Build" delay={75} fps={fps} />
            <TaglineWord text="your" delay={80} fps={fps} />
            <TaglineWord text="store." delay={85} fps={fps} />
            <br />
            <TaglineWord text="Share" delay={92} fps={fps} />
            <TaglineWord text="one" delay={97} fps={fps} />
            <TaglineWord text="link." delay={102} fps={fps} color={EMERALD} />
            <br />
            <TaglineWord text="Get" delay={109} fps={fps} />
            <TaglineWord text="paid." delay={114} fps={fps} color={EMERALD} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Features (160-240) */}
      <Sequence from={160} durationInFrames={80}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 40,
          opacity: frame < 228 ? 1 : interpolate(frame, [228, 240], [1, 0]),
        }}>
          <div style={{
            fontSize: 32, fontWeight: 700, letterSpacing: 4,
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.5)",
            opacity: spring({ frame: frame - 160, fps, config: { damping: 20 } }),
          }}>
            Nigeria&apos;s Seller Platform
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" as const, justifyContent: "center" }}>
            <FeaturePill icon={<StoreIcon />} text="Your own storefront" delay={168} fps={fps} />
            <FeaturePill icon={<CardIcon />} text="Paystack payments" delay={176} fps={fps} />
            <FeaturePill icon={<ShareIcon />} text="Share one link" delay={184} fps={fps} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Coming Soon CTA (230-300) */}
      <Sequence from={230}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 28,
          opacity: spring({ frame: frame - 230, fps, config: { damping: 20 } }),
        }}>
          {/* Glowing logo */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "absolute", width: 180, height: 180, borderRadius: "50%",
              background: `radial-gradient(circle, ${EMERALD}40 0%, transparent 70%)`,
              transform: `scale(${glowIntensity})`,
            }} />
            <CFLogo size={80} />
          </div>

          {/* Coming Soon headline */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 96, fontWeight: 900, letterSpacing: -3,
              background: `linear-gradient(135deg, white 40%, ${EMERALD} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Coming Soon
            </div>
            <div style={{
              fontSize: 28, color: "rgba(255,255,255,0.6)",
              marginTop: 8, fontWeight: 500,
            }}>
              storehub.ng — Start selling in minutes
            </div>
          </div>

          {/* CTA badge */}
          <div style={{
            marginTop: 8,
            background: EMERALD,
            color: "white",
            fontSize: 26,
            fontWeight: 800,
            borderRadius: 100,
            padding: "20px 60px",
            letterSpacing: -0.5,
            transform: `scale(${interpolate(
              spring({ frame: frame - 240, fps, config: { damping: 12 } }),
              [0, 1], [0.8, 1]
            )})`,
            boxShadow: `0 0 60px ${EMERALD}60`,
          }}>
            Join the Waitlist — It&apos;s Free
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Watermark */}
      <AbsoluteFill style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "center", padding: 40, pointerEvents: "none",
      }}>
        <div style={{
          fontSize: 18, color: "rgba(255,255,255,0.2)",
          fontWeight: 500, opacity: interpolate(frame, [10, 30], [0, 1]),
        }}>
          storehub.ng
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
