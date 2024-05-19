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

const getNow = async (client: Client): Promise<Instant> => {
  const { rows } = await client.query({
    text: `SELECT NOW()`,
  });
  return nativeJs(rows[0].now).toInstant();
};

const getWhenCreated = async (
  client: Client,
  thingId: Thing.Id
): Promise<Instant> => {
  const { rows } = await client.query({
    text: `
                SELECT when_created
                FROM things
                WHERE thing_id = $1
            `,
    values: [thingId],
  });
  return nativeJs(rows[0].when_created).toInstant();
};

const getWhenUpdated = async (
  client: Client,
  thingId: Thing.Id
): Promise<Instant> => {
  const { rows } = await client.query({
    text: `
                  SELECT when_updated
                  FROM things
                  WHERE thing_id = $1
              `,
    values: [thingId],
  });
  return nativeJs(rows[0].when_updated).toInstant();
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
            const before = await getNow(client);
            await db.saveThing(thing);
            const after = await getNow(client);

            // then
            const whenCreated = await getWhenCreated(client, thingId);
            expect(whenCreated).toBeBetweenInclusive(before, after);
          })
        ));

      it("is NOT updated when the thing is updated", () =>
        withPg((db) =>
          withClient(async (client) => {
            // given
            const thingId = randomThingId();
            const thing1 = randomThing({ thingId });
            const thing2 = randomThing({ thingId });

            // when
            const before = await getNow(client);
            await db.saveThing(thing1);
            const after = await getNow(client);
            await sleep(1);
            await db.saveThing(thing2);

            // then
            const whenCreated = await getWhenCreated(client, thingId);
            expect(whenCreated).toBeBetweenInclusive(before, after);
          })
        ));
    });

    describe("when_updated", () => {
      it("is initially set to the current time", () =>
        withPg((db) =>
          withClient(async (client) => {
            // given
            const thingId = randomThingId();
            const thing = randomThing({ thingId });

            // when
            const before = await getNow(client);
            await db.saveThing(thing);
            const after = await getNow(client);

            // then
            const whenUpdated = await getWhenUpdated(client, thingId);
            expect(whenUpdated).toBeBetweenInclusive(before, after);
          })
        ));

      it("is updated to the current time when the thing is updated", () =>
        withPg((db) =>
          withClient(async (client) => {
            // given
            const thingId = randomThingId();
            const thing1 = randomThing({ thingId });
            const thing2 = randomThing({ thingId });

            // when
            await db.saveThing(thing1);
            await sleep(1);
            const before = await getNow(client);
            await db.saveThing(thing2);
            const after = await getNow(client);

            // then
            const whenUpdated = await getWhenUpdated(client, thingId);
            expect(whenUpdated).toBeBetweenInclusive(before, after);
          })
        ));
    });
  });
});
