import { NextFunction, Request, Response } from 'express';
export declare function AuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<void>;
