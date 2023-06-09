import * as mysql from 'mysql2/promise';

interface Decorate {
  id?: number;
  list: string;
  userId?: number

}

interface DecorateDao {
  findById(id: number | string): Promise<Decorate>;
  getListByUserId(userId: number | string): Promise<Decorate[]>;
  create(decorate: Decorate): Promise<any>;
  update(decorate: Decorate): Promise<void>;

}

export function createdecorateDao(connection: mysql.Pool): DecorateDao {
  return {
    async findById(id: number) {
      const [rows] = await connection.query<any>('SELECT id,userId,txt as list FROM decorates WHERE id = ?', [id]);
      return rows[0];
    },
    async getListByUserId(userId: number) {
      const rows = await connection.query<any>('SELECT id,userId,txt as list FROM decorates WHERE userId = ?', [userId]);
      return rows[0];
    },

    async create(decorate: Decorate) {
      return await connection.query('INSERT INTO decorates(userId,txt) values(?,?)', [decorate.userId, decorate.list]);
    },
    async update(decorate: Decorate) {
      await connection.query('UPDATE  decorates SET TXT=? WHERE ID = ?', [decorate.list, decorate.id]);
    },


  };
}
