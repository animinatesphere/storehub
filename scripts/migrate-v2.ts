/**
 * Adds new columns/tables for admin v2 features.
 * Run: npx tsx scripts/migrate-v2.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });

import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");

  const sql = neon(url);

  console.log("Running migration v2…");

  // 1. VendorStatus enum
  await sql`
    DO $$ BEGIN
      CREATE TYPE "VendorStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;
  console.log("✓ VendorStatus enum");

  // 2. vendors: status + is_verified
  await sql`
    ALTER TABLE "vendors"
      ADD COLUMN IF NOT EXISTS "status"      "VendorStatus" NOT NULL DEFAULT 'ACTIVE',
      ADD COLUMN IF NOT EXISTS "is_verified" BOOLEAN        NOT NULL DEFAULT false
  `;
  console.log("✓ vendors.status + is_verified");

  // 3. users: is_suspended
  await sql`
    ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "is_suspended" BOOLEAN NOT NULL DEFAULT false
  `;
  console.log("✓ users.is_suspended");

  // 4. announcements table
  await sql`
    CREATE TABLE IF NOT EXISTS "announcements" (
      "id"         TEXT        NOT NULL,
      "title"      TEXT        NOT NULL,
      "body"       TEXT        NOT NULL,
      "is_active"  BOOLEAN     NOT NULL DEFAULT true,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
    )
  `;
  console.log("✓ announcements table");

  // 5. vendor_notices table
  await sql`
    CREATE TABLE IF NOT EXISTS "vendor_notices" (
      "id"         TEXT        NOT NULL,
      "vendor_id"  TEXT        NOT NULL,
      "title"      TEXT        NOT NULL,
      "body"       TEXT        NOT NULL,
      "is_read"    BOOLEAN     NOT NULL DEFAULT false,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "vendor_notices_pkey" PRIMARY KEY ("id")
    )
  `;
  await sql`
    DO $$ BEGIN
      ALTER TABLE "vendor_notices"
        ADD CONSTRAINT "vendor_notices_vendor_id_fkey"
        FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "vendor_notices_vendor_id_idx" ON "vendor_notices"("vendor_id")
  `;
  console.log("✓ vendor_notices table");

  // 6. platform_settings table
  await sql`
    CREATE TABLE IF NOT EXISTS "platform_settings" (
      "key"        TEXT        NOT NULL,
      "value"      TEXT        NOT NULL,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("key")
    )
  `;
  // Seed defaults
  await sql`
    INSERT INTO "platform_settings" ("key", "value", "updated_at") VALUES
      ('commission_percent', '0',     CURRENT_TIMESTAMP),
      ('maintenance_mode',   'false', CURRENT_TIMESTAMP)
    ON CONFLICT ("key") DO NOTHING
  `;
  console.log("✓ platform_settings table + defaults");

  // 7. storefront_settings: default templateId
  await sql`
    ALTER TABLE "storefront_settings"
      ALTER COLUMN "template_id" SET DEFAULT 'minimal'
  `;
  console.log("✓ storefront_settings.template_id default");

  console.log("\n✅ Migration v2 complete.");
}

main().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
