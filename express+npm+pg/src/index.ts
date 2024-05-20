import pino from "pino";
import { startApp } from "./app";

const log = pino({ level: process.env.LOG_LEVEL ?? "info" });

const getPort = (): number => {
  const port = process.env.PORT;
  if (typeof port === "undefined") {
    return 3000;
  }
  return parseInt(port, 10);
};

const port = getPort();

const app = startApp({
  log,
  port,
  onUp() {
    log.info(`Server is running at http://localhost:${port}`);
  },
  onDown() {
    log.info("server closed");
  },
});

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    log.info(`${signal} received: closing server`);
    app.shutdown();
  });
});
