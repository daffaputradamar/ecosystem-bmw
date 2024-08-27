"use server"

import { EditUserSchema, EditUserSchemaType} from "@/schema/users";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function UpdateUser(form: EditUserSchemaType) {
    const parsedBody = EditUserSchema.safeParse(form);

    if (!parsedBody.success || !parsedBody.data.id) {
        throw new Error("Bad Request");
    }

    const user = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, parsedBody.data.id!),
    })

    if (!user) {
        throw new Error(`User not found`);
    }

    const { name, username, role } = parsedBody.data;
    
    user.name = name;
    user.username = username,
    user.role = role;
    user.updatedAt= new Date();

    await db.update(users).set(user).where(eq(users.id, parsedBody.data.id));

    revalidatePath("/admin/users");

    return parsedBody.data;
}