import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import path from "path";
import os from "os";
import fs from "fs/promises";

export const dynamic     = "force-dynamic";
export const maxDuration = 120;

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { bundle }                         = await import("@remotion/bundler");
    const { renderMedia, selectComposition } = await import("@remotion/renderer");

    const entryPoint = path.join(process.cwd(), "src/remotion/Root.tsx");
    const outputPath = path.join(os.tmpdir(), `cf-launch-${Date.now()}-${session.user.id.slice(-6)}.mp4`);

    const bundleUrl = await bundle({
      entryPoint,
      webpackOverride: (config) => config,
    });

    const composition = await selectComposition({
      serveUrl: bundleUrl,
      id:       "LaunchVideo",
    });

    await renderMedia({
      composition,
      serveUrl:              bundleUrl,
      codec:                 "h264",
      outputLocation:        outputPath,
      timeoutInMilliseconds: 90_000,
    });

    const fileBuffer = await fs.readFile(outputPath);
    await fs.unlink(outputPath).catch(() => {});

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type":        "video/mp4",
        "Content-Disposition": `attachment; filename="clientflow-coming-soon.mp4"`,
        "Cache-Control":       "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Render failed";
    console.error("[ads/render-launch]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
