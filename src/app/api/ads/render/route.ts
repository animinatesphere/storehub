import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TIER_ORDER } from "@/lib/tier";
import path from "path";
import os from "os";
import fs from "fs/promises";

export const dynamic    = "force-dynamic";
export const maxDuration = 120; // seconds

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vendor = await prisma.vendor.findUnique({
    where:   { userId: session.user.id },
    include: { storefrontSetting: true },
  });
  if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

  // PRO+ gate
  if (TIER_ORDER.indexOf(vendor.subscriptionTier) < TIER_ORDER.indexOf("PRO")) {
    return NextResponse.json({ error: "PRO plan or higher required" }, { status: 403 });
  }

  const body = await req.json() as {
    productTitle: string;
    productPrice: string;
    productImage: string | null;
    ctaText:      string;
  };

  const settings = vendor.storefrontSetting;
  const inputProps = {
    productTitle: body.productTitle,
    productPrice: body.productPrice,
    productImage: body.productImage ?? null,
    vendorName:   vendor.businessName,
    brandColor:   settings?.brandColor ?? "#6366f1",
    logoUrl:      settings?.logoUrl ?? null,
    ctaText:      body.ctaText || "Shop Now",
  };

  try {
    // Lazy imports to avoid module-load failures if packages not installed
    const { bundle }                         = await import("@remotion/bundler");
    const { renderMedia, selectComposition } = await import("@remotion/renderer");

    const entryPoint = path.join(process.cwd(), "src/remotion/Root.tsx");
    const outputPath = path.join(os.tmpdir(), `sh-ad-${Date.now()}-${session.user.id.slice(-6)}.mp4`);

    // Bundle the Remotion composition (webpack bundle)
    const bundleUrl = await bundle({
      entryPoint,
      // Expose process.env for the composition
      webpackOverride: (config) => config,
    });

    const composition = await selectComposition({
      serveUrl:   bundleUrl,
      id:         "ProductAd",
      inputProps,
    });

    await renderMedia({
      composition,
      serveUrl:        bundleUrl,
      codec:           "h264",
      outputLocation:  outputPath,
      inputProps,
      timeoutInMilliseconds: 90_000,
    });

    const fileBuffer = await fs.readFile(outputPath);
    await fs.unlink(outputPath).catch(() => {});

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type":        "video/mp4",
        "Content-Disposition": `attachment; filename="storehub-ad-${Date.now()}.mp4"`,
        "Cache-Control":       "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Render failed";
    console.error("[ads/render]", err);

    // Check if Remotion is not installed
    if (message.includes("Cannot find module")) {
      return NextResponse.json(
        { error: "Remotion not installed. Run: npm install remotion @remotion/renderer @remotion/bundler" },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
