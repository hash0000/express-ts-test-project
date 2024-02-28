import { kysely } from '../../common/plugin/kysely.plugin';
import { ActorRowType, InsertableActorRowType } from '../../common/type/kysely/actor.type';

export async function insert(values: InsertableActorRowType) {
  const insertedRow = await kysely.insertInto('actor').values(values).returning(['actor.id', 'actor.name']).executeTakeFirstOrThrow();

  return insertedRow;
}

export async function update(id: number, name: string) {
  const result = await kysely.updateTable('actor').where('actor.id', '=', id).set({ name }).returning(['actor.id', 'actor.name']).execute();

  return result;
}

export async function select() {
  const result = await kysely.selectFrom('actor').select(['actor.id', 'actor.name']).orderBy('actor.name', 'asc').execute();

  return result;
}

export async function attachFilm(ids: number[], filmId: number): Promise<void> {
  await kysely.updateTable('actor').where('actor.id', 'in', ids).set({ relation: filmId }).execute();

  return;
}

// query optimization is required. Only for test task
export async function unattachFilms(filmId: number): Promise<void> {
  await kysely.updateTable('actor').where('actor.relation', '=', filmId).set({ relation: null }).execute();

  return;
}

export async function selectOne(id: number) {
  const result = await kysely.selectFrom('actor').where('actor.id', '=', id).select(['actor.id', 'actor.name']).executeTakeFirst();

  return result;
}

export async function destroy(id: number) {
  const result = await kysely.deleteFrom('actor').where('actor.id', '=', id).execute();

  return result;
}

export async function countUniversal(column: keyof ActorRowType, value: string | number, notId?: number, notIdArr?: number[]): Promise<number> {
  if (notId !== undefined) {
    const result = await kysely
      .selectFrom('actor')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  if (notIdArr !== undefined) {
    const result = await kysely
      .selectFrom('actor')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  const result = await kysely
    .selectFrom('actor')
    .select(({ fn }) => [fn.count<bigint>('id').as('count')])
    .where(column, '=', value)
    .executeTakeFirstOrThrow();

  return Number(result.count);
}
