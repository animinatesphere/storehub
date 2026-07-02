import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const orders = await prisma.order.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      vendor:   { select: { businessName: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = [
    ["ID", "Date", "Customer Name", "Customer Email", "Vendor", "Status", "Amount (NGN)", "Paystack Ref"],
    ...orders.map((o) => [
      o.id,
      new Date(o.createdAt).toISOString(),
      o.customer.name ?? "",
      o.customer.email ?? "",
      o.vendor.businessName,
      o.paymentStatus,
      Number(o.totalAmount).toFixed(2),
      o.paystackReference ?? "",
    ]),
  ];

  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type":        "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="storehub-orders-${Date.now()}.csv"`,
    },
  });
}
