import { sql } from "drizzle-orm";
import { pgTable, text, varchar, uuid, timestamp, integer, boolean, date, time } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profiles table for user information
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid("user_id").notNull().unique(), // Foreign key to auth.users
  full_name: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  department: text("department").notNull(),
  batch: text("batch").notNull(),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Events table for event management
export const events = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description"),
  event_date: date("event_date").notNull(),
  event_time: time("event_time").notNull(),
  location: text("location").notNull(),
  image_url: text("image_url"),
  max_participants: integer("max_participants"),
  created_by: uuid("created_by").notNull(), // Foreign key to auth.users
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  is_active: boolean("is_active").notNull().default(true),
});

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  department: z.enum(["Computer Science", "AIML", "Mechanical", "Civil", "Electrical", "Aeronautical"]),
  batch: z.enum(["2025", "2024", "2023", "2022", "Graduate"]),
});

export const updateProfileSchema = insertProfileSchema.partial().omit({
  user_id: true,
  email: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  created_at: true,
  updated_at: true,
  created_by: true,
}).extend({
  is_active: z.boolean().optional(),
});

export const updateEventSchema = insertEventSchema.partial();

// Types
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type Event = typeof events.$inferSelect;

// Keep the original users table for backwards compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;