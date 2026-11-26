import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { pinoHttp } from "pino-http";

import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Disable framework information
app.disable("x-powered-by");

// HTTP request logging
app.use(pinoHttp({ logger }));

// Security headers
app.use(helmet());

// Cross-origin access
app.use(
  cors({
    origin: [
      env.STOREFRONT_URL,
      env.ADMIN_URL,
    ],
    credentials: true,
  })
);

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Try again later.",
    },
  })
);

// Request parsing
app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  })
);

// Response compression
app.use(compression());

// API versioning
app.use("/api/v1", apiRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(errorHandler);

export default app;