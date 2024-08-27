import { users } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

export const InsertUserSchema = createInsertSchema(users, {
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin"]).default("user"),
}).extend({
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const EditUserSchema = createInsertSchema(users, {
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nullable().optional(),
    role: z.enum(["user", "admin"]).default("user"),
  }).extend({
    confirmPassword: z.string().min(6, "Please confirm your password").nullable().optional(),
  }).refine((data) => {
    if (data.password || data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type InsertUserSchemaType = z.infer<typeof InsertUserSchema>;
export type EditUserSchemaType = z.infer<typeof EditUserSchema>;

export const UserSchema = createSelectSchema(users)
export type UserSchemaType = z.infer<typeof UserSchema>;