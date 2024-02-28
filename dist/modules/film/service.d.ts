import { MainResponseType } from '../../common/type/mainResponse.type';
import { IIdSchema } from '../../common/validation/idSchema.validator';
import { IInsertFilmSchema } from './schemas/insert.schema';
import { IUpdateFilmSchema } from './schemas/update.schema';
export declare function insert(request: IInsertFilmSchema): Promise<MainResponseType>;
export declare function update(request: IIdSchema & IUpdateFilmSchema): Promise<MainResponseType>;
export declare function destroy(request: IIdSchema): Promise<MainResponseType>;
export declare function select(): Promise<MainResponseType>;
export declare function selectOne(request: IIdSchema): Promise<MainResponseType>;
