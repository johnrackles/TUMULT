import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./auth/schema";
import * as imageSchema from "./image/schema";
import * as partySchema from "./party/schema";

const sql = neon(env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, {
  schema: { ...authSchema, ...partySchema, ...imageSchema },
  logger: process.env.NODE_ENV === "development",
});
