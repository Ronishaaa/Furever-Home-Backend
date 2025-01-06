import { AppError } from "_globals/exceptions";
import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

// Middleware to validate user authorization token
export const authorize = async (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError("Authorization token missing", 401, true);
  }

  try {
    // Verify token
    const user = jwt.verify(token, process.env.JWT_SECRET || "secret");
    ctx.state.user = user;
    await next();
  } catch (err) {
    throw new AppError("Invalid or expired token", 401, true);
  }
};
