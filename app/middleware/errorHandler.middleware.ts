import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { consoleColor } from '../common/constant/consoleColor.constant';
import { HttpStatusCode } from '../common/enum/httpStatusCode.enum';
import { MainResponseType } from '../common/type/mainResponse.type';

export const errorHandlerMiddleware = function (error: any, _request: Request, response: Response, _next: NextFunction) {
  console.log(' ');
  if (error.statusCode === 500 || error.statusCode === undefined) {
    console.info(consoleColor.FG.RED, `[APP] Unexpected error at ${new Date()}. See details:`);
    console.error(error);

    return response.status(500).json({ statusCode: 500 });
  }

  let mainResponse: MainResponseType;

  if (error instanceof ValidationError) {
    const validationErrorArray: object[] = [];

    for (const el of error.details) {
      validationErrorArray.push({ property: el.context?.key, type: el.type, message: el.context?.message });
    }

    mainResponse = {
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      validationError: validationErrorArray,
    };
  } else {
    mainResponse = {
      statusCode: error.statusCode,
      validationError: [{ message: error.message }],
    };
  }

  response.status(mainResponse.statusCode).json(mainResponse);
};
