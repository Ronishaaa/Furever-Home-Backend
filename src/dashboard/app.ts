import cors from "@koa/cors";
import { errorHandler, notFoundHandler } from "_globals/middlewares";
import Koa from "koa";
import koaBody from "koa-body";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import { createServer } from "node:http";
import { Server } from "socket.io";
import apiRouter from "./api";

const app = new Koa();

const server = createServer(app.callback());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("customEvent", (data) => {
    console.log("Received data:", data);
    io.emit("customEventResponse", { message: "Hello from server!" });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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

app.use(notFoundHandler);

process.on("unhandledRejection", (reason: string) => {
  console.error(reason);
  // throw new AppError(reason, 500, false);
});

process.on("uncaughtException", (error: Error) => {
  throw error;
  // throw new AppError(error, 500, false);
});

app.use(
  koaBody({
    multipart: true,
    urlencoded: true,
    json: true,
    formidable: {
      uploadDir: "./uploads",
      keepExtensions: true,
    },
  })
);

app.on("error", (err, ctx) => {
  errorHandler(ctx, err);
});

export default app;
