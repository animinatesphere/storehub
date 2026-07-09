"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma/client";

/** Validate credentials and return role. Returns null on bad credentials. */
export async function validateCredentials(
  email: string,
  password: string,
): Promise<{ role: UserRole } | null> {
  const user = await prisma.user.findUnique({
    where:  { email },
    select: { passwordHash: true, role: true },
  });
  if (!user?.passwordHash) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return { role: user.role };
}

/** Create a new user. Returns the new user's role or an error key. */
export async function createUser(formData: FormData): Promise<{ role?: UserRole; error?: string }> {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const name     = formData.get("name")     as string;
  const role     = (formData.get("role") as string) === "vendor"
    ? UserRole.VENDOR
    : UserRole.CUSTOMER;

  if (!email || !password || password.length < 8) {
    return { error: "invalid_fields" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "email_taken" };

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { email, name, passwordHash, role } });
  return { role };
}
