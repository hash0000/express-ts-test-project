import SQLite from 'better-sqlite3';
import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from 'kysely';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
// import { DB } from '../type/kysely/db.type';

async function migrateToLatest() {
  const db = new Kysely<any>({
    dialect: new SqliteDialect({
      database: new SQLite('./database/sqlite.db'),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migration'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
      process.exit(1);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
      process.exit(1);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
