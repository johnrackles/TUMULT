"use server";

import { db } from "@/db/db";
import { editLocationSchema, locations } from "@/db/party/schema";
import { revalidatePath } from "next/cache";
import { type z } from "zod";

export async function editLocation(values: z.infer<typeof editLocationSchema>) {
  try {
    const validated = editLocationSchema.parse(values);
    await db.update(locations).set(validated);

    revalidatePath("/[locale]/admin/locations", "layout");
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to update location" };
  }
}
