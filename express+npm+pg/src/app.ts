import { Logger } from "pino";
import express from "express";

export interface App {
  shutdown(): void;
}

export const startApp = (log: Logger): App => {
  log.info("Starting server...");

  const routes = express();
  const port = parseInt(process.env.PORT ?? "3000", 10);

  const server = routes.listen(port, () => {
    log.info(`Server is running at http://localhost:${port}`);
  });

  return {
    shutdown: () => {
      server.close(async () => {
        log.info("server closed");
      });
    },
  };
};
