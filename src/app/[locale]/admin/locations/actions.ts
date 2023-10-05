"use server";

import { db } from "@/db/db";
import { insertLocationsSchema, locations } from "@/db/party/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type z } from "zod";

export async function addLocation(
  values: z.infer<typeof insertLocationsSchema>,
) {
  try {
    const validated = insertLocationsSchema.parse(values);
    const rows = await db
      .insert(locations)
      .values(validated)
      .returning({ id: locations.id });

    revalidatePath("/admin/locations");
    redirect(`/admin/locations/${rows[0]?.id}`);
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to create location" };
  }
}
