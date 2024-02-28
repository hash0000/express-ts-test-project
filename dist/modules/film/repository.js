"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countUniversal = exports.destroy = exports.selectOne = exports.select = exports.update = exports.insert = void 0;
const kysely_plugin_1 = require("../../common/plugin/kysely.plugin");
const repository_1 = require("../actor/repository");
async function insert(values, actors) {
    const insertedRow = await kysely_plugin_1.kysely.insertInto('film').values(values).returning(['film.id']).executeTakeFirstOrThrow();
    await (0, repository_1.attachFilm)(actors, insertedRow.id);
    const result = await kysely_plugin_1.kysely.selectFrom('film').select(['film.id', 'film.name']).where('film.id', '=', insertedRow.id).executeTakeFirst();
    const actorArr = await kysely_plugin_1.kysely.selectFrom('actor').select(['actor.id', 'actor.name']).where('actor.relation', '=', insertedRow.id).execute();
    return { ...result, actors: actorArr };
}
exports.insert = insert;
async function update(id, name) {
    const result = await kysely_plugin_1.kysely.updateTable('film').where('film.id', '=', id).set({ name }).returning(['film.id', 'film.name']).execute();
    return result;
}
exports.update = update;
async function select() {
    const result = await kysely_plugin_1.kysely
        .selectFrom('film')
        .select(['film.id', 'film.name'])
        .orderBy('film.name', 'asc')
        .execute()
        .then(async function (data) {
        for (const el of data) {
            const actorArr = await kysely_plugin_1.kysely.selectFrom('actor').select(['actor.id', 'actor.name']).where('actor.relation', '=', el.id).execute();
            Object.assign(el, { actors: actorArr });
        }
        return data;
    });
    return result;
}
exports.select = select;
async function selectOne(id) {
    const result = await kysely_plugin_1.kysely.selectFrom('film').where('film.id', '=', id).select(['film.id', 'film.name']).executeTakeFirst();
    if (result === undefined) {
        return result;
    }
    const actorArr = await kysely_plugin_1.kysely.selectFrom('actor').select(['actor.id', 'actor.name']).where('actor.relation', '=', result.id).execute();
    return { ...result, actors: actorArr };
}
exports.selectOne = selectOne;
async function destroy(id) {
    const result = await kysely_plugin_1.kysely.deleteFrom('film').where('film.id', '=', id).execute();
    return result;
}
exports.destroy = destroy;
async function countUniversal(column, value, notId, notIdArr) {
    if (notId !== undefined) {
        const result = await kysely_plugin_1.kysely
            .selectFrom('film')
            .select(({ fn }) => [fn.count('id').as('count')])
            .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
            .executeTakeFirstOrThrow();
        return Number(result.count);
    }
    if (notIdArr !== undefined) {
        const result = await kysely_plugin_1.kysely
            .selectFrom('film')
            .select(({ fn }) => [fn.count('id').as('count')])
            .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
            .executeTakeFirstOrThrow();
        return Number(result.count);
    }
    const result = await kysely_plugin_1.kysely
        .selectFrom('film')
        .select(({ fn }) => [fn.count('id').as('count')])
        .where(column, '=', value)
        .executeTakeFirstOrThrow();
    return Number(result.count);
}
exports.countUniversal = countUniversal;
//# sourceMappingURL=repository.js.map