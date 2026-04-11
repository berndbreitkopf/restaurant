import { pgTable, text, serial, timestamp, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const menuItemsTable = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAmharic: text("name_amharic"),
  description: text("description").notNull(),
  price: real("price").notNull(),
  category: text("category").notNull(),
  isVegan: boolean("is_vegan").notNull().default(false),
  isVegetarian: boolean("is_vegetarian").notNull().default(false),
  isGlutenFree: boolean("is_gluten_free").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(true),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertMenuItemSchema = createInsertSchema(menuItemsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItemsTable.$inferSelect;
