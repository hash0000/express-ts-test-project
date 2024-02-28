import { Request, Response, Router } from 'express';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { IdSchema } from '../../common/validation/uuidSchema.validator';
import { AuthMiddleware } from '../../middleware/jwt.middleware';
import { ValidationMiddleware } from '../../middleware/validationHandler.middleware';
import { InsertActorSchema } from './schemas/insert.schema';
import { UpdateActorSchema } from './schemas/update.schema';
import * as service from './service';

const router = Router();

router.post('/actor', AuthMiddleware, ValidationMiddleware(InsertActorSchema, 'body'), async function (req: Request, res: Response) {
  try {
    const serviceResponse = await service.insert(req.body);
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/actors', AuthMiddleware, async function (_req: Request, res: Response) {
  try {
    const serviceResponse = await service.select();
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/actor/:actorId', AuthMiddleware, ValidationMiddleware(IdSchema, 'params'), async function (req: Request, res: Response) {
  try {
    const serviceResponse = await service.selectOne(req.params as any);
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.patch(
  '/actor/:actorId',
  AuthMiddleware,
  ValidationMiddleware(IdSchema, 'params'),
  ValidationMiddleware(UpdateActorSchema, 'body'),
  async function (req: Request, res: Response) {
    try {
      const serviceResponse = await service.update({ ...req.params, ...req.body } as any);
      return res.status(serviceResponse.statusCode).json(serviceResponse.data);
    } catch (e) {
      console.error(e);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
  },
);

router.delete('/actor/:actorId', AuthMiddleware, ValidationMiddleware(IdSchema, 'params'), async function (req: Request, res: Response) {
  try {
    const serviceResponse = await service.destroy(req.params as any);
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

export const ActorRouter = router;
