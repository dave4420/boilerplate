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
    throw Error("Not implemented");
  });

export const myApiRoutes = (log: Logger): express.Router => {
  const routes = express.Router();

  routes.get("/stuff/:thingId", getThing(log));

  return routes;
};
