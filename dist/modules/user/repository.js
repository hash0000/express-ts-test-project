"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countUniversal = exports.selectOne = exports.insert = void 0;
const kysely_plugin_1 = require("../../common/plugin/kysely.plugin");
async function insert(values) {
    const insertedRow = await kysely_plugin_1.kysely.insertInto('user').values(values).returning(['user.id', 'user.username', 'user.email']).executeTakeFirstOrThrow();
    return insertedRow;
}
exports.insert = insert;
async function selectOne(username) {
    const result = await kysely_plugin_1.kysely.selectFrom('user').where('user.username', '=', username).selectAll().executeTakeFirst();
    return result;
}
exports.selectOne = selectOne;
async function countUniversal(column, value, notId, notIdArr) {
    if (notId !== undefined) {
        const result = await kysely_plugin_1.kysely
            .selectFrom('user')
            .select(({ fn }) => [fn.count('id').as('count')])
            .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
            .executeTakeFirstOrThrow();
        return Number(result.count);
    }
    if (notIdArr !== undefined) {
        const result = await kysely_plugin_1.kysely
            .selectFrom('user')
            .select(({ fn }) => [fn.count('id').as('count')])
            .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
            .executeTakeFirstOrThrow();
        return Number(result.count);
    }
    const result = await kysely_plugin_1.kysely
        .selectFrom('user')
        .select(({ fn }) => [fn.count('id').as('count')])
        .where(column, '=', value)
        .executeTakeFirstOrThrow();
    return Number(result.count);
}
exports.countUniversal = countUniversal;
//# sourceMappingURL=repository.js.map