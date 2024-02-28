import SQLite from 'better-sqlite3';
import { Application } from 'express';
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from 'kysely';
import { consoleColor } from '../constant/consoleColor.constant';
import { DB } from '../type/kysely/db.type';

export let kysely: Kysely<DB>;

export async function kyselyPlugin(app: Application) {
  try {
    const sqliteDialect = new SqliteDialect({
      database: new SQLite('./database/sqlite.db'),
    });

    const db = new Kysely<DB>({
      dialect: sqliteDialect,
      plugins: [new ParseJSONResultsPlugin()],
    });
    console.info(consoleColor.FG.GREEN, '[APP] Postgres: connection established');

    kysely = db;

    app.on('onClose', async () => {
      await db.destroy();
      await kysely.destroy();
    });
  } catch (e) {
    console.info(consoleColor.FG.RED, '[APP] Postgres: failed to establish database connection. See details:');
    console.error(e);
    process.exit(1);
  }
}
