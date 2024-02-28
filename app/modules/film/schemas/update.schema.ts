import Joi from 'joi';
import { propertyLength } from '../../../common/constant/propertyLength';

export const UpdateFilmSchema = Joi.object()
  .keys({
    name: Joi.string().min(propertyLength.ACTOR.NAME.MIN).max(propertyLength.ACTOR.NAME.MAX).required(),
    actors: Joi.array().items(Joi.number()).min(1).unique().optional(),
  })
  .required();

export interface IUpdateFilmSchema {
  name: string;
  actors: number[];
}
