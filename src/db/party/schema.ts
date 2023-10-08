import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { date, z } from "zod";
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
    begin: timestamp("begin", { withTimezone: true, mode: "date" }).notNull(),
    end: timestamp("end", { withTimezone: true, mode: "date" }),
    location: integer("location_id").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").default(""),
    flyer: text("flyer"),
  },
  (table) => {
    return { slugIdx: index("slug_idx").on(table.slug) };
  },
);

export const artistsToParties = pgTable(
  "artists_to_parties",
  {
    partyId: integer("party_id").notNull(),
    artistId: integer("artist_id").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.artistId, t.partyId),
  }),
);

export const partiesRelations = relations(parties, ({ one, many }) => ({
  partyLocation: one(locations, {
    fields: [parties.location],
    references: [locations.id],
  }),
  partyArtists: many(artists),
}));

export const artistsToPartiesRelations = relations(
  artistsToParties,
  ({ one }) => ({
    artist: one(artists, {
      fields: [artistsToParties.artistId],
      references: [artists.id],
    }),
    party: one(parties, {
      fields: [artistsToParties.partyId],
      references: [parties.id],
    }),
  }),
);

export const insertPartySchema = z.object({
  name: z.string().min(1),
  begin: date(),
  end: z.date().optional(),
  location: z.number(),
  slug: z.string().min(1),
  description: z.string().optional(),
  artists: z.array(z.number()).optional().default([]),
  flyer: z.string().optional(),
});

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
  floors: z.array(z.string().min(1)).optional().default([]),
});

export const editLocationSchema = z.object({
  id: z.coerce.number(),
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
  name: text("name").unique().notNull(),
  locationId: integer("location_id"),
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

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: text("name").notNull(),
});

export const artistRelations = relations(artists, ({ many }) => ({
  floors: many(floors),
  parties: many(parties),
}));

export const insertArtistSchema = z.object({
  name: z.string().min(1),
});
export const editArtistSchema = insertArtistSchema.partial();
export const deleteArtistSchema = z.object({
  id: z.number(),
});
