import { Connection, Repository } from 'typeorm';
import { Equipment } from '../entities/equipment.entity';
import { DataBaseConnection } from '../../data-base/database.connection';

export const equipmentsProvider = {
  provide: 'EQUIPMENTS_REPOSITORY',
  useFactory: async (dataBaseConnection: DataBaseConnection) => {
    const connection: Connection = await dataBaseConnection.getConnection();
    return connection.getRepository(Equipment);
  },
  inject: ['DATABASE_CONNECTION_PROVIDER'],
};
