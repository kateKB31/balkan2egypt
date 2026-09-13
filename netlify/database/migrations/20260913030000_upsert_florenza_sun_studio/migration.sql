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
	'florenza-sun-studio',
	'FLORENZA SUN STUDIO – Studio in Florenza Khamsin, Hurghada',
	'🏖️ STUDIO IN HURGHADA – ONLY €35 FOR TWO GUESTS!

✨ Located in Florenza Khamsin Compound, Arabia, Hurghada.

🏠 Comfortable studio with:
🏊‍♀️ Pool view
🌊 Just a few steps from the beach
🏖️ Beach access
👫 Ideal for 2 guests

📍 Excellent Location:
🚶‍♀️ Approximately 10 minutes walking to Sheraton Street
⚓ Approximately 10 minutes walking to Hurghada Marina
🛒 Supermarkets, restaurants, cafés and shops are nearby

📍 Arabia, Hurghada

💰 Price: €35 per night for 2 guests

Balkan2Egypt provides full support and information regarding accommodation, booking and your stay.

📲 Viber / WhatsApp: +389 75 225 065',
	'Arabia, Hurghada',
	'Studio',
	35,
	'€35 per night for 2 guests',
	'assets/florenza-sun-studio/photo-01.jpeg',
	'[
		"assets/florenza-sun-studio/photo-01.jpeg",
		"assets/florenza-sun-studio/photo-02.jpeg",
		"assets/florenza-sun-studio/photo-03.jpeg",
		"assets/florenza-sun-studio/photo-04.jpeg",
		"assets/florenza-sun-studio/photo-05.jpeg",
		"assets/florenza-sun-studio/photo-06.jpeg",
		"assets/florenza-sun-studio/photo-07.jpeg",
		"assets/florenza-sun-studio/photo-08.jpeg",
		"assets/florenza-sun-studio/photo-09.jpeg",
		"assets/florenza-sun-studio/photo-10.jpeg",
		"assets/florenza-sun-studio/photo-11.jpeg"
	]'::jsonb,
	'[
		"Pool view",
		"Just a few steps from the beach",
		"Beach access",
		"Ideal for 2 guests",
		"Approximately 10 minutes walking to Sheraton Street",
		"Approximately 10 minutes walking to Hurghada Marina",
		"Supermarkets, restaurants, cafés and shops nearby"
	]'::jsonb,
	'https://www.google.com/maps?q=Florenza%20Khamsin%20Compound%2C%20Arabia%2C%20Hurghada%2C%20Egypt&output=embed'
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
