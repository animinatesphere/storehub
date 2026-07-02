import { SubscriptionTier } from "@/generated/prisma/client";

export type TierConfig = {
  label:            string;
  priceNGN:         number;
  maxProducts:      number;   // -1 = unlimited
  analytics:        boolean;
  customBranding:   boolean;
  paystackPlanCode: string | null;
  features:         string[];
  highlight:        boolean;  // badge shown on the card
};

export const TIER: Record<SubscriptionTier, TierConfig> = {
  FREE: {
    label:            "Free",
    priceNGN:         0,
    maxProducts:      5,
    analytics:        false,
    customBranding:   false,
    paystackPlanCode: null,
    highlight:        false,
    features: [
      "Up to 5 products",
      "Public storefront (/shop/username)",
      "Secure Paystack checkout",
      "Email receipt for buyers",
      "ClientFlow marketplace listing",
    ],
  },

  STARTER: {
    label:            "Starter",
    priceNGN:         4_500,
    maxProducts:      25,
    analytics:        false,
    customBranding:   true,
    paystackPlanCode: process.env.PAYSTACK_PLAN_STARTER ?? null,
    highlight:        false,
    features: [
      "Up to 25 products",
      "Everything in Free",
      "Custom bio & brand colour",
      "Store logo upload",
      "4 storefront templates",
      "Social links (IG, Twitter, WhatsApp, website)",
      "WhatsApp 'Chat to order' button",
    ],
  },

  PRO: {
    label:            "Pro",
    priceNGN:         9_900,
    maxProducts:      100,
    analytics:        true,
    customBranding:   true,
    paystackPlanCode: process.env.PAYSTACK_PLAN_PRO ?? null,
    highlight:        true,
    features: [
      "Up to 100 products",
      "Everything in Starter",
      "Analytics dashboard",
      "14-day revenue chart",
      "Top products breakdown",
      "Payment conversion rate",
      "Video ads generator (Remotion)",
      "4 storefront templates",
      "Priority support",
    ],
  },

  BUSINESS: {
    label:            "Business",
    priceNGN:         22_000,
    maxProducts:      -1,
    analytics:        true,
    customBranding:   true,
    paystackPlanCode: process.env.PAYSTACK_PLAN_BUSINESS ?? null,
    highlight:        false,
    features: [
      "Unlimited products",
      "Everything in Pro",
      "Paystack subaccount (direct payouts)",
      "Bulk order management",
      "Video ads generator (Remotion)",
      "Dedicated account manager",
      "Custom domain (coming soon)",
    ],
  },
};

export const TIER_ORDER: SubscriptionTier[] = ["FREE", "STARTER", "PRO", "BUSINESS"];

export function canAddProduct(tier: SubscriptionTier, currentCount: number): boolean {
  const max = TIER[tier].maxProducts;
  return max === -1 || currentCount < max;
}

export function productLimitMessage(tier: SubscriptionTier, currentCount: number): string | null {
  const { maxProducts, label } = TIER[tier];
  if (maxProducts === -1) return null;
  const remaining = maxProducts - currentCount;
  if (remaining <= 0)
    return `Your ${label} plan allows up to ${maxProducts} products. Upgrade to add more.`;
  if (remaining <= 2)
    return `You can add ${remaining} more product${remaining !== 1 ? "s" : ""} on your ${label} plan.`;
  return null;
}
