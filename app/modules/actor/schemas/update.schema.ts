import Joi from 'joi';
import { propertyLength } from '../../../common/constant/propertyLength';

export const UpdateActorSchema = Joi.object()
  .keys({
    name: Joi.string().min(propertyLength.ACTOR.NAME.MIN).max(propertyLength.ACTOR.NAME.MAX).required(),
  })
  .required();

export interface IUpdateActorSchema {
  name: string;
}
