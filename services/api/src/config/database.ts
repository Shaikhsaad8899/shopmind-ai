import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 5000,
    autoIndex: env.NODE_ENV !== "production",
  });

  logger.info(
    {
      database: mongoose.connection.name,
    },
    "MongoDB connected successfully"
  );
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});