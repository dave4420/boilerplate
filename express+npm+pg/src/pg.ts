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

    saveThing: async (thing) => {},
    getThing: async (thingId) => [],
    deleteThing: async (thingId) => {},
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
