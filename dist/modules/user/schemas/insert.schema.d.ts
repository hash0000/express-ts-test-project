import Joi from 'joi';
export declare const InsertUserSchema: Joi.ObjectSchema<any>;
export interface IInsertUserSchema {
    username: string;
    email: string;
    password: string;
}
