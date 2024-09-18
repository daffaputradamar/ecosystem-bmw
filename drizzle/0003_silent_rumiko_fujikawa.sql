CREATE TABLE IF NOT EXISTS "ecobmw_product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
