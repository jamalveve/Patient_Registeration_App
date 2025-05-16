import { PGlite } from "@electric-sql/pglite";
let usersDbInstance = null;

export async function getUsersDb() {
  if (usersDbInstance) return usersDbInstance;
  usersDbInstance = new PGlite('idb://Users-db', { persist: true });
  await usersDbInstance.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
  return usersDbInstance;
}
