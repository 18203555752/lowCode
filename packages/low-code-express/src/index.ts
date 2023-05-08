import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { createUserController } from './controller/userController';
import { databaseConfig } from './config/databaseConfig';
import { createrDecorateController } from './controller/decorateController';


const app = express();
app.use(bodyParser.json());
app.use(cors());

async function startServer() {
  const connection = await mysql.createPool(databaseConfig);

  const app = createUserController(connection);
  const decorateApp = createrDecorateController(connection);

  decorateApp.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

startServer();
