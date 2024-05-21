import { Logger } from "pino";

export type Dependencies = Readonly<{
  log: Logger;
}>;
