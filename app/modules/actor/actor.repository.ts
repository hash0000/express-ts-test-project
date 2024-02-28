import { kysely } from '../../common/plugin/kysely.plugin';
import { ActorRowType, InsertableActorRowType } from '../../common/type/kysely/actor.type';

export async function insert(values: InsertableActorRowType) {
  const insertedRow = await kysely.insertInto('actor').values(values).returningAll().executeTakeFirstOrThrow();

  return insertedRow;
}

export async function countUniversal(column: keyof ActorRowType, value: string, notId?: number, notIdArr?: number[]): Promise<number> {
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
