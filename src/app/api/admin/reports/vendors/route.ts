import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const vendors = await prisma.vendor.findMany({
    include: {
      user:   { select: { email: true } },
      _count: { select: { products: true, orders: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = [
    ["ID", "Business Name", "Username", "Email", "Category", "Plan", "Status", "Verified", "Products", "Orders", "Joined"],
    ...vendors.map((v) => [
      v.id,
      v.businessName,
      v.username,
      v.user.email ?? "",
      v.category,
      v.subscriptionTier,
      v.status,
      v.isVerified ? "Yes" : "No",
      v._count.products,
      v._count.orders,
      new Date(v.createdAt).toISOString(),
    ]),
  ];

  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type":        "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="storehub-vendors-${Date.now()}.csv"`,
    },
  });
}
