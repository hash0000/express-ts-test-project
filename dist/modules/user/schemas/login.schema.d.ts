import Joi from 'joi';
export declare const LoginUserSchema: Joi.ObjectSchema<any>;
export interface ILoginUserSchema {
    username: string;
    password: string;
}
