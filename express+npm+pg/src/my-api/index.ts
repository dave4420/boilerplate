import { Logger } from "pino";
import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as schema from "../gen/openapi/my";
import { withPg } from "../pg";
import { Thing } from "../domain";

// DAVE: use connection pool instead of withPg() directly

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
    await withPg(async (db) => {
      const things = await db.getThing(thingId);
      if (things.length === 0) {
        sendError(404, "thing not found", res);
        return;
      }
      const { thingId: _ignore, ...fields } = things[0];
      res.json(schema.getThingResponse.parse(fields));
    });
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
    await withPg(async (db) => {
      await db.saveThing({ ...parsedBody.data, thingId });
      res.status(204).end();
    });
  });

const deleteThing = (log: Logger) =>
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = schema.deleteThingParams.safeParse(req.params);
    log.debug({ parsed }, "deleteThing");
    if (!parsed.success) {
      sendError(400, parsed.error.message, res);
      return;
    }
    const thingId = Thing.idOrNull(parsed.data.thingId);
    if (thingId === null) {
      sendError(400, "thing not found", res);
      return;
    }
    log.debug("about to connect to pg");
    await withPg(async (db) => {
      log.debug("about to delete thing");
      await db.deleteThing(thingId);
      log.debug("about to send 204");
      res.status(204).end();
    });
  });

export const myApiRoutes = (log: Logger): express.Router => {
  const routes = express.Router();

  routes.use(express.json());

  routes.get("/stuff/:thingId", getThing(log));
  routes.put("/stuff/:thingId", putThing(log));
  routes.delete("/stuff/:thingId", deleteThing(log));

  return routes;
};
