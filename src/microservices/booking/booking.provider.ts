import { Connection } from 'typeorm';
import { DataBaseConnection } from '../../database/database.connection';
import { Booking } from './booking.entity';

export const bookingsProvider = {
  provide: 'BOOKINGS_REPOSITORY',
  useFactory: async (dataBaseConnection: DataBaseConnection) => {
    const connection: Connection = await dataBaseConnection.getConnection();
    return connection.getRepository(Booking);
  },
  inject: ['DATABASE_CONNECTION_PROVIDER'],
};
