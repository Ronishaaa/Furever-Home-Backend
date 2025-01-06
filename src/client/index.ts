import { config } from "dotenv";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// import * as Sentry from "@sentry/node";

import { logger } from "@utils";
import { db } from "_globals/db";
import app from "./app";

// dayjs.extend(utc);
// dayjs.extend(timezone);

// Load env
config();

app.context.db = db;

// Sentry.init({
//  dsn: process.env.SENTRY_DSN_CLIENT,
//  environment: process.env.NODE_ENV,
//  integrations: [new Sentry.Integrations.Prisma({ client: db })],
//  enabled: process.env.NODE_ENV === "production",
// });

// If the Node process ends, close the Prisma connection
process.on("SIGINT", () => {
  app.context.db.$disconnect();
  logger.info("Prisma db connection disconnected on app termination");
  process.exit(1);
});

app.listen(3001, () => logger.info(`Dashboard App listening on ${3001}`));
