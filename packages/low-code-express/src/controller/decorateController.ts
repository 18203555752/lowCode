import express from 'express';
import mysql from 'mysql2/promise';
import winston from 'winston';

import { createDecorateService } from '../service/decorateService';
import { RET, error_map } from '../constant/response_code';
import bodyParser from 'body-parser';
import cors from 'cors';

interface Decorate {
  id?: number;
  userId?: number;
  txt: string

}

export function createrDecorateController(connection: mysql.Pool) {
  const app = express();
  const router = express.Router();
  app.use(bodyParser.json());
  app.use(cors());
  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new winston.transports.File({
        filename: 'logs/app.log'
      })
    ]
  });
  const decorateService = createDecorateService(connection);
  router.get('/decorate/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(id);
    const decorate = await decorateService.getDecorateById(id);
    res.json({ code: RET.OK, data: decorate, msg: error_map[RET.OK] });
  });


  router.put('/decorate', async (req, res) => {
    const tmp = req.body as Decorate;
    const decorate = await decorateService.updateDecorate(tmp);
    res.json({ code: RET.OK, data: [], msg: error_map[RET.OK] });
  });

  router.post('/decorate', async (req, res) => {
    const decorate = req.body as Decorate;
    await decorateService.createDecorate(decorate);
    res.json({ message: 'User created' });
  });
  app.use('/api', (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });
  app.use('/api', router);
  return app;
}