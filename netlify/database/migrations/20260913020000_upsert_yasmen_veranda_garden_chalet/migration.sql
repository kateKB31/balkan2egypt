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
	'yasmen-veranda-garden-chalet',
	'YASMEN VERANDA GARDEN CHALET– Luxury Two Bedroom Chalet in Veranda Sahl Hasheesh',
	'Enjoy a luxurious and peaceful stay in this beautiful two-bedroom chalet located in Veranda Sahl Hasheesh, one of the most prestigious residential destinations on the Red Sea coast near Hurghada.

Designed for comfort, privacy and relaxation, the chalet can accommodate up to four guests and offers swimming pools, a spacious private garden and access to the beach.

Property Features:

✨ 2 spacious bedrooms
✨ Accommodation for up to 4 guests
✨ Swimming pools
✨ Large private garden
✨ Fully equipped chalet
✨ Private beach access
✨ Peaceful and secure environment
✨ Located within the prestigious Veranda Sahl Hasheesh community

Rental Price:

💰 €75 per night

The property is an ideal choice for couples, families or friends looking for a comfortable and exclusive holiday experience in Sahl Hasheesh.

Enjoy the privacy of your own garden and pool while being surrounded by the elegant architecture and peaceful atmosphere of Veranda Sahl Hasheesh. Its location also provides easy access to the beautiful Red Sea coastline and the attractions of the surrounding area.  

GOLF CART SERVICE:

Veranda offers a convenient golf cart service for residents and tenants from 9:00 AM to 5:00 PM. The service provides easy transportation within the area, including access to the beach, market and Old Town.

The golf cart service is free of charge for tenants residing in the Veranda area.



For photos, availability and booking information, please contact Balkan2Egypt directly.',
	'Veranda Sahl Hasheesh, Hurghada, Egypt',
	'Two Bedroom Chalet',
	75,
	'€75 per night',
	'assets/yasmen-veranda-garden-chalet/photo-01.jpg',
	'[
		"assets/yasmen-veranda-garden-chalet/photo-01.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-02.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-03.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-04.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-05.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-06.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-07.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-08.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-09.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-10.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-11.jpg",
		"assets/yasmen-veranda-garden-chalet/photo-12.jpg"
	]'::jsonb,
	'[
		"2 spacious bedrooms",
		"Accommodation for up to 4 guests",
		"Swimming pools",
		"Large private garden",
		"Fully equipped chalet",
		"Private beach access",
		"Peaceful and secure environment",
		"Located within the prestigious Veranda Sahl Hasheesh community",
		"Free golf cart service from 9:00 AM to 5:00 PM"
	]'::jsonb,
	'https://www.google.com/maps?q=Veranda%20Sahl%20Hasheesh%2C%20Hurghada%2C%20Egypt&output=embed'
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
