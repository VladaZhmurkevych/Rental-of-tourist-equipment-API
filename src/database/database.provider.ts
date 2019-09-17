import { DataBaseConnection } from './database.connection';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION_PROVIDER',
  useValue: DataBaseConnection.getInstance(),
};
