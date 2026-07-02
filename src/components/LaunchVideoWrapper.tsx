"use client";

// next/dynamic with ssr:false is only allowed inside Client Components in
// Next.js 16 (Turbopack). This wrapper is the boundary — the server-rendered
// page imports this component which then lazy-loads the Remotion Player.
import dynamic from "next/dynamic";

const LaunchVideoPlayer = dynamic(
  () => import("@/components/LaunchVideoPlayer"),
  { ssr: false }
);

export default function LaunchVideoWrapper() {
  return <LaunchVideoPlayer />;
}
