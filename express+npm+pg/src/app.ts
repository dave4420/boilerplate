import pinoHttp from "pino-http";
import express from "express";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getHealthResponse } from "./gen/openapi/health";
import { myApiRoutes } from "./my-api/index";
import { Dependencies } from "./dependencies";

export interface AppParams {
  deps: Dependencies;
  port: number;
  onUp(): void;
  onDown(): void;
}

export interface App {
  port(): number;
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
  const { log } = params.deps;
  log.info("Starting server...");

  const routes = express();
  routes.use(pinoHttp({ logger: log }));

  routes.get("/health-check", healthCheckEndpoint);

  routes.use("/my-api", myApiRoutes(params.deps));

  let port: number = 0;
  const server = routes.listen(params.port, () => {
    const address = server.address();
    if (address !== null && typeof address === "object") {
      port = address.port;
    }
    params.onUp();
  });

  return {
    port() {
      return port;
    },
    shutdown() {
      server.close(params.onDown);
    },
  };
};
