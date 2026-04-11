import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const socialPostsTable = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  platforms: text("platforms").array().notNull().default([]),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSocialPostSchema = createInsertSchema(socialPostsTable).omit({ id: true, createdAt: true });
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;
export type SocialPost = typeof socialPostsTable.$inferSelect;
