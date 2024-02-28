import { ValidationErrorType } from '../../common/enum/errorType.enum';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { MainResponseType } from '../../common/type/mainResponse.type';
import { IIdSchema } from '../../common/validation/uuidSchema.validator';
import { attachFilm, unattachFilms } from '../actor/repository';
import * as repository from './repository';
import { IInsertFilmSchema } from './schemas/insert.schema';
import { IUpdateFilmSchema } from './schemas/update.schema';

export async function insert(request: IInsertFilmSchema): Promise<MainResponseType> {
  const count = await repository.countUniversal('name', request.name);
  if (count !== 0) {
    return {
      statusCode: HttpStatusCode.CONFLICT,
      validationError: [{ property: 'name', type: ValidationErrorType.NOT_UNIQUE }],
    };
  }

  const data = await repository.insert({ name: request.name }, request.actors);

  return {
    statusCode: HttpStatusCode.CREATED,
    data,
  };
}

export async function update(request: IIdSchema & IUpdateFilmSchema): Promise<MainResponseType> {
  if (request?.name !== undefined) {
    const count = await repository.countUniversal('name', request.name, request.id);
    if (count !== 0) {
      return {
        statusCode: HttpStatusCode.CONFLICT,
        validationError: [{ property: 'name', type: ValidationErrorType.NOT_UNIQUE }],
      };
    }

    await repository.update(request.id, request.name);
  }
  if (request?.actors) {
    await unattachFilms(request.id);

    await attachFilm(request.actors, request.id);
  }

  const data = await repository.selectOne(request.id);

  return {
    statusCode: HttpStatusCode.OK,
    data,
  };
}

export async function destroy(request: IIdSchema): Promise<MainResponseType> {
  const countActor = await repository.countUniversal('id', request.id);
  if (countActor === 0) {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
      validationError: [{ property: 'id', type: ValidationErrorType.NOT_FOUND }],
    };
  }

  await repository.destroy(request.id);

  return {
    statusCode: HttpStatusCode.OK,
  };
}

export async function select(): Promise<MainResponseType> {
  const data = await repository.select();

  return {
    statusCode: HttpStatusCode.OK,
    data,
  };
}

export async function selectOne(request: IIdSchema): Promise<MainResponseType> {
  const data = await repository.selectOne(request.id);

  if (data === undefined) {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
  }

  return {
    statusCode: HttpStatusCode.OK,
    data,
  };
}
