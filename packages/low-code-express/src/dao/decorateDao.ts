import * as mysql from 'mysql2/promise';

interface Decorate {
  id?: number;
  txt: string;

}

interface DecorateDao {
  findById(id: number | string): Promise<Decorate>;
  create(decorate: Decorate): Promise<void>;
  update(decorate: Decorate): Promise<void>;

}

export function createdecorateDao(connection: mysql.Pool): DecorateDao {
  return {
    async findById(id: number) {
      const [rows] = await connection.query<any>('SELECT * FROM decorates WHERE id = ?', [id]);
      return rows[0];
    },

    async create(decorate: Decorate) {
      await connection.query('INSERT INTO decorates SET ?', [decorate]);
    },
    async update(decorate: Decorate) {
      await connection.query('INSERT INTO decorates SET ?', [decorate]);
    },


  };
}
