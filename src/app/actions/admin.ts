"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionTier, UserRole, VendorStatus } from "@/generated/prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/");
  return session;
}

// ── Vendor management ────────────────────────────────────────────────────────

export async function adminSetVendorTier(vendorId: string, tier: SubscriptionTier) {
  await requireAdmin();
  await prisma.vendor.update({
    where: { id: vendorId },
    data: { subscriptionTier: tier, subscriptionStatus: "ACTIVE" },
  });
  revalidatePath("/admin/vendors");
  revalidatePath("/dashboard/settings");
}

export async function adminSetOwnTier(tier: SubscriptionTier) {
  const session = await requireAdmin();
  await prisma.vendor.update({
    where: { userId: session.user.id },
    data: { subscriptionTier: tier, subscriptionStatus: "ACTIVE" },
  });
  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings?upgraded=1");
}

export async function adminSetVendorStatus(vendorId: string, status: VendorStatus) {
  await requireAdmin();
  await prisma.vendor.update({ where: { id: vendorId }, data: { status } });
  revalidatePath("/admin/vendors");
}

export async function adminVerifyVendor(vendorId: string, verified: boolean) {
  await requireAdmin();
  await prisma.vendor.update({ where: { id: vendorId }, data: { isVerified: verified } });
  revalidatePath("/admin/vendors");
}

// ── Product moderation ───────────────────────────────────────────────────────

export async function adminArchiveProduct(productId: string) {
  await requireAdmin();
  await prisma.product.update({ where: { id: productId }, data: { status: "ARCHIVED" } });
  revalidatePath("/admin/products");
}

export async function adminRestoreProduct(productId: string) {
  await requireAdmin();
  await prisma.product.update({ where: { id: productId }, data: { status: "DRAFT" } });
  revalidatePath("/admin/products");
}

// ── Order refunds ────────────────────────────────────────────────────────────

export async function adminRefundOrder(orderId: string) {
  await requireAdmin();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { paymentStatus: true, paystackReference: true },
  });
  if (!order || order.paymentStatus !== "PAID") throw new Error("Order is not refundable");

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const isDev     = !secretKey || secretKey.startsWith("sk_test_xxx");

  if (!isDev && order.paystackReference) {
    const res = await fetch("https://api.paystack.co/refund", {
      method:  "POST",
      headers: {
        Authorization:  `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction: order.paystackReference }),
    });
    if (!res.ok) throw new Error("Paystack refund request failed");
  }

  await prisma.order.update({
    where: { id: orderId },
    data:  { paymentStatus: "REFUNDED" },
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}

// ── User management ──────────────────────────────────────────────────────────

export async function adminSetUserRole(userId: string, role: UserRole) {
  await requireAdmin();
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}

export async function adminSetUserSuspended(userId: string, suspended: boolean) {
  await requireAdmin();
  await prisma.user.update({ where: { id: userId }, data: { isSuspended: suspended } });
  revalidatePath("/admin/users");
}

// ── Announcements ────────────────────────────────────────────────────────────

export async function adminCreateAnnouncement(formData: FormData) {
  await requireAdmin();
  const title = (formData.get("title") as string).trim();
  const body  = (formData.get("body")  as string).trim();
  if (!title || !body) throw new Error("Title and body are required");
  await prisma.announcement.create({ data: { title, body, isActive: true } });
  revalidatePath("/admin/communications");
  revalidatePath("/dashboard");
}

export async function adminToggleAnnouncement(id: string, isActive: boolean) {
  await requireAdmin();
  await prisma.announcement.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/communications");
  revalidatePath("/dashboard");
}

export async function adminDeleteAnnouncement(id: string) {
  await requireAdmin();
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/communications");
}

export async function adminSendVendorNotice(formData: FormData) {
  await requireAdmin();
  const vendorId = (formData.get("vendorId") as string).trim();
  const title    = (formData.get("title")    as string).trim();
  const body     = (formData.get("body")     as string).trim();
  if (!vendorId || !title || !body) throw new Error("All fields required");
  await prisma.vendorNotice.create({ data: { vendorId, title, body } });
  revalidatePath("/admin/communications");
}

// ── Platform settings ────────────────────────────────────────────────────────

export async function adminUpdateSetting(key: string, value: string) {
  await requireAdmin();
  await prisma.platformSetting.upsert({
    where:  { key },
    create: { key, value },
    update: { value },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/dashboard");
}
