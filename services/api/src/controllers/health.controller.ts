import type { Request, Response } from "express";
import mongoose from "mongoose";

export const getHealth = (
  req: Request,
  res: Response
): void => {
  res.status(200).json({
    success: true,
    message: "ShopMind AI Backend is running",
    service: "shopmind-api",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

export const getReadiness = async (
  req: Request,
  res: Response
): Promise<void> => {
  let databaseReady = false;

  try {
    if (
      mongoose.connection.readyState === 1 &&
      mongoose.connection.db
    ) {
      await mongoose.connection.db.admin().ping();
      databaseReady = true;
    }
  } catch {
    databaseReady = false;
  }

  res.status(databaseReady ? 200 : 503).json({
    success: databaseReady,
    status: databaseReady ? "ready" : "unavailable",
    dependencies: {
      mongodb: databaseReady ? "connected" : "unavailable",
    },
    timestamp: new Date().toISOString(),
  });
};