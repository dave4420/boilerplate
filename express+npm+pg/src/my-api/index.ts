import { Logger } from "pino";
import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as schema from "../gen/openapi/my";

const getThing = (log: Logger) =>
  asyncHandler(async (req: Request, res: Response) => {
    log.info("GET /stuff");
    schema.getThingParams.parse(req.params);
    throw Error("Not implemented");
  });

export const myApiRoutes = (log: Logger): express.Router => {
  const routes = express.Router();

  routes.get("/stuff", getThing(log));

  return routes;
};
