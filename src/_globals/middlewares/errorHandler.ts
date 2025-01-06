import { JsonWebTokenError } from "jsonwebtoken";
import type { Context } from "koa";
import { AppError } from "../exceptions";

export const notFoundHandler = (ctx: Context) => {
  ctx.status = 404;
  ctx.body = { message: `Can't find endpoint ${ctx.req.url}` };
  return;
};

export const errorHandler = async (ctx: Context, err: any) => {
  if (err instanceof AppError) {
    if (!err.isOperational) {
      // TODO: report to Sentry or setup alerts
      ctx.log.fatal(err);
      process.exit(1);
    } else {
      const { message, httpStatusCode, details } = err;
      ctx.status = httpStatusCode;
      ctx.body = { message, details };
    }
  } else if (err instanceof JsonWebTokenError) {
    const { message, ...rest } = err;

    ctx.status = 401;
    ctx.body = { message, details: rest };
  } else {
    // TODO: report to Sentry or setup alerts
    ctx.status = 500;
    ctx.body = { message: err.message };
  }
};
