import { Connection } from 'typeorm';
import { DataBaseConnection } from '../../database/database.connection';
import { User } from './user.entity';

export const usersProvider = {
  provide: 'USERS_REPOSITORY',
  useFactory: async (dataBaseConnection: DataBaseConnection) => {
    const connection: Connection = await dataBaseConnection.getConnection();
    return connection.getRepository(User);
  },
  inject: ['DATABASE_CONNECTION_PROVIDER'],
};
