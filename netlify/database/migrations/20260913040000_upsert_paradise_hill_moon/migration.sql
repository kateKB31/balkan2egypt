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
	'paradise-hill-moon',
	'PARADISE HILL MOON – Two Bedroom Apartment in Paradise Hill, Arabia',
	'**Paradise Hill, Arabia District, Hurghada • One-Bedroom Apartment**

☀️ Looking for the perfect apartment in Hurghada? Your holiday starts here!

🏡 2 Bedrooms
👨‍👩‍👧‍👦 Up to 5 Guests
🏊 Shared Swimming Pool
🛡️ 24/7 Security
📍 Excellent Location

🚶 Only:
🏖️ 5 minutes to Downtown Beach
🛍️ Walking distance to supermarkets, cafés, restaurants & shops
⛵ 10 minutes to Hurghada Marina
🌴 15 minutes to Sheraton Street

✨ Optional Rooftop SPA with Sea View (extra charge)
💆 Massage • 🛁 Jacuzzi • 🧖 Sauna • Turkish Bath • Steam Room • ☕ Coffee & Tea • 🥐 Breakfast

📩 Message us for prices, available dates & bookings!',
	'Paradise Hill, Arabia District, Hurghada',
	'Two Bedroom Apartment',
	NULL,
	'Price on request',
	'assets/paradise-hill-moon/photo-01.jpg',
	'[
		"assets/paradise-hill-moon/photo-01.jpg",
		"assets/paradise-hill-moon/photo-02.jpg",
		"assets/paradise-hill-moon/photo-03.jpg",
		"assets/paradise-hill-moon/photo-04.jpg",
		"assets/paradise-hill-moon/photo-05.jpg"
	]'::jsonb,
	'[
		"2 Bedrooms",
		"Up to 5 Guests",
		"Shared Swimming Pool",
		"24/7 Security",
		"5 minutes to Downtown Beach",
		"10 minutes to Hurghada Marina",
		"Optional Rooftop SPA with Sea View"
	]'::jsonb,
	'https://www.google.com/maps?q=Paradise%20Hill%2C%20Arabia%20District%2C%20Hurghada%2C%20Egypt&output=embed'
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
