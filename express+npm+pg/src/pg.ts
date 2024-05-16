export interface Database {
  close(): Promise<void>;
}

export const pg = async (): Promise<Database> => {
  throw Error("DAVE");
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
