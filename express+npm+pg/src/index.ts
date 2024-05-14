import pino from "pino";

const log = pino();

type T = {
  a: number;
  b: string;
};

const t: T = {
  a: 1,
  b: "hello",
};

log.info({ t }, "Hello");
