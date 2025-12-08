import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" }).get("/user", {
  user: { user: "Agustin" },
});

export const GET = app.fetch;

export type App = typeof app;
