import { users } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

export const InsertUserSchema = createInsertSchema(users, {
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin"]).default("user"),
});
export type InsertUserSchemaType = z.infer<typeof InsertUserSchema>;

export const UserSchema = createSelectSchema(users)
export type UserSchemaType = z.infer<typeof UserSchema>;