import { expect } from "@jest/globals";
import * as uuid from "uuid";

import { Thing } from "./pg";

const given = new Map<string, number>();

const entropy = (): string => {
  const key = expect.getState().currentTestName ?? "";
  const value = 1 + (given.get(key) ?? 0);
  given.set(key, value);
  return `${key} @${value}`;
};

export const randomInt = (): number => {
  // adapted from <https://stackoverflow.com/a/8076436/86622>
  const s = entropy();
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export const randomNat = (): number => Math.abs(randomInt());

export const randomElement = <T>(array: ReadonlyArray<T>): T =>
  array[randomNat() % array.length];

export const randomNoun = (): string =>
  randomElement([
    "apple",
    "banana",
    "carrot",
    "doughnut",
    "egg",
    "fig",
    "grape",
    "house",
    "icicle",
    "jamjar",
    "kite",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "pear",
    "queen",
    "rabbit",
    "snake",
    "tiger",
    "umbrella",
    "vulture",
    "whale",
    "xylophone",
    "yak",
    "zebra",
  ]);

export const randomThingId = (): Thing.Id => {
  const value = uuid.v5(entropy(), uuid.NIL);
  return value as Thing.Id;
};

export const randomThing = (defaults: Partial<Thing> = {}): Thing => ({
  thingId: randomThingId(),
  name: randomNoun(),
  quantity: randomNat(),
  ...defaults,
});
