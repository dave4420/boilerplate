import pino from "pino";
import { App, startApp } from "./app";
import { randomThingId } from "./test-values";
import { Thing } from "./pg";

let app: App | null = null;
let onShutdownComplete: (() => void) | null = null;

beforeAll(
  (): Promise<void> =>
    new Promise((resolve) => {
      app = startApp({
        log: pino({ level: "silent" }),
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
    new Promise((resolve) => {
      onShutdownComplete = resolve;
      app?.shutdown();
    })
);

const get = async (path: string): Promise<Response> => {
  if (app === null) {
    throw Error("App is not started");
  }
  return fetch(`http://localhost:${app.port()}${path}`);
};

const thingPath = (thingId: Thing.Id): string => `/my-api/stuff/${thingId}`;

const getThing = async (thingId: Thing.Id): Promise<Response> =>
  get(thingPath(thingId));

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
});
