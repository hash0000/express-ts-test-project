import { Request, Response, Router } from 'express';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { ValidationMiddleware } from '../../middleware/validationHandler.middleware';
import { IInsertUserSchema, InsertUserSchema } from './schemas/insert.schema';
import { ILoginUserSchema, LoginUserSchema } from './schemas/login.schema';
import * as service from './service';

const router = Router();

router.post('/auth', ValidationMiddleware(LoginUserSchema, 'body'), async function (req: Request, res: Response): Promise<Response> {
  try {
    const serviceResponse = await service.login(req.body as ILoginUserSchema);
    return res.status(serviceResponse.statusCode).json(serviceResponse?.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.post('/register', ValidationMiddleware(InsertUserSchema, 'body'), async function (req: Request, res: Response): Promise<Response> {
  try {
    const serviceResponse = await service.insert(req.body as IInsertUserSchema);
    return res.status(serviceResponse.statusCode).json(serviceResponse?.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

export const UserRouter = router;
