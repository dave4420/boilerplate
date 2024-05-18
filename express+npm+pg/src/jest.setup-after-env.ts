import { expect } from "@jest/globals";
import { Instant } from "@js-joda/core";
import type { MatcherFunction } from "expect";

const toBeBetweenInclusiveHelper = (
  actual: number,
  actualDisplay: string,
  floor: number,
  floorDisplay: string,
  ceiling: number,
  ceilingDisplay: string
) =>
  floor <= actual && actual <= ceiling
    ? {
        pass: true,
        message: () =>
          `expected ${actualDisplay} not to be between ${floorDisplay} and ${ceilingDisplay} (inclusive)`,
      }
    : {
        pass: false,
        message: () =>
          `expected ${actualDisplay} to be between ${floorDisplay} and ${ceilingDisplay} (inclusive)`,
      };

const toBeBetweenInclusive: MatcherFunction<
  [floor: unknown, ceiling: unknown]
> = (actual, floor, ceiling) => {
  if (
    typeof actual === "number" &&
    typeof floor === "number" &&
    typeof ceiling === "number"
  ) {
    return toBeBetweenInclusiveHelper(
      actual,
      String(actual),
      floor,
      String(floor),
      ceiling,
      String(ceiling)
    );
  }

  if (
    actual instanceof Instant &&
    floor instanceof Instant &&
    ceiling instanceof Instant
  ) {
    return toBeBetweenInclusiveHelper(
      actual.toEpochMilli(),
      actual.toString(),
      floor.toEpochMilli(),
      floor.toString(),
      ceiling.toEpochMilli(),
      ceiling.toString()
    );
  }

  throw TypeError("These must have the same type (number or Instant)");
};

expect.extend({
  toBeBetweenInclusive,
});
