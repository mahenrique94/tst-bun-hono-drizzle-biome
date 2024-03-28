import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timing } from "hono/timing";

import { config } from "./config";
import { auth } from "./interface/http/authentication/auth.route";

const app = new Hono()
	.basePath("/api")
	.use(logger())
	.use(timing())
	.use("/api/*", cors());

auth(app);

export default {
	port: config.API_PORT,
	fetch: app.fetch,
};
