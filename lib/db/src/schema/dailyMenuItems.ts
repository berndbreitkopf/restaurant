import { pgTable, text, serial, timestamp, real, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dailyMenuItemsTable = pgTable("daily_menu_items", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  isVegan: boolean("is_vegan").notNull().default(false),
  isVegetarian: boolean("is_vegetarian").notNull().default(false),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDailyMenuItemSchema = createInsertSchema(dailyMenuItemsTable).omit({ id: true, createdAt: true });
export type InsertDailyMenuItem = z.infer<typeof insertDailyMenuItemSchema>;
export type DailyMenuItem = typeof dailyMenuItemsTable.$inferSelect;
