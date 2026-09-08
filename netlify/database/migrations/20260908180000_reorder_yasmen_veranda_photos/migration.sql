UPDATE "apartments"
SET
	"image" = 'assets/yasmen-veranda-penthouse/photo-02.jpg',
	"gallery" = '[
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
	]'::jsonb
WHERE "id" = 'yasmen-veranda-penthouse';
