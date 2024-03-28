import { and, eq } from "drizzle-orm";
import type { Context } from "hono";
import jwt from "jsonwebtoken";
import * as v from "valibot";
import { config } from "../../../config";
import { db } from "../../../db/index";
import { type NewUser, users } from "../../../db/schema";
import { encryptPassword } from "../../../shared/modules/utils/auth.util";

const signInSchema = v.object({
	email: v.string([v.minLength("x@x.x".length), v.email()]),
	password: v.string([v.minLength(8)]),
});

export const signIn = async (c: Context) => {
	const body = await c.req.json();

	try {
		v.parse(signInSchema, body);

		const result = await db
			.select()
			.from(users)
			.where(
				and(
					eq(users.email, body.email),
					eq(users.password, encryptPassword(body.password)),
				),
			);

		if (result.length === 1) {
			const [user] = result;
			return c.json({
				data: jwt.sign(
					{
						createdAt: user.createdAt,
						email: user.email,
						id: user.id,
						name: user.name,
						updatedAt: user.updatedAt,
					},
					config.API_SECRET,
				),
			});
		}

		c.status(401);
		return c.json({ error: "Email or password invalid!" });
	} catch (error) {
		if (error instanceof v.ValiError) {
			c.status(400);
			return c.json({ error });
		}

		c.status(500);
		return c.json({ error: (error as Error).message });
	}
};

const signUpSchema = v.merge([
	signInSchema,
	v.object({
		name: v.string([v.minLength(2)]),
	}),
]);

export const signUp = async (c: Context) => {
	const body: NewUser = await c.req.json();

	try {
		v.parse(signUpSchema, body);

		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, body.email));

		if (result.length <= 0) {
			await db.insert(users).values({
				createdAt: new Date(),
				email: body.email,
				name: body.name,
				password: encryptPassword(body.password),
				updatedAt: new Date(),
			});

			return c.json({ data: "New account created successfull!" });
		}

		c.status(400);
		return c.json({ error: "Email in use!" });
	} catch (error) {
		if (error instanceof v.ValiError) {
			c.status(400);
			return c.json({ error });
		}

		c.status(500);
		return c.json({ error: (error as Error).message });
	}
};
