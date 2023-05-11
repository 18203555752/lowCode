import * as mysql from 'mysql2/promise';
import { createdecorateDao } from '../dao/decorateDao';

interface Decorate {
  id?: number;
  list: string;

}

interface DecorateService {
  createDecorate(decorate: Decorate): Promise<any>;
  getDecorateById(id: number): Promise<Decorate>;
  getDecorateByUserId(userId: number): Promise<Decorate[]>;
  updateDecorate(decorate: Decorate): Promise<any>;

}

export function createDecorateService(connection: mysql.Pool): DecorateService {
  const decorateDao = createdecorateDao(connection);

  return {

    async getDecorateById(id: number) {
      const Decorate = await decorateDao.findById(id);
      return Decorate;
    },
    async getDecorateByUserId(userId: number) {
      const Decorate = await decorateDao.getListByUserId(userId);
      return Decorate;
    },
    async createDecorate(decorate: Decorate) {
      return await decorateDao.create(decorate);
    },

    async updateDecorate(decorate: Decorate) {
      return await decorateDao.update(decorate);
    },
  };
}