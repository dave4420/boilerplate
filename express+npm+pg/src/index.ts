import pino from "pino";
import { startApp } from "./app";

const log = pino();

const getPort = (): number => {
  const port = process.env.PORT;
  if (typeof port === "undefined") {
    return 3000;
  }
  return parseInt(port, 10);
};

const app = startApp(log, getPort());

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    log.info(`${signal} received: closing server`);
    app.shutdown();
  });
});
