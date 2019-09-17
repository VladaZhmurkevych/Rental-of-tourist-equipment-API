import { Connection } from 'typeorm';
import { Category } from '../entities/category.entity';
import { DataBaseConnection } from '../../database/database.connection';

export const categoriesProvider = {
    provide: 'CATEGORIES_REPOSITORY',
    useFactory: async (dataBaseConnection: DataBaseConnection) => {
        const connection: Connection = await dataBaseConnection.getConnection();
        return connection.getRepository(Category);
    },
    inject: ['DATABASE_CONNECTION_PROVIDER'],
};
