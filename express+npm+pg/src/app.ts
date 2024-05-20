import { Logger } from "pino";
import pinoHttp from "pino-http";
import express from "express";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getHealthResponse } from "./gen/openapi/health";
import { myApiRoutes } from "./my-api/index";

export interface AppParams {
  log: Logger;
  port: number;
}

export interface App {
  shutdown(): void;
}

const healthCheckEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const resp = { status: "ok" };
    getHealthResponse.parse(resp);
    res.json(resp);
  }
);

export const startApp = (params: AppParams): App => {
  const { log } = params;
  log.info("Starting server...");

  const routes = express();
  routes.use(pinoHttp({ logger: log }));

  routes.get("/health-check", healthCheckEndpoint);

  routes.use("/my-api", myApiRoutes(log));

  const server = routes.listen(params.port, () => {
    log.info(`Server is running at http://localhost:${params.port}`);
  });

  return {
    shutdown: () => {
      server.close(async () => {
        log.info("server closed");
      });
    },
  };
};
