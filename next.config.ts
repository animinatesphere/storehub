import type { NextConfig } from "next";
import path from "path";

// All platform-specific Remotion compositor packages.
// None of these should ever be bundled — they're native binaries loaded by
// Node.js at runtime. We stub them for static analysis (Turbopack / webpack)
// while serverExternalPackages ensures the real binaries are used at runtime.
const REMOTION_COMPOSITOR_PACKAGES = [
  "@remotion/compositor-darwin-arm64",
  "@remotion/compositor-darwin-x64",
  "@remotion/compositor-linux-x64-gnu",
  "@remotion/compositor-linux-x64-musl",
  "@remotion/compositor-linux-arm64-gnu",
  "@remotion/compositor-linux-arm64-musl",
  "@remotion/compositor-win32-x64-msvc",
];

const stub = path.resolve(process.cwd(), "src/lib/remotion-stub.js");

const nextConfig: NextConfig = {
  // Mark every Remotion package + esbuild as server-external so Next.js emits
  // require() calls instead of bundling them. At runtime Node.js loads the
  // correct platform binary directly from node_modules.
  serverExternalPackages: [
    "@remotion/renderer",
    "@remotion/bundler",
    "remotion",
    "esbuild",
    ...REMOTION_COMPOSITOR_PACKAGES,
  ],

  // Turbopack alias table — redirects all non-bundleable packages to the empty
  // stub during Turbopack's static analysis pass.  This does NOT affect runtime
  // because server-external packages are required() natively, bypassing the alias.
  turbopack: {
    resolveAlias: Object.fromEntries([
      ...REMOTION_COMPOSITOR_PACKAGES.map((pkg) => [pkg, stub]),
      ["esbuild", stub],
    ]),
  },

  // Webpack alias table — same idea for when webpack is the bundler.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const aliases: Record<string, string> = {
        ...(config.resolve?.alias as Record<string, string> ?? {}),
        esbuild: stub,
      };
      for (const pkg of REMOTION_COMPOSITOR_PACKAGES) {
        aliases[pkg] = stub;
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
