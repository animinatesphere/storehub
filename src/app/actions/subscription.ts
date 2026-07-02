"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionTier } from "@/generated/prisma/client";
import { TIER } from "@/lib/tier";

export type InitUpgradeResult = {
  reference:  string;
  amountKobo: number;
  planCode:   string | null;
};

/** Called by the client before opening Paystack popup for a plan upgrade. */
export async function initUpgrade(tier: SubscriptionTier): Promise<InitUpgradeResult> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("unauthenticated");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) throw new Error("no_vendor");

  const config = TIER[tier];
  if (config.priceNGN === 0) throw new Error("cannot_pay_for_free_tier");

  const reference = `SH-SUB-${vendor.id}-${tier}-${Date.now()}`;
  return {
    reference,
    amountKobo: config.priceNGN * 100,
    planCode:   config.paystackPlanCode,
  };
}

/** Called after Paystack confirms the subscription payment. */
export async function applyUpgrade(
  tier: SubscriptionTier,
  reference: string,
): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const isDev     = !secretKey || secretKey.startsWith("sk_test_xxx");

  if (!isDev) {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secretKey}` } },
    );
    if (!res.ok) throw new Error("paystack_api_error");

    type Response = { status: boolean; data: { status: string } };
    const json = (await res.json()) as Response;
    if (!json.status || json.data.status !== "success") throw new Error("payment_not_confirmed");
  }

  await prisma.$transaction([
    prisma.vendor.update({
      where: { id: vendor.id },
      data:  { subscriptionTier: tier, subscriptionStatus: "ACTIVE" },
    }),
    prisma.subscription.create({
      data: {
        vendorId:        vendor.id,
        tier,
        paystackPlanCode: TIER[tier].paystackPlanCode,
        status:          "ACTIVE",
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  redirect("/dashboard/settings?upgraded=1");
}
