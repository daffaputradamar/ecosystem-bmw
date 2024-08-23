"use server"

import { hashPassword } from "@/lib/utils";
import { InsertUserSchema, InsertUserSchemaType } from "@/schema/users";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const RegisterUser = async (form: InsertUserSchemaType) => {
  const parsedBody = InsertUserSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error("Bad Request");
  }

  const { username, password } = parsedBody.data;

  const existedUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.username, username),
  });

  if (existedUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await hashPassword(password);
  await db.insert(users).values({ username, password: passwordHash, role: "user", name: username });

  return parsedBody.data;
}