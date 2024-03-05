import { PrismaClient } from "@prisma/client/extension";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { verify } from "hono/jwt";

export const todo = new Hono();

todo.get("/", async (c) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
  const prisma: PrismaClient = c.get("prisma");
  try {
    console.log(c.req.header());
    const { authorization } = c.req.header();
    const token = authorization.split(" ")[1];
    const { id } = await verify(token, JWT_SECRET);
    const todos = await prisma.todo.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        isDone: true,
      },
    });
    if (!todos) {
      return c.json({ msg: "No Todos found!" }, 411);
    }
    console.log(todos);
    return c.json({ todos }, 200);
  } catch (err) {
    return c.json({ msg: "Invalid token!" }, 404);
  }
});

todo.post("/", async (c) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
  const prisma: PrismaClient = c.get("prisma");
  try {
    console.log(c.req.header());
    const { authorization } = c.req.header();
    const { name, description, isDone } = await c.req.json();
    const token = authorization.split(" ")[1];
    console.log(token);
    const { id } = await verify(token, JWT_SECRET);
    const todo = await prisma.todo.create({
      data: {
        userId: id,
        name,
        description,
        isDone,
      },
      select: {
        id: true,
      },
    });
    if (!todo) {
      return c.json({ msg: "Error creating Todo!" }, 411);
    }
    console.log(todo);
    return c.json({ msg: "Todo created Successfully", id: todo.id }, 200);
  } catch (err) {
    console.log(err);
    return c.json({ msg: "Invalid token!" }, 404);
  }
});

todo.put("/", async (c) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
  const prisma: PrismaClient = c.get("prisma");
  try {
    console.log(c.req.header());
    const { authorization } = c.req.header();
    const { todoId, name, description, isDone } = await c.req.json();
    const token = authorization.split(" ")[1];
    console.log(token);
    const { id } = await verify(token, JWT_SECRET);
    const todo = await prisma.todo.update({
      where: {
        id: todoId,
        userId: id,
        // AND: [
        //   {
        //     id: {
        //       equals: todoId,
        //     },
        //   },
        //   {
        //     userId: {
        //       equals: id,
        //     },
        //   },
        // ],
      },
      data: {
        name,
        description,
        // isDone,
      },
      select: {
        id: true,
      },
    });
    if (!todo) {
      return c.json({ msg: "Error updating Todo!" }, 411);
    }
    console.log(todo);
    return c.json({ msg: "Todo updated Successfully", id: todo.id }, 200);
  } catch (err) {
    console.log(err);
    return c.json({ msg: "Invalid token!" }, 404);
  }
});

todo.delete("/", async (c) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
  const prisma: PrismaClient = c.get("prisma");
  try {
    console.log(c.req.header());
    const { authorization } = c.req.header();
    const { todoId } = await c.req.json();
    const token = authorization.split(" ")[1];
    console.log(token);
    const { id } = await verify(token, JWT_SECRET);
    const todo = await prisma.todo.delete({
      where: {
        id: todoId,
        // AND: [
        //   {
        //     id: {
        //       equals: todoId,
        //     },
        //   },
        //   {
        //     userId: {
        //       equals: id,
        //     },
        //   },
        // ],
      },
    });
    if (!todo) {
      return c.json({ msg: "Error deleting Todo!" }, 411);
    }
    console.log(todo);
    return c.json({ msg: "Todo deleted Successfully" }, 200);
  } catch (err) {
    console.log(err);
    return c.json({ msg: "Invalid token!" }, 404);
  }
});
