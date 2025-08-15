import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load .env first
dotenv.config();

// Create Redis client using env variables
const redis = Redis.fromEnv();

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 requests per 60 seconds
});

export default rateLimiter;
