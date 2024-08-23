"use server"

import { InsertProductSchema, InsertProductSchemaType } from "@/schema/product";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

export async function CreateProduct(form: InsertProductSchemaType) {
  const parsedBody = InsertProductSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error("Bad Request");
  }

  const { name, description, price, image_url } = parsedBody.data;
  await db.insert(products).values({
    name,
    description,
    price,
    image_url
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");

  return parsedBody.data;
}