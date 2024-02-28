import { Insertable, Selectable, Updateable } from 'kysely';
import { Film } from './db.type';
export type FilmRowType = Selectable<Film>;
export type InsertableFilmRowType = Insertable<Film>;
export type UpdateableFilmRowType = Updateable<Film>;
