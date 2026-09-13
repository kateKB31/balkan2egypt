UPDATE "apartments"
SET
	"image" = 'assets/ioana-elegant-black/living-room-wide.jpg',
	"gallery" = '[
		"assets/ioana-elegant-black/living-room-wide.jpg",
		"assets/ioana-elegant-black/living-room-sofa.jpg",
		"assets/ioana-elegant-black/kitchen.jpg",
		"assets/ioana-elegant-black/dining-area.jpg",
		"assets/ioana-elegant-black/bedroom.jpg",
		"assets/ioana-elegant-black/bedroom-storage.jpg",
		"assets/ioana-elegant-black/bathroom.jpg",
		"assets/ioana-elegant-black/private-pool.jpg"
	]'::jsonb
WHERE "id" = 'ioana-elegant-black';
