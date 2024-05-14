import { Logger } from "pino";
import pinoHttp from "pino-http";
import express from "express";
import { Request, Response } from "express";
import { getHealthResponse } from "./gen/openapi/health";

export interface App {
  shutdown(): void;
}

const healthCheckEndpoint = async (req: Request, res: Response) => {
  const resp = { status: "ok" };
  getHealthResponse.parse(resp); // DAVE: ensure exceptions are logged and result in a 500
  res.json(resp);
};

export const startApp = (log: Logger): App => {
  log.info("Starting server...");

  const routes = express();
  routes.use(pinoHttp({ logger: log }));

  routes.get("/health-check", healthCheckEndpoint);

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
