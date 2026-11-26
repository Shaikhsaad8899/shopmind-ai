import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { logger } from "../config/logger.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  logger.error({ err: error }, "Request failed");

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};