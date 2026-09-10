INSERT INTO "apartments" (
	"id",
	"title",
	"description",
	"location",
	"type",
	"price_per_night",
	"price_note",
	"image",
	"gallery",
	"amenities",
	"map_embed"
) VALUES (
	'yasmen-veranda-penthouse',
	'YASMEN VERANDA PENTHOUSE - Luxury Two-Bedroom Penthouse in Sahl Hasheesh VERANDA',
	'Experience a comfortable and relaxing stay in this beautiful two-bedroom penthouse located in Sahl Hasheesh, one of the most exclusive areas on the Red Sea coast near Hurghada.

The penthouse offers two comfortable bedrooms and access to excellent residential facilities, making it an ideal choice for a relaxing holiday or short stay in Egypt.

PROPERTY FEATURES:

• 2 bedrooms
• Swimming pools
• Fully equipped gym
• Tennis courts
• Hockey facilities
• Exclusive location in Sahl Hasheesh

GOLF CART SERVICE:

Veranda offers a convenient golf cart service for residents and tenants from 9:00 AM to 5:00 PM. The service provides easy transportation within the area, including access to the beach, market and Old Town.

The golf cart service is free of charge for tenants residing in the Veranda area.

Whether you are looking for a relaxing holiday by the Red Sea or a comfortable place for a short stay in Egypt, this penthouse offers an excellent combination of location, comfort and available facilities.

For photos, availability and booking information, please contact us directly.',
	'Sahl Hasheesh, Hurghada, Egypt',
	'Penthouse',
	75,
	'€75 per night',
	'assets/yasmen-veranda-penthouse/photo-02.jpg',
	'[
		"assets/yasmen-veranda-penthouse/photo-02.jpg",
		"assets/yasmen-veranda-penthouse/photo-03.webp",
		"assets/yasmen-veranda-penthouse/photo-04.webp",
		"assets/yasmen-veranda-penthouse/photo-05.png",
		"assets/yasmen-veranda-penthouse/photo-06.jpeg",
		"assets/yasmen-veranda-penthouse/photo-07.jpeg",
		"assets/yasmen-veranda-penthouse/photo-08.jpeg",
		"assets/yasmen-veranda-penthouse/photo-09.jpeg",
		"assets/yasmen-veranda-penthouse/photo-10.jpeg",
		"assets/yasmen-veranda-penthouse/photo-11.jpeg",
		"assets/yasmen-veranda-penthouse/photo-12.jpeg",
		"assets/yasmen-veranda-penthouse/photo-13.jpeg",
		"assets/yasmen-veranda-penthouse/photo-14.jpeg",
		"assets/yasmen-veranda-penthouse/photo-15.jpeg",
		"assets/yasmen-veranda-penthouse/photo-16.jpeg",
		"assets/yasmen-veranda-penthouse/photo-01.jpg"
	]'::jsonb,
	'[
		"2 bedrooms",
		"Swimming pools",
		"Fully equipped gym",
		"Tennis courts",
		"Hockey facilities",
		"Exclusive location in Sahl Hasheesh",
		"Free golf cart service from 9:00 AM to 5:00 PM",
		"Transport to the beach, market and Old Town"
	]'::jsonb,
	'https://www.google.com/maps?q=Sahl%20Hasheesh%2C%20Hurghada%2C%20Egypt&output=embed'
)
ON CONFLICT ("id") DO UPDATE SET
	"title" = EXCLUDED."title",
	"description" = EXCLUDED."description",
	"location" = EXCLUDED."location",
	"type" = EXCLUDED."type",
	"price_per_night" = EXCLUDED."price_per_night",
	"price_note" = EXCLUDED."price_note",
	"image" = EXCLUDED."image",
	"gallery" = EXCLUDED."gallery",
	"amenities" = EXCLUDED."amenities",
	"map_embed" = EXCLUDED."map_embed";
