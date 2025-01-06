import { config } from "dotenv";
import pino from "pino";

config();

const transport = pino.transport({
  target: "pino-pretty",
  options: { colorize: true },
});

export const logger = pino(
  {},
  process.env.NODE_ENV !== "production" ? transport : undefined
);

export default logger;
