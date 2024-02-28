import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
export declare function ValidationMiddleware(schema: ObjectSchema, payloadKey: 'body' | 'query' | 'params'): (request: Request, response: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
