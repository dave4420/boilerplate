import pino from "pino";
import { DatabaseCloser, pgPool } from "./pg";
import { App, startApp } from "./app";
import { randomThing, randomThingId } from "./test-values";
import { Thing } from "./domain";

let app: App | null = null;
let onShutdownComplete: (() => void) | null = null;
let pgClose: DatabaseCloser | null = null;

beforeAll(
  (): Promise<void> =>
    new Promise((resolve) => {
      const pg = pgPool();
      pgClose = pg;
      app = startApp({
        deps: {
          log: pino({ level: "silent" }),
          pg,
        },
        port: 0,
        onUp() {
          resolve();
        },
        onDown() {
          const callback = onShutdownComplete;
          if (callback) {
            callback();
          }
        },
      });
      return Promise.resolve();
    })
);

afterAll(
  (): Promise<void> =>
    new Promise(async (resolve) => {
      onShutdownComplete = resolve;
      app?.shutdown();
      app = null;
      await pgClose?.close();
      pgClose = null;
    })
);

const get = async (path: string): Promise<Response> => {
  if (app === null) {
    throw Error("App is not started");
  }
  return fetch(`http://localhost:${app.port()}${path}`);
};

const delete_ = async (path: string): Promise<Response> => {
  if (app === null) {
    throw Error("App is not started");
  }
  return fetch(`http://localhost:${app.port()}${path}`, {
    method: "DELETE",
  });
};

const put = async (path: string, body: object): Promise<Response> => {
  if (app === null) {
    throw Error("App is not started");
  }
  return fetch(`http://localhost:${app.port()}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const thingPath = (thingId: Thing.Id): string => `/my-api/stuff/${thingId}`;

const getThing = async (thingId: Thing.Id): Promise<Response> =>
  get(thingPath(thingId));

const deleteThing = async (thingId: Thing.Id): Promise<Response> =>
  delete_(thingPath(thingId));

const putThing = async (thing: Thing): Promise<Response> => {
  const { thingId, ...fields } = thing;
  return await put(thingPath(thingId), fields);
};

describe("/health-check", () => {
  it("returns 200", async () => {
    const response = await get(`/health-check`);
    expect(response.status).toBe(200);
  });
});

describe("/my-api/stuff/{thingId}", () => {
  test("GET returns 404 by default", async () => {
    // given
    const thingId = randomThingId();

    // when
    const response = await getThing(thingId);

    // then
    expect(response.status).toBe(404);
  });

  test("GET returns 200 after PUT", async () => {
    // given
    const thingId = randomThingId();
    const thing: Thing = randomThing({ thingId });
    const { thingId: _ignore, ...expectedThing } = { ...thing };

    // when
    const putResponse = await putThing(thing);
    const getResponse = await getThing(thingId);

    // then
    expect(putResponse.status).toBe(204);
    expect(getResponse.status).toBe(200);
    const actualThing = await getResponse.json();
    expect(actualThing).toEqual(expectedThing);
  });

  test("GET returns 404 after DELETE", async () => {
    // given
    const thingId = randomThingId();
    const thing: Thing = randomThing({ thingId });

    // when
    await putThing(thing);
    const deleteResponse = await deleteThing(thingId);
    const getResponse = await getThing(thingId);

    // then
    expect(deleteResponse.status).toBe(204);
    expect(getResponse.status).toBe(404);
  });
});
