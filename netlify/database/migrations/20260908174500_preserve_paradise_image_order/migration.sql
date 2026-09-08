UPDATE "apartments"
SET
	"image" = 'assets/paradise-hill-star/pool.jpg',
	"gallery" = '["assets/paradise-hill-star/pool.jpg", "assets/paradise-hill-star/kitchen.jpg", "assets/paradise-hill-star/rooftop-spa.jpg", "assets/paradise-hill-star/bedroom.jpg", "assets/paradise-hill-star/pool-view.jpg", "assets/paradise-hill-star/bathroom.jpg", "assets/paradise-hill-star/living-room.jpg"]'::jsonb
WHERE "id" = 'paradise-hill-star';
