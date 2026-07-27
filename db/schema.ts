import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentItems = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["product", "news"] }).notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: text("published_at").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});
