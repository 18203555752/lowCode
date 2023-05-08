import type { PoolOptions } from 'mysql2/promise';

export const databaseConfig: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
};