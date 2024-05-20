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
