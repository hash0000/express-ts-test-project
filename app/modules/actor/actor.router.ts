import { Request, Response, Router } from 'express';
import { AuthMiddleware } from '../../middleware/jwt.middleware';
import { ValidationMiddleware } from '../../middleware/validationHandler.middleware';
import * as service from './actor.service';
import { InsertActorSchema } from './schemas/insert.schema';

const router = Router();

router.post('/create', AuthMiddleware, ValidationMiddleware(InsertActorSchema, 'body'), async function (req: Request, res: Response) {
  const serviceResponse = await service.insert(req.body);
  return res.status(serviceResponse.statusCode).json(serviceResponse);
});

export const ActorRouter = router;
