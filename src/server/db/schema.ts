import { sql } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `ecobmw_${name}`);

export const products = createTable(
    "products",
    {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
      description: text("description").notNull(),
      price: numeric("price").notNull(),
      image_url: varchar("url", { length: 1024 }).notNull(),
  
      userId: serial("userId").notNull(),
  
      createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
      updatedAt: timestamp("updatedAt"),
    }
  );

export type ProductType = typeof products.$inferSelect;
  
export const userRoleEnum = pgEnum('role', ['user', 'admin']);  

export const users = createTable(
    "users",
    {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
      username: varchar("username", { length: 20 }).notNull(),
      password: varchar("password", { length: 256 }).notNull(), 
      role: userRoleEnum("role").notNull(),
  
      createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
      updatedAt: timestamp("updatedAt"),
    }
  );
  
export type UserType = typeof users.$inferSelect; 
