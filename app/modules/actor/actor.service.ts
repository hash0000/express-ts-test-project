import { ValidationErrorType } from '../../common/enum/errorType.enum';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { MainResponseType } from '../../common/type/mainResponse.type';
import * as repository from './actor.repository';
import { IInsertActorSchema } from './schemas/insert.schema';

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
