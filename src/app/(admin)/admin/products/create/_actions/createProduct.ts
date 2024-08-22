"use server"

import { InsertProductSchema, InsertProductSchemaType } from "@/schema/product";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
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

  return parsedBody.data;
}