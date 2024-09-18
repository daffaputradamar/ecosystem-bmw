DO $$ BEGIN
 ALTER TABLE "ecobmw_product_images" ADD CONSTRAINT "ecobmw_product_images_product_id_ecobmw_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."ecobmw_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
