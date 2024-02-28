import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;
export interface Actor {
    id: Generated<number>;
    name: string;
    relation: number | null;
}
export interface Film {
    id: Generated<number>;
    name: string;
}
export interface User {
    email: string;
    id: Generated<number>;
    password: string;
    username: string;
}
export interface DB {
    actor: Actor;
    film: Film;
    user: User;
}
