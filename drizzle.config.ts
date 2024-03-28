import type { Config } from "drizzle-kit";
import { config } from "./src/config";

export default {
  dbCredentials: {
    connectionString: config.DB_URL,
  },
  driver: "pg",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  strict: true,
  verbose: true,
} satisfies Config;
