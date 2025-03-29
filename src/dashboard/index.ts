import { logger } from "@utils";
import { db } from "_globals/db"; // Database initialization
import { config } from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app";

// Load environment variables
config();

// Database connection setup
app.context.db = db;

const httpServer = createServer(app.callback());

export const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.context.io = io;

io.on("connection", (socket) => {
  console.log(socket.id);
});

// Graceful shutdown handling
process.on("SIGINT", () => {
  app.context.db.$disconnect();
  logger.info("Prisma db connection disconnected on app termination");
  process.exit(1);
});

// Start the server
httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
