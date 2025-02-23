import cors from "@koa/cors";
import { errorHandler, notFoundHandler } from "_globals/middlewares";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import apiRouter from "./api";

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    // set default status and message
    ctx.status = 500;
    ctx.body = { message: "Unknown error" };

    ctx.app.emit("error", err, ctx);
  }
});

app.use(helmet());
app.use(bodyParser());
app.use(
  cors({
    origin: "http://localhost:5174", // Allow your frontend's origin
    credentials: true, // Allow cookies and other credentials
  })
);

app.use(apiRouter.routes());

app.use(notFoundHandler);

// handle any unhandled rejection
process.on("unhandledRejection", (reason: string) => {
  console.error(reason);
  // throw new AppError(reason, 500, false);
});

process.on("uncaughtException", (error: Error) => {
  throw error;
  // throw new AppError(error, 500, false);
});

app.on("error", (err, ctx) => {
  errorHandler(ctx, err);
});

export default app;
