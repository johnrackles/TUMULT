import { db } from "@/db/db";
import { images } from "@/db/image/schema";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
      zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null,
    };
  },
});

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .input(z.object({ id: z.string().min(1) }))
    // Set permissions and file types for this FileRoute
    .middleware(({ input }) => {
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: input.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      await db.insert(images).values({
        name: file.name,
        size: file.size,
        id: file.key,
        url: file.url,
        user: metadata.userId,
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
