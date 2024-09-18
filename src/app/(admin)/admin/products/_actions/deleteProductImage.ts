"use server";
import { db } from "@/server/db";
import { productImages } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DeleteProductImage(id: number) {
    const productImage = await db.query.productImages.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })

    if (!productImage) {
        throw new Error(`Product Image not found`);
    }

    const imageUrl = productImage.image_url.substring(productImage.image_url.lastIndexOf("/") + 1); 
    await deleteUTFiles([imageUrl]);

    await db.delete(productImages).where(eq(productImages.id, id));  

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
