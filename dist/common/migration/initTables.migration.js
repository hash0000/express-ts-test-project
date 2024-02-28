"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(db) {
    await db.schema
        .createTable('user')
        .addColumn('id', 'integer', (col) => col.primaryKey().notNull().unique().autoIncrement())
        .addColumn('email', 'varchar(1024)', (col) => col.notNull().unique())
        .addColumn('username', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('password', 'varchar(255)', (col) => col.notNull())
        .execute();
    await db.schema
        .createTable('actor')
        .addColumn('id', 'integer', (col) => col.primaryKey().notNull().unique().autoIncrement())
        .addColumn('name', 'varchar(1024)', (col) => col.notNull().unique())
        .addColumn('relation', 'integer', (col) => col.references('film.id').onDelete('set null'))
        .execute();
    await db.schema
        .createTable('film')
        .addColumn('id', 'integer', (col) => col.primaryKey().notNull().unique().autoIncrement())
        .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
        .execute();
}
exports.up = up;
async function down(db) {
    await db.schema.dropTable('film').cascade().execute();
    await db.schema.dropTable('actor').cascade().execute();
    await db.schema.dropTable('user').cascade().execute();
}
exports.down = down;
//# sourceMappingURL=initTables.migration.js.map