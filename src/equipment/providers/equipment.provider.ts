import { Connection, Repository } from 'typeorm';
import { Equipment } from '../entities/equipment.entity';

export const equipmentsProvider = {
  provide: 'EQUIPMENTS_REPOSITORY',
  useFactory: (connection: Connection) => connection.getRepository(Equipment),
  inject: ['DATABASE_CONNECTION'],
};
