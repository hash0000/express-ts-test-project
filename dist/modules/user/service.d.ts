import { MainResponseType } from '../../common/type/mainResponse.type';
import { IInsertUserSchema } from './schemas/insert.schema';
import { ILoginUserSchema } from './schemas/login.schema';
export declare function insert(request: IInsertUserSchema): Promise<MainResponseType>;
export declare function login(request: ILoginUserSchema): Promise<MainResponseType>;
