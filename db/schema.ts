import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const apartments = pgTable("apartments", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  location: text("location").notNull().default("Egypt"),
  type: text("type").notNull().default("Apartment"),
  pricePerNight: integer("price_per_night"),
  priceNote: text("price_note").notNull().default("Price on request"),
  image: text("image").notNull().default("assets/accommodation-sea-apartment.jpg"),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  amenities: jsonb("amenities").$type<string[]>().notNull().default([]),
  mapEmbed: text("map_embed").notNull().default("https://www.google.com/maps?q=Egypt&output=embed"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
