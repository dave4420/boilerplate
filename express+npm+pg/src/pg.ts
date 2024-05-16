import { Client } from "pg";

export type Thing = Readonly<{
  thingId: Thing.Id;
  name: string;
  quantity: number;
}>;

export namespace Thing {
  export type Id = string; // DAVE: make it branded
  export const idOrNull = (raw: string): Id | null => raw; // DAVE: confirm it's a UUID
}

export interface Database {
  close(): Promise<void>;

  saveThing(thing: Thing): Promise<void>;
  getThing(thingId: Thing.Id): Promise<[Thing] | []>;
  deleteThing(thingId: Thing.Id): Promise<void>;
}

export const pg = async (): Promise<Database> => {
  const db = new Client();
  await db.connect();

  return {
    close: async () => await db.end(),

    saveThing: async (thing) => {
      await db.query({
        text: `
            INSERT INTO things (thing_id, name, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (thing_id) DO UPDATE
            SET name = $2, quantity = $3
        `,
        values: [thing.thingId, thing.name, thing.quantity],
      });
    },

    getThing: async (thingId) => {
      const { rows } = await db.query({
        text: `
                SELECT name, quantity
                FROM things
                WHERE thing_id = $1
            `,
        values: [thingId],
      });
      if (rows.length === 0) {
        return [];
      }
      return [
        {
          thingId,
          name: rows[0].name,
          quantity: rows[0].quantity,
        },
      ];
    },

    deleteThing: async (thingId) => {
      await db.query({
        text: `
                DELETE FROM things
                WHERE thing_id = $1
            `,
        values: [thingId],
      });
    },
  };
};

export const withPg = async <R>(
  continuation: (db: Database) => Promise<R>
): Promise<R> => {
  const db = await pg();
  try {
    return await continuation(db);
  } finally {
    await db.close();
  }
};
