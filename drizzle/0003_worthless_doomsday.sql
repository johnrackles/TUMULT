CREATE TABLE IF NOT EXISTS "floors" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"name" text NOT NULL,
	"location_id" integer
);
