import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { todo } from "./routes/todo";
import { user } from "./routes/user";

declare module "hono" {
  interface ContextVariableMap {
    prisma: any;
    token: string;
  }
}
const app = new Hono();
app.use("*", cors());

app.use("*", async (c, next) => {
  // c.env.DATABASE_URL
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  c.set("prisma", prisma);
  await next();
});

app.route("/api/v1/user", user);
app.route("/api/v1/todo", todo);

export default app;
