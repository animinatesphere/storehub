"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData): Promise<void> {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const next     = (formData.get("next")    as string) || "";

  const errUrl = `/login?error=1${next ? `&next=${encodeURIComponent(next)}` : ""}`;

  // Validate credentials ourselves so we can show an error without wrapping signIn in try/catch
  const dbUser = await prisma.user.findUnique({
    where:  { email },
    select: { passwordHash: true, role: true },
  });

  if (!dbUser?.passwordHash) redirect(errUrl);

  const valid = await bcrypt.compare(password, dbUser.passwordHash);
  if (!valid) redirect(errUrl);

  // Credentials are correct — determine destination based on role
  const dest = next || (dbUser.role === UserRole.VENDOR ? "/dashboard" : "/marketplace");

  // Do NOT wrap signIn in try/catch — its NEXT_REDIRECT must propagate to Next.js directly
  await signIn("credentials", { email, password, redirectTo: dest });
}

export async function registerUser(formData: FormData): Promise<void> {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const name     = formData.get("name")     as string;
  const role     = (formData.get("role") as string) === "vendor"
    ? UserRole.VENDOR
    : UserRole.CUSTOMER;

  if (!email || !password || password.length < 8) {
    redirect("/signup?error=invalid_fields");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) redirect("/signup?error=email_taken");

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { email, name, passwordHash, role } });

  const dest = role === UserRole.VENDOR ? "/onboarding" : "/marketplace";

  // Let NEXT_REDIRECT propagate naturally
  await signIn("credentials", { email, password, redirectTo: dest });
}
