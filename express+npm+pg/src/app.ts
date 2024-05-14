import { Logger } from "pino";
import express from "express";
import { Request, Response } from "express";

export interface App {
  shutdown(): void;
}

const healthCheckEndpoint = async (req: Request, res: Response) => {
  res.status(200);
  res.json({ status: "ok" });
};

export const startApp = (log: Logger): App => {
  log.info("Starting server...");

  const routes = express();
  const port = parseInt(process.env.PORT ?? "3000", 10);

  routes.get("/health-check", healthCheckEndpoint);

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
