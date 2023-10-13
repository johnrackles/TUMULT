import type { Config } from "drizzle-kit";
import { env } from "./src/env.mjs";

export default {
  schema: ["./src/db/auth/schema.ts", "./src/db/party/schema.ts"],
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: `${env.DRIZZLE_DATABASE_URL}?sslmode=require`,
  },
} satisfies Config;
