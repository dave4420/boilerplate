import { Client } from "pg";
import { resetRandomIds } from "./test-globals";

export default async () => {
  resetRandomIds();
  const db = new Client();
  try {
    await db.connect();
    const { rows } = await db.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_catalog = CURRENT_DATABASE()
          AND table_schema = CURRENT_SCHEMA()
          AND table_type='BASE TABLE'
          AND table_name NOT IN ('migrations')
    `);
    for (const { table_name } of rows) {
      await db.query(`TRUNCATE TABLE ${table_name} CASCADE`);
    }
  } finally {
    await db.end();
  }
};
