import Joi from 'joi';
export declare const UpdateFilmSchema: Joi.ObjectSchema<any>;
export interface IUpdateFilmSchema {
    name?: string;
    actors?: number[];
}
