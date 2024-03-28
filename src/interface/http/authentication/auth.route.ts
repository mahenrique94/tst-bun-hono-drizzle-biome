import type { Hono } from "hono";
import { signIn, signUp } from "./auth.controller";

const auth = (app: Hono) => {
	app.post("/sign-in", signIn);
	app.post("/sign-up", signUp);
};

export { auth };
