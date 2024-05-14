import pino from "pino";
import { startApp } from "./app";

const log = pino();

const app = startApp(log);

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    log.info(`${signal} received: closing server`);
    app.shutdown();
  });
});
