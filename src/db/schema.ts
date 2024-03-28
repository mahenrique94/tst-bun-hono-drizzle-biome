import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	createdAt: timestamp("created_at").notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	id: serial("id").notNull().primaryKey(),
	name: varchar("name", { length: 120 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
