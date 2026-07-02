// Applies the initial migration via Neon serverless (WebSockets, port 443).
// Use when port 5432 is blocked and prisma migrate dev cannot connect.
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";
import { neonConfig, Pool } from "@neondatabase/serverless";

// Node 22+ has a built-in WebSocket global; use it for the Neon WS driver
neonConfig.webSocketConstructor = globalThis.WebSocket;

config();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}

const __dir = dirname(fileURLToPath(import.meta.url));
const migrationPath = join(
  __dir,
  "../prisma/migrations/20260630000000_init/migration.sql"
);
const migrationSql = readFileSync(migrationPath, "utf-8");

const pool = new Pool({ connectionString: url });

async function run() {
  const client = await pool.connect();
  console.log("Connected to Neon over WebSockets.");

  try {
    await client.query("BEGIN");

    console.log("Applying schema DDL...");
    await client.query(migrationSql);

    console.log("Creating _prisma_migrations tracking table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        checksum VARCHAR(64) NOT NULL,
        finished_at TIMESTAMPTZ,
        migration_name VARCHAR(255) NOT NULL,
        logs TEXT,
        rolled_back_at TIMESTAMPTZ,
        started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        applied_steps_count INTEGER NOT NULL DEFAULT 0
      )
    `);

    const migrationName = "20260630000000_init";
    const { rows } = await client.query(
      `SELECT id FROM _prisma_migrations WHERE migration_name = $1`,
      [migrationName]
    );

    if (rows.length === 0) {
      await client.query(
        `INSERT INTO _prisma_migrations
          (id, checksum, migration_name, finished_at, applied_steps_count)
         VALUES (gen_random_uuid()::text, 'manual', $1, now(), 1)`,
        [migrationName]
      );
      console.log(`Recorded migration: ${migrationName}`);
    } else {
      console.log(`Migration already recorded: ${migrationName}`);
    }

    await client.query("COMMIT");
    console.log("Done. All tables created and migration recorded successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
