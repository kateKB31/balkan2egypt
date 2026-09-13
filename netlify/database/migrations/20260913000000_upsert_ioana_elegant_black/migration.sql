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
	'ioana-elegant-black',
	'IOANA – ELEGANT BLACK APARTMENT - One Bedroom Apartment in the Center of Hurghada',
	'Enjoy a comfortable stay in this elegant one-bedroom apartment in Marina Palace, located in the center of Hurghada. Its excellent location puts you just minutes away from the beach, Marina, restaurants, cafés and local shops.

Excellent Location:

🏖️ Mama Mia Beach — 100 m
🌴 Sheraton Street — 60 m
⛵ Hurghada Marina — 200 m
🛒 Gomla Market — 50 m

Apartment Features:

✨ 1 bedroom + sofa bed
✨ Fully equipped kitchen
✨ Free WiFi
✨ Filtered water
✨ Access to a private swimming pool
✨ 24/7 security
👨‍👩‍👧‍👦 Suitable for up to 2 adults + 2 children

Price:

💰 €38 per night per apartment

An excellent choice for couples or small families looking for a comfortable stay in the heart of Hurghada, close to the beach and everything you need for a relaxing holiday.',
	'Marina Palace, Center of Hurghada',
	'One Bedroom Apartment',
	38,
	'€38 per night per apartment',
	'assets/accommodation-sea-apartment.jpg',
	'["assets/accommodation-sea-apartment.jpg"]'::jsonb,
	'[
		"1 bedroom + sofa bed",
		"Fully equipped kitchen",
		"Free WiFi",
		"Filtered water",
		"Access to a private swimming pool",
		"24/7 security",
		"Suitable for up to 2 adults + 2 children"
	]'::jsonb,
	'https://www.google.com/maps?q=Marina%20Palace%2C%20Hurghada%2C%20Egypt&output=embed'
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
