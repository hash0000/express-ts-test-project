import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpStatusCode } from '../common/enum/httpStatusCode.enum';

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const secret = process.env.JWT_SECRET;

    if (secret === undefined) {
      throw new Error();
    }

    const decoded = jwt.verify(token, secret);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(HttpStatusCode.UNAUTHORIZED).send();
  }
}
