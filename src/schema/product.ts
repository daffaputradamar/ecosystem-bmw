import { products } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

export const InsertProductSchema = createInsertSchema(products).extend({
    file: z.any().optional(),
    images: z.any().optional(),
});
export type InsertProductSchemaType = z.infer<typeof InsertProductSchema>;

export const ProductSchema = createSelectSchema(products)
export type ProductSchemaType = z.infer<typeof ProductSchema>;