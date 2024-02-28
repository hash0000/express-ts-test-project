import { MainResponseType } from '../../common/type/mainResponse.type';
import { IIdSchema } from '../../common/validation/idSchema.validator';
import { IInsertActorSchema } from './schemas/insert.schema';
import { IUpdateActorSchema } from './schemas/update.schema';
export declare function insert(request: IInsertActorSchema): Promise<MainResponseType>;
export declare function update(request: IIdSchema & IUpdateActorSchema): Promise<MainResponseType>;
export declare function destroy(request: IIdSchema): Promise<MainResponseType>;
export declare function select(): Promise<MainResponseType>;
export declare function selectOne(request: IIdSchema): Promise<MainResponseType>;
