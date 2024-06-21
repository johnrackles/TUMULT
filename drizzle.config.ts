import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  schema: ["./src/db/auth/schema.ts", "./src/db/party/schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DRIZZLE_DATABASE_URL,
  },
} satisfies Config;
