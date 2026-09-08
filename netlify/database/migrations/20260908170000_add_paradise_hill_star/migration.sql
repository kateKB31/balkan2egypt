DELETE FROM "apartments"
WHERE "id" = 'r6';

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
	'paradise-hill-star',
	'PARADISE HILL STAR – One-Bedroom Apartment in Paradise Hill, Arabia',
	'Enjoy a comfortable stay in this cozy one-bedroom apartment in Paradise Hill, Arabia District, Hurghada. It is an affordable and convenient choice for couples, small families or friends, with space for up to 3 guests.

Property Features

• 1 bedroom
• Sleeps up to 3 guests
• Shared swimming pool
• 24/7 security
• Convenient Arabia District location
• €40 per night

Nearby

• 5 minutes to Downtown Beach
• Walking distance to supermarkets, cafés, restaurants and shops
• 10 minutes to Hurghada Marina
• 15 minutes to Sheraton Street

Optional Rooftop SPA

Guests can enjoy an optional rooftop SPA with sea views for an additional charge. Facilities include a Jacuzzi, sauna, Turkish bath, steam room and massage services, with coffee, tea and breakfast options also available.

Contact us directly for availability, more information and booking.',
	'Paradise Hill, Arabia District, Hurghada',
	'One-Bedroom Apartment',
	40,
	'€40 per night • Optional rooftop SPA available for an additional charge',
	'assets/paradise-hill-star/living-room.jpg',
	'["assets/paradise-hill-star/living-room.jpg", "assets/paradise-hill-star/bedroom.jpg", "assets/paradise-hill-star/kitchen.jpg", "assets/paradise-hill-star/bathroom.jpg", "assets/paradise-hill-star/pool-view.jpg", "assets/paradise-hill-star/pool.jpg", "assets/paradise-hill-star/rooftop-spa.jpg"]'::jsonb,
	'["1 bedroom for up to 3 guests", "Shared swimming pool", "24/7 security", "5 minutes from Downtown Beach", "10 minutes from Hurghada Marina", "Shops, cafés and restaurants nearby", "Optional rooftop SPA with sea views", "Jacuzzi, sauna, Turkish bath and steam room"]'::jsonb,
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
