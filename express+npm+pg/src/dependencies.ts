import { Logger } from "pino";
import { DatabasePool } from "./pg";

export type Dependencies = Readonly<{
  log: Logger;
  pg: DatabasePool;
}>;
