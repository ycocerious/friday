import { sql, type InferSelectModel } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  vector,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const USER_ROLES = ["CREATOR", "TRAVELER"] as const;
export const userRoleSchema = z.enum(USER_ROLES);
export type UserRole = z.infer<typeof userRoleSchema>;

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  role: varchar("role", { length: 20 }).$type<UserRole>().notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  savedVideos: jsonb("saved_videos").$type<string[]>().default([]),
});

export const creatorProfiles = pgTable("creator_profile", {
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .primaryKey(),
  bio: text("bio"),
  socialLinks: jsonb("social_links").$type<{
    instagram?: string;
    youtube?: string;
  }>(),
});

export const videos = pgTable("video", {
  id: uuid("id").defaultRandom().primaryKey(),
  creatorId: uuid("creator_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  videoUrl: text("video_url"),
  videoKey: text("video_key").notNull(),
  location: text("location").notNull(),
  likes: integer("likes").default(0),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const videoTagEmbeddings = pgTable(
  "video_tag_embedding",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    videoId: uuid("video_id")
      .references(() => videos.id, { onDelete: "cascade" })
      .notNull(),
    embedding: vector("embedding", { dimensions: 768 }).notNull(),
  },
  (table) => ({
    videoTagEmbeddingIndex: index("video_tag_embedding_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  }),
);

export type Video = InferSelectModel<typeof videos>;
