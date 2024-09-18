"use server"

import { InsertProductSchema, InsertProductSchemaType } from "@/schema/product";
import { db } from "@/server/db";
import { productImages, products } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function CreateProduct(form: InsertProductSchemaType) {
  const parsedBody = InsertProductSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error("Bad Request");
  }

  const { name, description, price, image_url } = parsedBody.data;
  const result = await db.insert(products).values({
    name,
    description,
    price,
    image_url
  }).returning();

  await db.insert(productImages).values(form.images.map((image: {url: string}) => ({
    product_id: result[0].id,
    image_url: image.url
  })));

  revalidatePath("/admin/products");
  revalidatePath("/products");

  return parsedBody.data;
}