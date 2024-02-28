"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countUniversal = exports.destroy = exports.selectOne = exports.unattachFilms = exports.attachFilm = exports.select = exports.update = exports.insert = void 0;
const kysely_plugin_1 = require("../../common/plugin/kysely.plugin");
async function insert(values) {
    const insertedRow = await kysely_plugin_1.kysely.insertInto('actor').values(values).returning(['actor.id', 'actor.name']).executeTakeFirstOrThrow();
    return insertedRow;
}
exports.insert = insert;
async function update(id, name) {
    const result = await kysely_plugin_1.kysely.updateTable('actor').where('actor.id', '=', id).set({ name }).returning(['actor.id', 'actor.name']).execute();
    return result;
}
exports.update = update;
async function select() {
    const result = await kysely_plugin_1.kysely.selectFrom('actor').select(['actor.id', 'actor.name']).orderBy('actor.name', 'asc').execute();
    return result;
}
exports.select = select;
async function attachFilm(ids, filmId) {
    await kysely_plugin_1.kysely.updateTable('actor').where('actor.id', 'in', ids).set({ relation: filmId }).execute();
    return;
}
exports.attachFilm = attachFilm;
async function unattachFilms(filmId) {
    await kysely_plugin_1.kysely.updateTable('actor').where('actor.relation', '=', filmId).set({ relation: null }).execute();
    return;
}
exports.unattachFilms = unattachFilms;
async function selectOne(id) {
    const result = await kysely_plugin_1.kysely.selectFrom('actor').where('actor.id', '=', id).select(['actor.id', 'actor.name']).executeTakeFirst();
    return result;
}
exports.selectOne = selectOne;
async function destroy(id) {
    const result = await kysely_plugin_1.kysely.deleteFrom('actor').where('actor.id', '=', id).execute();
    return result;
}
exports.destroy = destroy;
async function countUniversal(column, value, notId, notIdArr) {
    if (notId !== undefined) {
        const result = await kysely_plugin_1.kysely
            .selectFrom('actor')
            .select(({ fn }) => [fn.count('id').as('count')])
            .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
            .executeTakeFirstOrThrow();
        return Number(result.count);
    }
    if (notIdArr !== undefined) {
        const result = await kysely_plugin_1.kysely
            .selectFrom('actor')
            .select(({ fn }) => [fn.count('id').as('count')])
            .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
            .executeTakeFirstOrThrow();
        return Number(result.count);
    }
    const result = await kysely_plugin_1.kysely
        .selectFrom('actor')
        .select(({ fn }) => [fn.count('id').as('count')])
        .where(column, '=', value)
        .executeTakeFirstOrThrow();
    return Number(result.count);
}
exports.countUniversal = countUniversal;
//# sourceMappingURL=repository.js.map