"use server"

import { hashPassword } from "@/lib/utils";
import { InsertUserSchema, InsertUserSchemaType } from "@/schema/users";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export const RegisterUser = async (form: InsertUserSchemaType) => {
  const parsedBody = InsertUserSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error("Bad Request");
  }

  const { username, password, name } = parsedBody.data;

  const existedUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.username, username),
  });

  if (existedUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await hashPassword(password);
  await db.insert(users).values({ username, password: passwordHash, role: "user", name });

  revalidatePath("/admin/users");

  return parsedBody.data;
}