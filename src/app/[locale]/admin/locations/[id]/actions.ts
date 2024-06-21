"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { editLocationSchema, floors, locations } from "@/db/party/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function editLocation(values: z.infer<typeof editLocationSchema>) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  try {
    const validated = editLocationSchema.parse(values);

    await db.update(locations).set(validated);

    revalidatePath("/[locale]/admin/locations", "layout");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to update location" };
  }
}

const editFloorSchema = z.object({
  name: z.string(),
  locationId: z.number(),
});

export async function editFloor(value: z.infer<typeof editFloorSchema>) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  try {
    const validated = editFloorSchema.parse(value);

    await db.insert(floors).values(validated).onConflictDoNothing({
      target: floors.name,
    });
    revalidatePath(`/[locale]/admin/locations/[id]`, "page");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to update floor" };
  }
}

export async function deleteFloor(id: number) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  try {
    await db.delete(floors).where(eq(floors.id, id));

    revalidatePath(`/[locale]/admin/locations`, "layout");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to delete floor" };
  }
}
