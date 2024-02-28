import { kysely } from '../../common/plugin/kysely.plugin';
import { FilmRowType, InsertableFilmRowType } from '../../common/type/kysely/film.type';
import { attachFilm } from '../actor/repository';

export async function insert(values: InsertableFilmRowType, actors: number[]) {
  const insertedRow = await kysely.insertInto('film').values(values).returning(['film.id']).executeTakeFirstOrThrow();

  await attachFilm(actors, insertedRow.id);

  const result = await kysely.selectFrom('film').select(['film.id', 'film.name']).where('film.id', '=', insertedRow.id).executeTakeFirst();

  const actorArr = await kysely.selectFrom('actor').select(['actor.id', 'actor.name']).where('actor.relation', '=', insertedRow.id).execute();

  return { ...result, actors: actorArr };
}

export async function update(id: number, name: string) {
  const result = await kysely.updateTable('film').where('film.id', '=', id).set({ name }).returning(['film.id', 'film.name']).execute();

  return result;
}

export async function select() {
  const result = await kysely
    .selectFrom('film')
    .select(['film.id', 'film.name'])
    .orderBy('film.name', 'asc')
    .execute()
    .then(async function (data) {
      for (const el of data) {
        const actorArr = await kysely.selectFrom('actor').select(['actor.id', 'actor.name']).where('actor.relation', '=', el.id).execute();

        Object.assign(el, { actors: actorArr });
      }

      return data;
    });

  return result;
}

export async function selectOne(id: number) {
  const result = await kysely.selectFrom('film').where('film.id', '=', id).select(['film.id', 'film.name']).executeTakeFirst();

  if (result === undefined) {
    return result;
  }

  const actorArr = await kysely.selectFrom('actor').select(['actor.id', 'actor.name']).where('actor.relation', '=', result.id).execute();

  return { ...result, actors: actorArr };
}

export async function destroy(id: number) {
  const result = await kysely.deleteFrom('film').where('film.id', '=', id).execute();

  return result;
}

export async function countUniversal(column: keyof FilmRowType, value: string | number, notId?: number, notIdArr?: number[]): Promise<number> {
  if (notId !== undefined) {
    const result = await kysely
      .selectFrom('film')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  if (notIdArr !== undefined) {
    const result = await kysely
      .selectFrom('film')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  const result = await kysely
    .selectFrom('film')
    .select(({ fn }) => [fn.count<bigint>('id').as('count')])
    .where(column, '=', value)
    .executeTakeFirstOrThrow();

  return Number(result.count);
}
