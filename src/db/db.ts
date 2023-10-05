import { env } from "@/env.mjs";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./auth/schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, { schema: { authSchema } });
