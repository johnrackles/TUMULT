import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
/**
 * update updated_at on every update
 * function taken from:
 * https://stackoverflow.com/a/67591826/3909521
 *
 * CREATE TRIGGER upd_trig BEFORE UPDATE ON floors
   FOR EACH ROW EXECUTE PROCEDURE upd_trig();
 */

export const parties = pgTable(
  "parties",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    name: text("name").notNull().default("TUMULT"),
    begin: timestamp("begin", { withTimezone: true, mode: "date" }),
    end: timestamp("end", { withTimezone: true, mode: "date" }),
    location: integer("location_id").references(() => locations.id, {
      onDelete: "set null",
    }),
    slug: text("slug").notNull().unique(),
    description: text("description").default(""),
  },
  (table) => {
    return { slugIdx: index("slug_idx").on(table.slug) };
  },
);

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: text("name").notNull().unique(),
  street: text("street").notNull(),
  zip: text("zip").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull().default("Germany"),
});

export const insertLocationsSchema = z.object({
  name: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1).default("Germany"),
});
export const editLocationSchema = z.object({
  name: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export const floors = pgTable("floors", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: text("name").notNull(),
  locationId: integer("location_id"),
});

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: text("name").notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  floors: many(floors),
}));

export const floorsRelations = relations(floors, ({ one, many }) => ({
  locations: one(locations, {
    fields: [floors.locationId],
    references: [locations.id],
  }),
  artists: many(artists),
}));
