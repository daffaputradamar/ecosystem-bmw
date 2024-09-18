"use server"

import { InsertProductSchema, InsertProductSchemaType } from "@/schema/product";
import { db } from "@/server/db";
import { productImages, products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function UpdateProduct(form: InsertProductSchemaType) {
    const parsedBody = InsertProductSchema.safeParse(form);

    if (!parsedBody.success || !parsedBody.data.id) {
        throw new Error("Bad Request");
    }

    const product = await db.query.products.findFirst({
        where: (model, { eq }) => eq(model.id, parsedBody.data.id!),
    })

    if (!product) {
        throw new Error(`Product not found`);
    }

    const oldImageUrl = product.image_url;
    
    const { name, description, price, image_url } = parsedBody.data;
    
    if(!image_url || oldImageUrl != image_url) {
        const imageUrl = oldImageUrl.substring(oldImageUrl.lastIndexOf("/") + 1);
        await deleteUTFiles([imageUrl]);
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.image_url = image_url;
    product.updatedAt= new Date();

    await db.update(products).set(product).where(eq(products.id, parsedBody.data.id));

    await db.insert(productImages).values(form.images.map((image: {url: string}) => ({
        product_id: product.id,
        image_url: image.url
      })));

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return parsedBody.data;
}

export const deleteUTFiles = async (files: string[]) => {
    try {
        await utapi.deleteFiles(files);
    } catch (error) {
        console.error("UTAPI: Error deleting files", error);
    }
};