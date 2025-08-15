import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load .env first
dotenv.config();

// Create Redis client using env variables
const redis = Redis.fromEnv();

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "20 s"), // 5 requests per 20 seconds
});

export default rateLimiter;
