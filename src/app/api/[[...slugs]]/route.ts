import { redis } from "@/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";

const ROOM_TTL_SECONDS = 60 * 10;

const rooms = new Elysia({ prefix: "/room" }).post("/create", async () => {
  const roomId = nanoid();
  // Creates a redis hash(like a small dictonary or JSON object), stored under a single key
  await redis.hset(`meta:${roomId}`, { connected: [], createdAt: Date.now() });
  // Set a time to live on the previous key
  await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);
  // In Elysia we don't need to stringify this object
  return { roomId };
});

const app = new Elysia({ prefix: "/api" }).use(rooms);

export const POST = app.fetch;

export type App = typeof app;
