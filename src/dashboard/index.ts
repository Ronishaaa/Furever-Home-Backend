import { logger } from "@utils";
import { db } from "_globals/db"; // Database initialization
import { config } from "dotenv";
import app from "./app";

// Load environment variables
config();

// Database connection setup
app.context.db = db;

// Graceful shutdown handling
process.on("SIGINT", () => {
  app.context.db.$disconnect();
  logger.info("Prisma db connection disconnected on app termination");
  process.exit(1);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
