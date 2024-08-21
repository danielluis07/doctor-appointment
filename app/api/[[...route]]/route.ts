import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import users from "./users";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

/* app.use(
  "*",
  initAuthConfig((c) => ({
    secret: c.env.AUTH_SECRET,
    providers: [Credentials({})],
  }))
); */

const routes = app.route("/users", users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
