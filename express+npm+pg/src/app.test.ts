import pino from "pino";
import { App, startApp } from "./app";

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

describe("/health-check", () => {
  it("returns 200", async () => {
    const response = await get(`/health-check`);
    expect(response.status).toBe(200);
  });
});
