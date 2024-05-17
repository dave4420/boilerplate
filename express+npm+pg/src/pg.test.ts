import { Client } from "pg";
import { Instant, nativeJs } from "@js-joda/core";

import { withPg, Thing } from "./pg";
import { randomThingId, randomThing } from "./test-values";

const withClient = async <R>(fn: (db: Client) => Promise<R>): Promise<R> => {
  const db = new Client();
  try {
    await db.connect();
    return await fn(db);
  } finally {
    await db.end();
  }
};

describe("things", () => {
  it("can save and retrieve a thing", () =>
    withPg(async (db) => {
      // given
      const thingId = randomThingId();
      const thing: Thing = {
        thingId,
        name: "apple",
        quantity: 1,
      };
      const expectedThings = [thing];

      // when
      await db.saveThing(thing);
      const actualThings = await db.getThing(thingId);

      // then
      expect(actualThings).toEqual(expectedThings);
    }));

  it("can no longer retrieve a thing after deleting it", () =>
    withPg(async (db) => {
      // given
      const thingId = randomThingId();
      const thing: Thing = {
        thingId,
        name: "banana",
        quantity: 7,
      };

      // when
      await db.saveThing(thing);
      await db.deleteThing(thingId);
      const actualThings = await db.getThing(thingId);

      // then
      expect(actualThings).toEqual([]);
    }));

  it("can’t retrieve a thing that was never there", () =>
    withPg(async (db) => {
      // given
      const thingId = randomThingId();

      // when
      const actualThings = await db.getThing(thingId);

      // then
      expect(actualThings).toEqual([]);
    }));

  it("can overwrite a thing", () =>
    withPg(async (db) => {
      // given
      const thingId = randomThingId();
      const thing1: Thing = {
        thingId,
        name: "carrot",
        quantity: 3,
      };
      const thing2: Thing = {
        thingId,
        name: "doughnut",
        quantity: 5,
      };
      const expectedThings = [thing2];

      // when
      await db.saveThing(thing1);
      await db.saveThing(thing2);
      const actualThings = await db.getThing(thingId);

      // then
      expect(actualThings).toEqual(expectedThings);
    }));

  describe("timestamp metadata", () => {
    describe("when_created", () => {
      it("is initially set to the current time", () =>
        withPg((db) =>
          withClient(async (client) => {
            // given
            const thingId = randomThingId();
            const thing = randomThing({ thingId });

            // when
            const before = Instant.now();

            await db.saveThing(thing);
            const { rows } = await client.query({
              text: `
                    SELECT when_created
                    FROM things
                    WHERE thing_id = $1
                `,
              values: [thingId],
            });
            const whenCreated = nativeJs(rows[0].when_created).toInstant();

            const after = Instant.now();

            // then
            expect(whenCreated.toEpochMilli()).toBeGreaterThanOrEqual(
              before.toEpochMilli()
            );
            expect(whenCreated.toEpochMilli()).toBeLessThanOrEqual(
              after.toEpochMilli()
            );
          })
        ));

      it.todo("is NOT updated when the thing is updated");
    });

    describe("when_updated", () => {
      it.todo("is initially set to the current time");
      it.todo("is updated to the current time when the thing is updated");
    });
  });
});
