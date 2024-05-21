import { Client } from "pg";
import Pool from "pg-pool";
import { Thing } from "./domain";

export interface DatabasePool {
  withConnection<R>(
    continuation: (connection: DatabaseConnection) => Promise<R>
  ): Promise<R>;
}

export const pgPool = (): DatabasePool & DatabaseCloser => {
  const pool = new Pool();
  return {
    withConnection: async (continuation) => {
      const client = await pool.connect();
      try {
        return await continuation(pg(client));
      } finally {
        await client.release();
      }
    },
    close: async () => await pool.end(),
  };
};

export interface DatabaseCloser {
  close(): Promise<void>;
}

export interface DatabaseConnection {
  saveThing(thing: Thing): Promise<void>;
  getThing(thingId: Thing.Id): Promise<[Thing] | []>;
  deleteThing(thingId: Thing.Id): Promise<void>;
}

const pg = (db: Client): DatabaseConnection => {
  return {
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

export const withPg = async <R>( // used only by tests
  continuation: (db: DatabaseConnection) => Promise<R>
): Promise<R> => {
  const client = new Client();
  await client.connect();
  const db = await pg(client);
  try {
    return await continuation(db);
  } finally {
    await client.end();
  }
};
