import { Request, Response, Router } from 'express';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { IdSchema } from '../../common/validation/uuidSchema.validator';
import { AuthMiddleware } from '../../middleware/jwt.middleware';
import { ValidationMiddleware } from '../../middleware/validationHandler.middleware';
import { InsertFilmSchema } from './schemas/insert.schema';
import { UpdateFilmSchema } from './schemas/update.schema';
import * as service from './service';

const router = Router();

router.post('/film', AuthMiddleware, ValidationMiddleware(InsertFilmSchema, 'body'), async function (req: Request, res: Response) {
  try {
    const serviceResponse = await service.insert(req.body);
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/films', AuthMiddleware, async function (_req: Request, res: Response) {
  try {
    const serviceResponse = await service.select();
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/film/:id', AuthMiddleware, ValidationMiddleware(IdSchema, 'params'), async function (req: Request, res: Response) {
  try {
    const serviceResponse = await service.selectOne(req.params as any);
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

router.patch(
  '/film/:id',
  AuthMiddleware,
  ValidationMiddleware(IdSchema, 'params'),
  ValidationMiddleware(UpdateFilmSchema, 'body'),
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

router.delete('/film/:id', AuthMiddleware, ValidationMiddleware(IdSchema, 'params'), async function (req: Request, res: Response) {
  try {
    const serviceResponse = await service.destroy(req.params as any);
    return res.status(serviceResponse.statusCode).json(serviceResponse.data);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
  }
});

export const FilmRouter = router;
