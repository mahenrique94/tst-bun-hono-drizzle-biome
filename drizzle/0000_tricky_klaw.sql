CREATE TABLE IF NOT EXISTS "user" (
	"created_at" timestamp,
	"email" varchar(255),
	"id" serial NOT NULL,
	"name" varchar(120),
	"password" varchar(255),
	"updated_at" timestamp
);
