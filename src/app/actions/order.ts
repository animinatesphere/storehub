"use server";

import { prisma } from "@/lib/prisma";

export type PendingOrderResult = {
  orderId:          string;
  reference:        string;
  amountKobo:       number;
  subaccountCode:   string | null;
  transactionCharge: number | null; // kobo; null = no commission split
};

export async function createPendingOrder(formData: FormData): Promise<PendingOrderResult> {
  const productId  = (formData.get("productId")  as string | null)?.trim();
  const buyerName  = (formData.get("name")        as string | null)?.trim() || null;
  const buyerEmail = (formData.get("email")       as string | null)?.trim().toLowerCase();
  const buyerPhone = (formData.get("phone")       as string | null)?.trim() || null;

  if (!productId || !buyerEmail) throw new Error("missing_fields");

  const [product, commissionSetting] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId, status: "ACTIVE" },
      include: { vendor: { select: { id: true, paystackSubaccountCode: true } } },
    }),
    prisma.platformSetting.findUnique({ where: { key: "commission_percent" } }).catch(() => null),
  ]);

  if (!product) throw new Error("product_not_found");

  // Guest-friendly: find or create customer by email
  let customer = await prisma.user.findUnique({ where: { email: buyerEmail } });
  if (!customer) {
    customer = await prisma.user.create({
      data: { email: buyerEmail, name: buyerName, role: "CUSTOMER" },
    });
  } else if (buyerName && !customer.name) {
    customer = await prisma.user.update({
      where: { id: customer.id },
      data:  { name: buyerName },
    });
  }

  const reference = `SH-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const amount    = Number(product.price);

  const order = await prisma.order.create({
    data: {
      customerId:        customer.id,
      vendorId:          product.vendor.id,
      items:             [{ productId: product.id, title: product.title, quantity: 1, price: amount }],
      totalAmount:       amount,
      paymentStatus:     "PENDING",
      paystackReference: reference,
    },
  });

  const commissionPercent  = parseFloat(commissionSetting?.value ?? "0") || 0;
  const subaccountCode     = product.vendor.paystackSubaccountCode;
  const transactionCharge  =
    subaccountCode && commissionPercent > 0
      ? Math.round(amount * (commissionPercent / 100) * 100) // kobo
      : null;

  return {
    orderId:           order.id,
    reference,
    amountKobo:        Math.round(amount * 100),
    subaccountCode,
    transactionCharge,
  };
}

export async function verifyOrder(reference: string): Promise<{ orderId: string }> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || secretKey.startsWith("sk_test_xxx")) {
    // Dev mode: skip real verification, just mark as paid
    const order = await prisma.order.update({
      where: { paystackReference: reference },
      data:  { paymentStatus: "PAID" },
      select: { id: true },
    });
    return { orderId: order.id };
  }

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secretKey}` } },
  );
  if (!res.ok) throw new Error("paystack_api_error");

  type PaystackVerifyResponse = { status: boolean; data: { status: string } };
  const json = (await res.json()) as PaystackVerifyResponse;
  if (!json.status || json.data.status !== "success") throw new Error("payment_not_successful");

  const order = await prisma.order.update({
    where: { paystackReference: reference },
    data:  { paymentStatus: "PAID" },
    select: { id: true },
  });
  return { orderId: order.id };
}
