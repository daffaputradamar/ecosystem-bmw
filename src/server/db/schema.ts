import { sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
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

export const productImages = createTable(
    "product_images",
    {
      id: serial("id").primaryKey(),
      product_id: integer("product_id").references(() => products.id),
      image_url: varchar("url", { length: 1024 }).notNull(),
  
      createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
      updatedAt: timestamp("updatedAt"),
    }
  );

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
    },
    (table) => ({
      usernameUniqueIndex: uniqueIndex('usernameUniqueIndex').on(table.username)
    })
  );

