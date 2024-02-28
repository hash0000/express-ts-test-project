import { kysely } from '../../common/plugin/kysely.plugin';
import { InsertableUserRowType, UserRowType } from '../../common/type/kysely/user.type';

export async function insert(values: InsertableUserRowType): Promise<{ id: number; username: string; email: string }> {
  const insertedRow = await kysely.insertInto('user').values(values).returning(['user.id', 'user.username', 'user.email']).executeTakeFirstOrThrow();

  return insertedRow;
}

export async function selectOne(username: string): Promise<UserRowType | undefined> {
  const result = await kysely.selectFrom('user').where('user.username', '=', username).selectAll().executeTakeFirst();

  return result;
}

export async function countUniversal(column: keyof UserRowType, value: string, notId?: number, notIdArr?: number[]): Promise<number> {
  if (notId !== undefined) {
    const result = await kysely
      .selectFrom('user')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  if (notIdArr !== undefined) {
    const result = await kysely
      .selectFrom('user')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  const result = await kysely
    .selectFrom('user')
    .select(({ fn }) => [fn.count<bigint>('id').as('count')])
    .where(column, '=', value)
    .executeTakeFirstOrThrow();

  return Number(result.count);
}
