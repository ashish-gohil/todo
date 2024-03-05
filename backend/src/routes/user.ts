import { PrismaClient } from "@prisma/client/extension";
import { Hono, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { verify, sign } from "hono/jwt";

export const user = new Hono();

// const authMiddleware: MiddlewareHandler = async (c, next) => {
//   //   const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
//   const JWT_SECRET = c.env.JWT_SECRET;
//   const { email, password, firstname, lastname } = await c.req.json();
//   const prisma: PrismaClient = c.get("prisma");
//   try {

//     c.set("token", "token");
//     await next();
//   } catch (err) {
//     return c.json({ msg: err }, 411);
//   }
// };

user.post("/signup", async (c) => {
  try {
    // const body = await c.req.json();
    const { email, password, firstname, lastname } = await c.req.json();
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    const prisma: PrismaClient = c.get("prisma");
    const user = await prisma.user.create({
      data: { email, password, firstname, lastname },
    });
    if (!user) {
      return c.json({ msg: "Error while creating user" }, 500);
    }
    const token = await sign({ id: user.id }, JWT_SECRET);
    return c.json({ token: token }, 200);
  } catch (err: any) {
    return c.json({ msg: "User Already Exist/ Internal Server Error" }, 400);
  }
});

user.post("/signin", async (c) => {
  try {
    // const body = await c.req.json();
    const { email, password } = await c.req.json();
    console.log(email, password);
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    const prisma: PrismaClient = c.get("prisma");
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            email: {
              equals: email,
            },
          },
          {
            password: {
              equals: password,
            },
          },
        ],
      },
    });
    console.log(user);
    if (!user) {
      return c.json({ msg: "No User Found" }, 404);
    }
    const token = await sign({ id: user.id }, JWT_SECRET);
    return c.json({ token: token }, 200);
  } catch (err: any) {
    return c.json({ msg: "Internal Server Error" }, 404);
  }
});
