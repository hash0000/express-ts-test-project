import { Application } from 'express';
import { Kysely } from 'kysely';
import { DB } from '../type/kysely/db.type';
export declare let kysely: Kysely<DB>;
export declare function kyselyPlugin(app: Application): Promise<void>;
