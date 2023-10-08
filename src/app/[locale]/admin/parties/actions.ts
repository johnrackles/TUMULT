"use server";

import { utapi } from "@/app/api/uploadthing/api";
import { authOptions } from "@/auth/auth";
import { db } from "@/db/db";
import { deleteImageSchema, images } from "@/db/image/schema";
import { insertPartySchema, parties } from "@/db/party/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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

export async function deleteImage(values: z.infer<typeof deleteImageSchema>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?error=Not%20signed%20in");
  }

  try {
    const validated = deleteImageSchema.parse(values);
    await utapi.deleteFiles([validated.id]);

    await db.delete(images).where(eq(images.id, validated.id));
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "Failed to add party" };
  }
}