import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { config } from "../config";

const client = new Client({
	connectionString: config.DB_URL,
});

await client.connect();

export const db = drizzle(client);
