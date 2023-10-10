"use server";

import { authOptions } from "@/auth/auth";
import { db } from "@/db/db";
import {
  artists,
  deleteArtistSchema,
  editArtistSchema,
  insertArtistSchema,
} from "@/db/party/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type z } from "zod";

export async function addArtist(values: z.infer<typeof insertArtistSchema>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  try {
    const validated = insertArtistSchema.parse(values);

    const rows = await db.insert(artists).values(validated).returning({ id: artists.id });

    revalidatePath("/[locale]/admin/artists", "layout");
    redirect(`/admin/artists/${rows[0]?.id}`);
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to create artist" };
  }
}

export async function editArtist(values: z.infer<typeof editArtistSchema>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  try {
    const validated = editArtistSchema.parse(values);

    await db.update(artists).set(validated).returning({ id: artists.id });

    revalidatePath("/[locale]/admin/artists", "layout");
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to edit artist" };
  }
}

export async function deleteArtist(values: z.infer<typeof deleteArtistSchema>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  try {
    const validated = deleteArtistSchema.parse(values);

    await db.delete(artists).where(eq(artists.id, validated.id));

    revalidatePath("/[locale]/admin/artists", "layout");
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to edit artist" };
  }
}
