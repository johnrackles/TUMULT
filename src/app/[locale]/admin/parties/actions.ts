"use server";

import { db } from "@/db/db";
import { insertPartySchema, parties } from "@/db/party/schema";
import { type z } from "zod";

export async function addParty(values: z.infer<typeof insertPartySchema>) {
  try {
    const validated = insertPartySchema.parse(values);
    await db.insert(parties).values(validated);
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to add party" };
  }
}
