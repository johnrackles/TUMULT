"use server";

import { db } from "@/db/db";
import { floors, insertLocationsSchema, locations } from "@/db/party/schema";
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

    // create floors and link to location
    if (validated.floors?.length > 0) {
      await Promise.all(
        validated.floors.map((floor) =>
          db.insert(floors).values({ name: floor, locationId: rows[0]?.id }),
        ),
      );
    }
    revalidatePath("/[locale]/admin/locations", "page");
    redirect(`/admin/locations/${rows[0]?.id}`);
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to create location" };
  }
}
