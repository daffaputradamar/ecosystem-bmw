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

    const imageUrl = product.image_url.substring(product.image_url.lastIndexOf("/") + 1); 
    await deleteUTFiles([imageUrl]);

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
