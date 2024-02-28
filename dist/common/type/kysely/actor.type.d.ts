import { Insertable, Selectable, Updateable } from 'kysely';
import { Actor } from './db.type';
export type ActorRowType = Selectable<Actor>;
export type InsertableActorRowType = Insertable<Actor>;
export type UpdateableActorRowType = Updateable<Actor>;
