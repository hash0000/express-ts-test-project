import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull().autoIncrement())
    .addColumn('email', 'varchar(1024)', (col) => col.notNull().unique())
    .addColumn('username', 'varchar(1024)', (col) => col.notNull().unique())
    .addColumn('password', 'varchar(1024)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('actor')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull().autoIncrement())
    .addColumn('name', 'varchar(1024)', (col) => col.notNull().unique())
    .addColumn('relation', 'integer', (col) => col.references('film.id').onDelete('set null'))
    .execute();

  await db.schema
    .createTable('film')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull().autoIncrement())
    .addColumn('name', 'varchar(1024)', (col) => col.notNull().unique())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('film').cascade().execute();
  await db.schema.dropTable('actor').cascade().execute();
  await db.schema.dropTable('user').cascade().execute();
}
