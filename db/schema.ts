import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  date,
  text,
  timestamp,
  uuid,
  varchar,
  numeric,
  time,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const role = pgEnum("role", ["ADMIN", "PATIENT", "DOCTOR"]);

export const userStatus = pgEnum("user_status", [
  "ACTIVE",
  "INACTIVE",
  "PENDING",
]);

export const appointmentStatus = pgEnum("appointment_status", [
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
]);

export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
  imageName: varchar("imageName", { length: 255 }),
  isTwoFactorEnabled: boolean("is_two_factor_enabled").default(false),
  emailVerified: timestamp("email_verified"),
  address1: varchar("address1", { length: 255 }),
  address2: varchar("address2", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  postalCode: varchar("postal_code", { length: 255 }),
  country: varchar("country", { length: 255 }),
  role: role("role").notNull(),
  status: userStatus("user_status").default("PENDING").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type"),
  provider: text("provider"),
  providerAccountId: text("providerAccountId"),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const verificationToken = pgTable("verification_token", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});

export const passwordResetToken = pgTable("password_reset_token", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});

export const twoFactorToken = pgTable("two_factor_token", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});

export const twoFactorConfirmation = pgTable("two_factor_confirmation", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
});

export const patient = pgTable("patient", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("post_Id")
    .references(() => user.id)
    .notNull(),
  phone: varchar("phone", { length: 255 }),
  address: text("address"),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 55 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const doctor = pgTable("doctor", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_Id")
    .references(() => user.id)
    .notNull(),
  specialty: varchar("specialty", { length: 255 }),
  experience: integer("experience"),
  qualifications: text("qualifications"),
  cfm: varchar("cfm", { length: 255 }),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const doctorAvailability = pgTable("doctor_availability", {
  id: uuid("id").defaultRandom().primaryKey(),
  doctorId: uuid("doctor_id")
    .references(() => doctor.id, {
      onDelete: "cascade",
    })
    .notNull(),
  availableDate: date("available_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const appointment = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: integer("patient_id").references(() => patient.id, {
    onDelete: "cascade",
  }),
  doctorId: integer("doctor_id").references(() => doctor.id, {
    onDelete: "cascade",
  }),
  status: appointmentStatus("appointment_status").notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const review = pgTable("review", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: integer("patient_id").references(() => patient.id, {
    onDelete: "cascade",
  }),
  doctorId: integer("doctor_id").references(() => doctor.id, {
    onDelete: "cascade",
  }),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notification = pgTable("notification", {
  id: uuid("id").defaultRandom().primaryKey(),
  message: text("message").notNull(),
  userId: uuid("user_Id").references(() => user.id, { onDelete: "set null" }),
  viewed: boolean("viewed").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
