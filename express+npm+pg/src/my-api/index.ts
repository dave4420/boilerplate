import { Logger } from "pino";
import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as schema from "../gen/openapi/my";

// Ideally, the zod schema created by orval would do this for us
// (convert the string in the request to the number we specfied in the
// openapi schema), but alas no. There must be a better option out there
// somewhere.
const prepareThingParams = (input: any): any => {
  if (input === null || typeof input !== "object") {
    return input;
  }
  const { thingId, ...rest } = input;
  if (typeof thingId !== "string") {
    return input;
  }
  if (!/^[-+]?\d+$/.test(thingId)) {
    return input;
  }
  return {
    thingId: parseInt(thingId, 10),
    ...rest,
  };
};

const getThing = (log: Logger) =>
  asyncHandler(async (req: Request, res: Response) => {
    log.info("GET /stuff");
    schema.getThingParams.parse(prepareThingParams(req.params));
    throw Error("Not implemented");
  });

export const myApiRoutes = (log: Logger): express.Router => {
  const routes = express.Router();

  routes.get("/stuff/:thingId", getThing(log));

  return routes;
};
