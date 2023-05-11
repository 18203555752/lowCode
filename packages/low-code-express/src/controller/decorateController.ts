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
  /**
   * 根据id获得编辑内容
   */
  router.get('/decorate/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(id);
    const decorate = await decorateService.getDecorateById(id).catch(err => {
      res.json({ code: RET.DATAERR, data: null, msg: err.sqlMessage });
    }) as Decorate;
    if (typeof decorate.txt == 'string') {
      decorate.txt = JSON.parse(decorate.txt);
    }
    res.json({ code: RET.OK, data: decorate, msg: error_map[RET.OK] });
  });

  /**
 * 根据Userid获得编辑内容
 */
  router.get('/decorate/list/:userId', async (req, res) => {
    const id = parseInt(req.params.userId, 10);
    console.log(id);
    const decorate = await decorateService.getDecorateByUserId(id).catch(err => {
      res.json({ code: RET.DATAERR, data: null, msg: err.sqlMessage });
    }) as Decorate[];
    decorate.forEach(item => {
      // if(item)
      item.txt = JSON.parse(item.txt);

    });
    // if (typeof decorate.txt == 'string') {
    // }
    res.json({ code: RET.OK, data: decorate, msg: error_map[RET.OK] });
  });

  /**
   * 更新编辑内容
   */
  router.put('/decorate', async (req, res) => {
    const tmp = req.body as Decorate;
    if (typeof tmp.txt == 'object') {
      tmp.txt = JSON.stringify(tmp.txt);
    }
    const decorate = await decorateService.updateDecorate(tmp).catch(err => {
      res.json({ code: RET.DATAERR, data: null, msg: err.sqlMessage });
    });
    res.json({ code: RET.OK, data: [], msg: error_map[RET.OK] });
  });
  /**
   * 保存编辑内容
   */
  router.post('/decorate', async (req, res) => {
    const decorate = req.body as Decorate;
    if (typeof decorate.txt == 'object') {
      decorate.txt = JSON.stringify(decorate.txt);
    }
    await decorateService.createDecorate(decorate).catch(err => {
      res.json({ code: RET.DATAERR, data: null, msg: err.sqlMessage });

    });
    res.json({ code: RET.OK, data: null, msg: error_map[RET.OK] });
  });
  app.use('/api', (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });
  app.use('/api', router);



  // 错误处理中间件
  // app.use((err: any, req: any, res: any, next: any) => {
  //   if (err) {
  //   console.error('err.stack');
  //     // res.status(500).send('服务器错误');

  //   }
  // });



  return app;
}