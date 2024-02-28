import { ActorRowType, InsertableActorRowType } from '../../common/type/kysely/actor.type';
export declare function insert(values: InsertableActorRowType): Promise<{
    id: number;
    name: string;
}>;
export declare function update(id: number, name: string): Promise<{
    id: number;
    name: string;
}[]>;
export declare function select(): Promise<{
    id: number;
    name: string;
}[]>;
export declare function attachFilm(ids: number[], filmId: number): Promise<void>;
export declare function unattachFilms(filmId: number): Promise<void>;
export declare function selectOne(id: number): Promise<{
    id: number;
    name: string;
} | undefined>;
export declare function destroy(id: number): Promise<import("kysely").DeleteResult[]>;
export declare function countUniversal(column: keyof ActorRowType, value: string | number, notId?: number, notIdArr?: number[]): Promise<number>;
