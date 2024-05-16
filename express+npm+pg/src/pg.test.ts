import { withPg, Thing } from "./pg";

describe("things", () => {
  it("can save and retrieve a thing", () =>
    withPg(async (db) => {
      // given
      const thingId: Thing.Id = "1";
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
      const thingId: Thing.Id = "2";
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
      const thingId: Thing.Id = "3";

      // when
      const actualThings = await db.getThing(thingId);

      // then
      expect(actualThings).toEqual([]);
    }));

  // DAVE: add test case for save overwriting previous save
  // DAVE: add test cases for when_created/when_updated
});
