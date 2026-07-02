import type { NextConfig } from "next";
import path from "path";

// Native binaries that only exist for the host platform at install time.
// webpack must never try to bundle these — they are loaded by Node.js at runtime.
const REMOTION_COMPOSITOR_PACKAGES = [
  "@remotion/compositor-darwin-arm64",
  "@remotion/compositor-darwin-x64",
  "@remotion/compositor-linux-x64-gnu",
  "@remotion/compositor-linux-x64-musl",
  "@remotion/compositor-win32-x64-msvc",
];

const nextConfig: NextConfig = {
  // Keep Remotion server packages out of the server bundle so they are
  // required() natively at runtime (where the correct platform binary exists).
  serverExternalPackages: [
    "@remotion/renderer",
    "@remotion/bundler",
    "remotion",
    ...REMOTION_COMPOSITOR_PACKAGES,
  ],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // The CLIENT bundle must not attempt to include platform-specific native
      // binaries.  Point every compositor package to an empty stub so that
      // webpack can finish the build even though remotion/renderer references them.
      const stub = path.resolve(process.cwd(), "src/lib/remotion-stub.js");
      const aliases = config.resolve?.alias ?? {};
      for (const pkg of REMOTION_COMPOSITOR_PACKAGES) {
        (aliases as Record<string, string>)[pkg] = stub;
      }
      config.resolve = { ...config.resolve, alias: aliases };
    }
    return config;
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
