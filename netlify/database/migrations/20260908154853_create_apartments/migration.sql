CREATE TABLE "apartments" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"location" text DEFAULT 'Egypt' NOT NULL,
	"type" text DEFAULT 'Apartment' NOT NULL,
	"price_per_night" integer,
	"price_note" text DEFAULT 'Price on request' NOT NULL,
	"image" text DEFAULT 'assets/accommodation-sea-apartment.jpg' NOT NULL,
	"gallery" jsonb DEFAULT '[]' NOT NULL,
	"amenities" jsonb DEFAULT '[]' NOT NULL,
	"map_embed" text DEFAULT 'https://www.google.com/maps?q=Egypt&output=embed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

INSERT INTO "apartments" (
	"id",
	"title",
	"description",
	"location",
	"type",
	"price_note",
	"image",
	"gallery",
	"amenities",
	"map_embed"
) VALUES (
	'r6',
	'This is test appartment',
	'Testing this',
	'Egypt',
	'Apartment',
	'Price on request',
	'assets/accommodation-sea-apartment.jpg',
	'["assets/accommodation-sea-apartment.jpg"]'::jsonb,
	'["Contact us for apartment details"]'::jsonb,
	'https://www.google.com/maps?q=Egypt&output=embed'
);
