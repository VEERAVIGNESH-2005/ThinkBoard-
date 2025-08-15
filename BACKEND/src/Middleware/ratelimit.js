import rateLimiter from "../Config/upstash.js";

const rateLimitMiddleware = async (req, res, next) => {
  try {
    const { success } = await rateLimiter.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({ message: "Too Many Requests" });
    }

    next();
  } catch (error) {
    console.log("Ratelimit error:", error);
    next(error);
  }
};

export default rateLimitMiddleware;
