"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function registerUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) === "vendor"
    ? UserRole.VENDOR
    : UserRole.CUSTOMER;

  if (!email || !password || password.length < 8) {
    redirect("/signup?error=invalid_fields");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect("/signup?error=email_taken");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { email, name, passwordHash, role },
  });

  try {
    await signIn("credentials", { email, password, redirectTo: role === UserRole.VENDOR ? "/onboarding" : "/marketplace" });
  } catch (e) {
    if (isRedirectError(e)) throw e;
    redirect("/login?error=1");
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const next = (formData.get("next") as string) || "";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: next || "/dashboard",
    });
  } catch (e) {
    if (isRedirectError(e)) throw e;
    redirect(`/login?error=1${next ? `&next=${encodeURIComponent(next)}` : ""}`);
  }
}
