import * as v from "valibot";

const env = v.object({
	API_SECRET: v.string(),
	API_PORT: v.number(),
	DB_SECRET: v.string(),
	DB_URL: v.string(),
});

export const config = v.parse(env, {
	API_SECRET: process.env.API_SECRET,
	API_PORT: Number.parseInt(process.env.API_PORT || "8080"),
	DB_SECRET: process.env.DB_SECRET,
	DB_URL: process.env.DB_URL,
});
