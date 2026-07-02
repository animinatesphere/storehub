import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const body      = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // Verify webhook signature
  const expected = crypto
    .createHmac("sha512", secretKey)
    .update(body)
    .digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  type PaystackEvent = {
    event: string;
    data: {
      reference: string;
      status: string;
      amount: number;
    };
  };

  const event = JSON.parse(body) as PaystackEvent;

  if (event.event === "charge.success") {
    const { reference, status } = event.data;

    if (status === "success") {
      await prisma.order.updateMany({
        where: { paystackReference: reference, paymentStatus: "PENDING" },
        data:  { paymentStatus: "PAID" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
