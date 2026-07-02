"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function saveStorefrontSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const templateId = (formData.get("templateId") as string) || "minimal";
  const logoUrl    = (formData.get("logoUrl")    as string) || null;
  const brandColor = (formData.get("brandColor") as string) || "#0f172a";
  const bioText    = (formData.get("bioText")    as string) || null;

  const socialLinks = {
    instagram: (formData.get("instagram") as string) || undefined,
    twitter:   (formData.get("twitter")   as string) || undefined,
    whatsapp:  (formData.get("whatsapp")  as string) || undefined,
    website:   (formData.get("website")   as string) || undefined,
  };
  // Remove empty strings
  for (const key of Object.keys(socialLinks) as (keyof typeof socialLinks)[]) {
    if (!socialLinks[key]) delete socialLinks[key];
  }

  await prisma.storefrontSettings.upsert({
    where:  { vendorId: vendor.id },
    update: { templateId, logoUrl, brandColor, bioText, socialLinks },
    create: { vendorId: vendor.id, templateId, logoUrl, brandColor, bioText, socialLinks },
  });

  redirect("/dashboard/storefront?saved=1");
}
