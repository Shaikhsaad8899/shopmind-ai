import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

import {
  connectDatabase,
  disconnectDatabase,
} from "./config/database.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    const server = app.listen(
      env.PORT,
      "127.0.0.1",
      () => {
        logger.info(
          `ShopMind AI Backend running on http://localhost:${env.PORT}`
        );
      }
    );

    server.on("error", (error) => {
      logger.fatal({ err: error }, "Server failed");
      process.exit(1);
    });

    let shuttingDown = false;

    const shutdown = () => {
      if (shuttingDown) return;

      shuttingDown = true;

      logger.info("Shutting down server");

      setTimeout(() => process.exit(1), 10000).unref();

      server.close(async () => {
        try {
          await disconnectDatabase();
          process.exit(0);
        } catch (error) {
          logger.error({ err: error }, "Shutdown failed");
          process.exit(1);
        }
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error) {
    logger.fatal({ err: error }, "Application startup failed");
    process.exit(1);
  }
};

void startServer();