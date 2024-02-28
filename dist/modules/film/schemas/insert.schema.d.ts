import Joi from 'joi';
export declare const InsertFilmSchema: Joi.ObjectSchema<any>;
export interface IInsertFilmSchema {
    name: string;
    actors: number[];
}
