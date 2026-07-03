import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MinimalTemplate from "./_templates/MinimalTemplate";
import BoldTemplate    from "./_templates/BoldTemplate";
import WarmTemplate    from "./_templates/WarmTemplate";
import MarketTemplate  from "./_templates/MarketTemplate";
import type { VendorWithSettings } from "./_templates/types";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const vendor = await prisma.vendor.findUnique({
    where:  { username },
    select: { businessName: true, storefrontSetting: { select: { bioText: true } } },
  });
  if (!vendor) return { title: "Store not found — ClientFlow" };
  return {
    title:       `${vendor.businessName} — ClientFlow`,
    description: vendor.storefrontSetting?.bioText ?? `Shop from ${vendor.businessName} on ClientFlow.`,
  };
}

export default async function StorefrontPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const vendor = await prisma.vendor.findUnique({
    where: { username },
    include: {
      storefrontSetting: true,
      products: { where: { status: "ACTIVE" }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!vendor) notFound();

  const templateId = vendor.storefrontSetting?.templateId ?? "minimal";
  const props = { vendor: vendor as unknown as VendorWithSettings, username };

  if (templateId === "bold")   return <BoldTemplate   {...props} />;
  if (templateId === "warm")   return <WarmTemplate   {...props} />;
  if (templateId === "market") return <MarketTemplate {...props} />;
  return <MinimalTemplate {...props} />;
}
