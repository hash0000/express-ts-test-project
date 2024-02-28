import jwt from 'jsonwebtoken';
import { JwtPayloadType } from '../type/jwtPayload.type';

export function generateToken(payload: JwtPayloadType) {
  try {
    const expiresIn = process.env.TOKEN_EXPIRE || '7d';
    const secret = process.env.JWT_SECRET;

    if (secret === undefined) {
      throw new Error();
    }

    return jwt.sign(payload, secret, { expiresIn });
  } catch (e) {
    throw new Error();
  }
}
