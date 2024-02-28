import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { HttpStatusCode } from '../enum/httpStatusCode.enum';

export function ValidationMiddleware(schema: ObjectSchema, payloadKey: 'body' | 'query' | 'params') {
  return async function (request: Request, response: Response, next: NextFunction) {
    try {
      const validated = await schema.validateAsync(request[payloadKey], { allowUnknown: false, abortEarly: false, convert: false });

      request[payloadKey] = validated;

      return next();
    } catch (error) {
      const validationErrorArray: object[] = [];

      if (error instanceof ValidationError) {
        for (const el of error.details) {
          validationErrorArray.push({ property: el.context?.key, type: el.type, message: el.context?.message });
        }

        return response.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
          statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
          validationError: validationErrorArray,
        });
      }

      return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
  };
}
