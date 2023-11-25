import * as SQLite from 'expo-sqlite';

import {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client';

const db = SQLite.openDatabase('reactQuery.db');

/**
 * Creates an Expo SQLite persister
 */
export function createExpoSQLitePersister() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);`,
      []
    );
  });

  return {
    persistClient: async (client: PersistedClient) => {
      db.transaction((tx) => {
        tx.executeSql(`INSERT INTO clients (data) VALUES (?)`, [
          JSON.stringify(client),
        ]);
      });
    },
    restoreClient: async () =>
      new Promise((resolve) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM clients ORDER BY id DESC LIMIT 1`,
            [],
            (_, { rows }) =>
              resolve(rows.length ? JSON.parse(rows.item(0).data) : null)
          );
        });
      }),
    removeClient: async () => {
      db.transaction((tx) => {
        tx.executeSql(`DELETE FROM clients`, []);
      });
    },
  } as Persister;
}
