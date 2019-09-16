import { Connection, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

export const categoriesProvider = {
    provide: 'CATEGORIES_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Category),
    inject: ['DATABASE_CONNECTION'],
};
