import cors from "@koa/cors";
import { errorHandler, notFoundHandler } from "_globals/middlewares";
import apiiRouter from "dashboard/api/admin/admin.routes";
import apiRouter from "dashboard/api/pet/pets.routes";
import Koa from "koa";
import koaBody from "koa-body";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";

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
    origin: "http://localhost:5173", // Allow your frontend's origin
    credentials: true, // Allow cookies and other credentials
  })
);

app.use(apiRouter.routes());
app.use(apiiRouter.routes());

app.use(notFoundHandler);

app.use(
  koaBody({
    multipart: true, // For file uploads
    formidable: {
      uploadDir: "./uploads", // Temporary directory for uploaded files
      keepExtensions: true, // Keep file extensions
    },
  })
);

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
