import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as schema from "../gen/openapi/my";
import { withPg } from "../pg";
import { Thing } from "../domain";
import { Dependencies } from "../dependencies";

// DAVE: use connection pool instead of withPg() directly

const sendError = (status: number, message: string, res: Response) => {
  // DAVE: persuade orval to generate zod for this
  res.status(status).json({ message });
};

const getThing = (deps: Dependencies) =>
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = schema.getThingParams.safeParse(req.params);
    deps.log.debug({ parsed }, "getThing");
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

const putThing = (deps: Dependencies) =>
  asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = schema.putThingParams.safeParse(req.params);
    const parsedBody = schema.putThingBody.safeParse(req.body);
    deps.log.debug({ parsedParams, parsedBody }, "putThing");
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

const deleteThing = (deps: Dependencies) =>
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = schema.deleteThingParams.safeParse(req.params);
    deps.log.debug({ parsed }, "deleteThing");
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
      await db.deleteThing(thingId);
      res.status(204).end();
    });
  });

export const myApiRoutes = (deps: Dependencies): express.Router => {
  const routes = express.Router();

  routes.use(express.json());

  routes.get("/stuff/:thingId", getThing(deps));
  routes.put("/stuff/:thingId", putThing(deps));
  routes.delete("/stuff/:thingId", deleteThing(deps));

  return routes;
};
