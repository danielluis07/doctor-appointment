import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema, notification } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(users);

    return c.json({ data });
  })
  .post("/", zValidator("json", insertUserSchema), async (c) => {
    const values = c.req.valid("json");

    if (!values.password || typeof values.password !== "string") {
      return c.json(
        { error: "Password is required and must be a string" },
        400
      );
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);

    if (!values.email || typeof values.email !== "string") {
      return c.json({ error: "Email is required and must be a string" }, 400);
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email));

    if (existingUser.length > 0) {
      return c.json({ error: "User already exists" }, 409); // Conflict status code
    }

    const [data] = await db
      .insert(users)
      .values({
        name: values.name,
        email: values.email,
        password: hashedPassword,
        role: values.role ?? null,
        lastName: values.lastName ?? null,
        address: values.address ?? null,
        address2: values.address2 ?? null,
        city: values.city ?? null,
        state: values.state ?? null,
        postalCode: values.postalCode ?? null,
        phone: values.phone ?? null,
      })
      .returning();

    return c.json({ data });
  });

export default app;
