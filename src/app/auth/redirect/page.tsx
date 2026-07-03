import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function AuthRedirectPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role === UserRole.VENDOR) {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    redirect(vendor ? "/dashboard" : "/onboarding");
  }

  redirect("/marketplace");
}
