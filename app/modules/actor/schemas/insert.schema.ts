import Joi from 'joi';
import { propertyLength } from '../../../common/constant/propertyLength';

export const InsertActorSchema = Joi.object()
  .keys({
    name: Joi.string().min(propertyLength.ACTOR.NAME.MIN).max(propertyLength.ACTOR.NAME.MAX).required(),
  })
  .required();

export interface IInsertActorSchema {
  name: string;
}
