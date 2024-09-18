import { productImages } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

export const InsertProductImageSchema = createInsertSchema(productImages);
export type InsertProductImageSchemaType = z.infer<typeof InsertProductImageSchema>;

export const ProductImageSchema = createSelectSchema(productImages)
export type ProductImageSchemaType = z.infer<typeof ProductImageSchema>;