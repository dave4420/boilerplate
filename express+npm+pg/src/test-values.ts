import { expect } from "@jest/globals";
import * as uuid from "uuid";

import { Thing } from "./pg";
import { testValuesEntropy } from "./test-globals";

const entropy = (): string => {
  const key = expect.getState().currentTestName ?? "";
  const value = 1 + (testValuesEntropy.get(key) ?? 0);
  testValuesEntropy.set(key, value);
  return `${key} @${value}`;
};

export const randomThingId = (): Thing.Id => {
  const value = uuid.v5(entropy(), uuid.NIL);
  return value as Thing.Id;
};
