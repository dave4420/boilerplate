import { Logger } from "pino";
import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as schema from "../gen/openapi/my";
import { pg } from "../pg";
import { Thing } from "../domain";

// DAVE: use connection pool instead of pg() directly

const sendError = (status: number, message: string, res: Response) => {
  // DAVE: persuade orval to generate zod for this
  res.status(status).json({ message });
};

const getThing = (log: Logger) =>
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = schema.getThingParams.safeParse(req.params);
    log.debug({ parsed }, "getThing");
    if (!parsed.success) {
      sendError(400, parsed.error.message, res);
      return;
    }
    const thingId = Thing.idOrNull(parsed.data.thingId);
    if (thingId === null) {
      sendError(400, "thing not found", res);
      return;
    }
    const db = await pg();
    try {
      const things = await db.getThing(thingId);
      if (things.length === 0) {
        sendError(404, "thing not found", res);
        return;
      }
      const { thingId: _ignore, ...fields } = things[0];
      res.json(schema.getThingResponse.parse(fields));
    } finally {
      await db.close();
    }
  });

const putThing = (log: Logger) =>
  asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = schema.putThingParams.safeParse(req.params);
    const parsedBody = schema.putThingBody.safeParse(req.body);
    log.debug({ parsedParams, parsedBody }, "putThing");
    if (!parsedParams.success) {
      sendError(400, parsedParams.error.message, res);
      return;
    }
    if (!parsedBody.success) {
      sendError(400, parsedBody.error.message, res);
      return;
    }
    const thingId = Thing.idOrNull(parsedParams.data.thingId);
    if (thingId === null) {
      sendError(400, "thing not found", res);
      return;
    }
    const db = await pg();
    try {
      await db.saveThing({ ...parsedBody.data, thingId });
      res.status(204).end();
    } finally {
      await db.close();
    }
  });

export const myApiRoutes = (log: Logger): express.Router => {
  const routes = express.Router();

  routes.use(express.json());

  routes.get("/stuff/:thingId", getThing(log));
  routes.put("/stuff/:thingId", putThing(log));

  return routes;
};
