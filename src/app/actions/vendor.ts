"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { VendorCategory, UserRole } from "@/generated/prisma/client";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const businessName = (formData.get("businessName") as string)?.trim();
  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const category = formData.get("category") as VendorCategory;

  if (!businessName || !username || !category) {
    redirect("/onboarding?error=missing_fields");
  }

  if (!/^[a-z0-9_-]{3,30}$/.test(username)) {
    redirect("/onboarding?error=invalid_username");
  }

  const taken = await prisma.vendor.findUnique({ where: { username } });
  if (taken) redirect("/onboarding?error=username_taken");

  // Update user role to VENDOR, then create the vendor + storefront records
  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: UserRole.VENDOR },
  });

  await prisma.vendor.create({
    data: {
      userId: session.user.id,
      businessName,
      username,
      category,
      storefrontSetting: {
        create: {
          templateId: "default",
          brandColor: "#1e293b",
        },
      },
    },
  });

  redirect("/dashboard");
}
