import { FilmRowType, InsertableFilmRowType } from '../../common/type/kysely/film.type';
export declare function insert(values: InsertableFilmRowType, actors: number[]): Promise<{
    actors: {
        id: number;
        name: string;
    }[];
    id?: number | undefined;
    name?: string | undefined;
}>;
export declare function update(id: number, name: string): Promise<{
    id: number;
    name: string;
}[]>;
export declare function select(): Promise<{
    id: number;
    name: string;
}[]>;
export declare function selectOne(id: number): Promise<{
    actors: {
        id: number;
        name: string;
    }[];
    id: number;
    name: string;
} | undefined>;
export declare function destroy(id: number): Promise<import("kysely").DeleteResult[]>;
export declare function countUniversal(column: keyof FilmRowType, value: string | number, notId?: number, notIdArr?: number[]): Promise<number>;
