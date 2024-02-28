import { ValidationErrorType } from '../../common/enum/errorType.enum';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { MainResponseType } from '../../common/type/mainResponse.type';
import { IIdSchema } from '../../common/validation/idSchema.validator';
import * as repository from './repository';
import { IInsertActorSchema } from './schemas/insert.schema';
import { IUpdateActorSchema } from './schemas/update.schema';

export async function insert(request: IInsertActorSchema): Promise<MainResponseType> {
  const countActor = await repository.countUniversal('name', request.name);
  if (countActor !== 0) {
    return {
      statusCode: HttpStatusCode.CONFLICT,
      validationError: [{ property: 'name', type: ValidationErrorType.NOT_UNIQUE }],
    };
  }

  const data = await repository.insert(request);

  return {
    statusCode: HttpStatusCode.CREATED,
    data,
  };
}

export async function update(request: IIdSchema & IUpdateActorSchema): Promise<MainResponseType> {
  const countActor = await repository.countUniversal('name', request.name, request.id);
  if (countActor !== 0) {
    return {
      statusCode: HttpStatusCode.CONFLICT,
      validationError: [{ property: 'name', type: ValidationErrorType.NOT_UNIQUE }],
    };
  }

  const data = await repository.update(request.id, request.name);

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
