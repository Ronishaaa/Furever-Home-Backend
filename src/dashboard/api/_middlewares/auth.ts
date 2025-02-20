import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

export const authentication = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers["authorization"];

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { message: "Authorization header missing" };
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "Token missing" };
    return;
  }

  const secretKey = process.env.JWT_SECRET || "secret";
  const decoded = jwt.verify(token, secretKey) as { userId: string };

  ctx.state.user = decoded;
  await next();
};
