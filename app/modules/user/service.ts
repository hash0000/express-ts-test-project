import * as argon from 'argon2';
import { omit } from 'lodash';
import { ValidationErrorType } from '../../common/enum/errorType.enum';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { generateToken } from '../../common/helper/genJwtToken.helper';
import { MainResponseType } from '../../common/type/mainResponse.type';
import * as repository from './repository';
import { IInsertUserSchema } from './schemas/insert.schema';
import { ILoginUserSchema } from './schemas/login.schema';

export async function insert(request: IInsertUserSchema): Promise<MainResponseType> {
  const countActorByUsername = await repository.countUniversal('username', request.username);
  if (countActorByUsername !== 0) {
    return {
      statusCode: HttpStatusCode.CONFLICT,
      validationError: [{ property: 'username', type: ValidationErrorType.NOT_UNIQUE }],
    };
  }

  const countActorByEmail = await repository.countUniversal('email', request.email);
  if (countActorByEmail !== 0) {
    return {
      statusCode: HttpStatusCode.CONFLICT,
      validationError: [{ property: 'email', type: ValidationErrorType.NOT_UNIQUE }],
    };
  }

  const salt = process.env.JWT_SALT;
  if (salt === undefined) {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
  }

  const encrPass = await argon.hash(request.password, {
    type: 2,
    salt: Buffer.from(salt, 'utf-8'),
  });

  const data = await repository.insert({ ...omit(request, ['password']), password: encrPass });

  return {
    statusCode: HttpStatusCode.CREATED,
    data,
  };
}

export async function login(request: ILoginUserSchema): Promise<MainResponseType> {
  const data = await repository.selectOne(request.username);

  if (data === undefined) {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
  }

  const passwordMatches = await argon.verify(data.password, request.password);

  if (passwordMatches === false) {
    return {
      statusCode: HttpStatusCode.BAD_GATEWAY,
    };
  }

  const token = generateToken({ id: data.id, username: data.username });
  const userData = omit(data, ['password']);

  return {
    statusCode: HttpStatusCode.OK,
    data: {
      user: userData,
      token,
    },
  };
}
