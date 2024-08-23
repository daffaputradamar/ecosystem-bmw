"use server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function DeleteUser(id: number) {
    const user = await db.query.products.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })

    if (!user) {
        throw new Error(`Product not found`);
    }

    await db.delete(users).where(eq(users.id, id));  

    revalidatePath("/admin/users");

    return {
        success: true,
    }
}