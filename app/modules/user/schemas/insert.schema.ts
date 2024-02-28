import Joi from 'joi';

export const InsertUserSchema = Joi.object()
  .keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .required();

export interface IInsertUserSchema {
  username: string;
  email: string;
  password: string;
}
