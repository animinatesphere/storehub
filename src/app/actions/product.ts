"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProductStatus } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { canAddProduct } from "@/lib/tier";

async function getVendorOrRedirect() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");
  return vendor;
}

export async function createProduct(formData: FormData): Promise<void> {
  const vendor = await getVendorOrRedirect();

  // Tier limit check
  const currentCount = await prisma.product.count({ where: { vendorId: vendor.id } });
  if (!canAddProduct(vendor.subscriptionTier, currentCount)) {
    redirect("/dashboard/products/new?error=plan_limit");
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const priceStr = (formData.get("price") as string)?.trim();
  const stockStr = (formData.get("stockCount") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const status = (formData.get("status") as ProductStatus) ?? ProductStatus.DRAFT;

  if (!title || !priceStr) redirect("/dashboard/products/new?error=missing_fields");

  const price = parseFloat(priceStr);
  if (isNaN(price) || price < 0) redirect("/dashboard/products/new?error=invalid_price");

  await prisma.product.create({
    data: {
      vendorId: vendor.id,
      title,
      description,
      price: price.toFixed(2),
      images: imageUrl ? [imageUrl] : [],
      stockCount: stockStr ? parseInt(stockStr, 10) || null : null,
      status,
    },
  });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function setProductStatus(productId: string, status: ProductStatus): Promise<void> {
  const vendor = await getVendorOrRedirect();
  await prisma.product.updateMany({
    where: { id: productId, vendorId: vendor.id },
    data: { status },
  });
  revalidatePath("/dashboard/products");
}

export async function deleteProduct(productId: string): Promise<void> {
  const vendor = await getVendorOrRedirect();
  await prisma.product.deleteMany({
    where: { id: productId, vendorId: vendor.id },
  });
  revalidatePath("/dashboard/products");
}
