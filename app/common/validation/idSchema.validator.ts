import Joi from 'joi';

export const IdSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
  })
  .options({ convert: true })
  .required();

export interface IIdSchema {
  id: number;
}
