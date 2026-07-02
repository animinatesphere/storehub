/**
 * Creates the admin + vendor account.
 * Run: npm run seed
 */

import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env") });

import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const ADMIN_EMAIL    = "clientflowagent@gmail.com";
const ADMIN_PASSWORD = "StoreHub@2026";
const BUSINESS_NAME  = "StoreHub Admin";
const USERNAME       = "admin";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set — check your .env file");

  const adapter = new PrismaNeon({ connectionString: url });
  const prisma  = new PrismaClient({ adapter } as never);

  try {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const user = await prisma.user.upsert({
      where:  { email: ADMIN_EMAIL },
      create: {
        email:        ADMIN_EMAIL,
        name:         "Adeyemi Pelumi",
        passwordHash: hash,
        role:         "ADMIN",
      },
      update: {
        passwordHash: hash,
        role:         "ADMIN",
        name:         "Adeyemi Pelumi",
      },
    });

    console.log("✓ User:", user.email, "| role:", user.role);

    const vendor = await prisma.vendor.upsert({
      where:  { userId: user.id },
      create: {
        userId:           user.id,
        businessName:     BUSINESS_NAME,
        username:         USERNAME,
        category:         "PHYSICAL_GOODS",
        subscriptionTier: "BUSINESS",
      },
      update: {
        subscriptionTier: "BUSINESS",
      },
    });

    console.log("✓ Vendor:", vendor.businessName, "| tier:", vendor.subscriptionTier);
    console.log("");
    console.log("─────────────────────────────────────────");
    console.log("  Login : http://localhost:3000/login");
    console.log("  Email :", ADMIN_EMAIL);
    console.log("  Pass  :", ADMIN_PASSWORD);
    console.log("  Admin : http://localhost:3000/admin");
    console.log("─────────────────────────────────────────");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
