import * as SQLite from 'expo-sqlite';

import {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client';

const db = SQLite.openDatabaseSync('reactQuery.db');

/**
 * Creates an Expo SQLite persister
 */
export function createExpoSQLitePersister() {
  db.withExclusiveTransactionAsync(async (txn) => {
    await txn.runAsync(
      `CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);`
    );
  });

  return {
    persistClient: async (client: PersistedClient) =>
      db.withExclusiveTransactionAsync(async (txn) => {
        await txn.runAsync(`INSERT INTO clients (data) VALUES (?)`, [
          JSON.stringify(client),
        ]);
      }),
    restoreClient: async () =>
      db.withExclusiveTransactionAsync(async (txn) => {
        const result = (await txn.getFirstAsync(
          `SELECT * FROM clients ORDER BY id DESC`
        )) as any;
        return result.data ? JSON.parse(result.data) : null;
      }),
    removeClient: async () => {
      db.withExclusiveTransactionAsync(async (txn) => {
        await txn.runAsync(`DELETE FROM clients`);
      });
    },
  } as Persister;
}
