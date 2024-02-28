import Joi from 'joi';

export const LoginUserSchema = Joi.object()
  .keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
  .required();

export interface ILoginUserSchema {
  username: string;
  password: string;
}
