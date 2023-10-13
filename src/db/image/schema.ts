import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { users } from "../auth/schema";

export const images = pgTable("images", {
  id: text("id").notNull().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: text("name").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  user: text("user_id").notNull(),
});

export const imageRelations = relations(images, ({ one }) => ({
  user: one(users, {
    fields: [images.user],
    references: [users.id],
  }),
}));

export const deleteImageSchema = z.object({ id: z.string().min(1) });
