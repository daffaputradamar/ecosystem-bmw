"use server";
import { db } from "@/server/db";
import { productImages, products } from "@/server/db/schema";
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

    const existedProductImages = await db.query.productImages.findMany({
        where: (model, { eq }) => eq(model.product_id, id),
    });

    const imageUrl = product.image_url.substring(product.image_url.lastIndexOf("/") + 1); 

    let productImagesUrl: string[] = [];
    existedProductImages.forEach(image => {
        productImagesUrl.push(image.image_url.substring(image.image_url.lastIndexOf("/") + 1));
    });

    try {
      await deleteUTFiles([imageUrl, ...productImagesUrl]);
    } catch (error) {
        console.error("Error deleting files", error);
    }

    await db.delete(productImages).where(eq(productImages.product_id, id)); 
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
