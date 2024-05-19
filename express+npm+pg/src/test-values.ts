import { expect } from "@jest/globals";
import * as uuid from "uuid";

import { Thing } from "./pg";

// Produce random but deterministic values for use in tests.

// These are NOT for property testing (create proper generators for that).

// These are for integration tests that need arbitrary values. We clear
// the database between each test run, but not between individual tests.
// The values returned here are based on the test name, and how many
// values the test has requested. This should result in different test
// cases getting different values (in particular: different ids), but
// the same test case repeatedly getting the same values, which helps
// when trying to work out why it’s gone red.

// Code is reloaded on each test run, so we don't need to reset this ourselves
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
