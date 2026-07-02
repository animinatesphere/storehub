import type { SubscriptionTier, VendorCategory, VendorStatus } from "@/generated/prisma/enums";

export type SocialLinks = {
  instagram?: string;
  twitter?:   string;
  whatsapp?:  string;
  website?:   string;
};

// Plain interfaces mirroring Prisma model shapes (avoids Prisma 7 naming changes)
export interface StorefrontSettingsShape {
  id:          string;
  vendorId:    string;
  templateId:  string;
  logoUrl:     string | null;
  brandColor:  string | null;
  bioText:     string | null;
  socialLinks: unknown;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface ProductShape {
  id:         string;
  title:      string;
  price:      { toString(): string } | number | string;
  images:     string[];
  stockCount: number | null;
  status:     string;
}

export interface VendorWithSettings {
  id:                     string;
  businessName:           string;
  username:               string;
  category:               VendorCategory;
  status:                 VendorStatus;
  subscriptionTier:       SubscriptionTier;
  storefrontSetting:      StorefrontSettingsShape | null;
  products:               ProductShape[];
}

export interface TemplateProps {
  vendor:   VendorWithSettings;
  username: string;
}

export function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style:                 "currency",
    currency:              "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
