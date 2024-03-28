import path from "node:path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

await migrate(db, {
	migrationsFolder: path.resolve(import.meta.dirname, "..", "..", "drizzle"),
});
