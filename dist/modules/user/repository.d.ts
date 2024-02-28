import { InsertableUserRowType, UserRowType } from '../../common/type/kysely/user.type';
export declare function insert(values: InsertableUserRowType): Promise<{
    id: number;
    username: string;
    email: string;
}>;
export declare function selectOne(username: string): Promise<UserRowType | undefined>;
export declare function countUniversal(column: keyof UserRowType, value: string, notId?: number, notIdArr?: number[]): Promise<number>;
