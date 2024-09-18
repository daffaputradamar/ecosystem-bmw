"use server";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DeleteProduct(id: number) {
    const product = await db.query.products.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })

    if (!product) {
        throw new Error(`Product not found`);
    }

    const productImages = await db.query.productImages.findMany({
        where: (model, { eq }) => eq(model.product_id, id),
    });

    const imageUrl = product.image_url.substring(product.image_url.lastIndexOf("/") + 1); 

    let productImagesUrl: string[] = [];
    productImages.forEach(image => {
        productImagesUrl.push(image.image_url.substring(image.image_url.lastIndexOf("/") + 1));
    });

    await deleteUTFiles([imageUrl, ...productImagesUrl]);

    await db.delete(products).where(eq(products.id, id)); 

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return {
        success: true,
    }
}


export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
  }
};
