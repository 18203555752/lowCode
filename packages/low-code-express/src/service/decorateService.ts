import * as mysql from 'mysql2/promise';
import { createdecorateDao } from '../dao/decorateDao';

interface Decorate {
  id?: number;
  txt: string;

}

interface DecorateService {
  createDecorate(decorate: Decorate): Promise<any>;
  getDecorateById(id: number): Promise<Decorate>;
  updateDecorate(decorate: Decorate): Promise<any>;

}

export function createDecorateService(connection: mysql.Pool): DecorateService {
  const decorateDao = createdecorateDao(connection);

  return {

    async getDecorateById(id: number) {
      const Decorate = await decorateDao.findById(id);

      // if (!Decorate) {
      //   throw new Error(`Decorate with id ${id} not found`);
      // }

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