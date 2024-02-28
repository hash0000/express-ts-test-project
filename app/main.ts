import cors from 'cors';
import express, { Application, Router } from 'express';
import { consoleColor } from './common/constant/consoleColor.constant';
import { kyselyPlugin } from './common/plugin/kysely.plugin';
import { ActorRouter } from './modules/actor/actor.router';
import { UserRouter } from './modules/user/router';

async function app(): Promise<void> {
  const app: Application = express();
  const port: number = Number(process.env.APP_PORT);
  const host: string = String(process.env.APP_HOST);

  await kyselyPlugin(app);

  app.use(express.json());
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));

  const router = Router();
  router.use('', ActorRouter);
  router.use('', UserRouter);
  app.use('/api', router);

  app.listen(port, host);
}

void app()
  .then(function () {
    console.info(consoleColor.FG.BLUE, `[APP] Server listening on ${process.env.APP_HOST}:${process.env.APP_PORT}`);
  })
  .catch(function (e) {
    console.info(consoleColor.FG.RED, '[APP] App crushed while starting. See details:');
    console.error(e);
    process.exit(1);
  });
