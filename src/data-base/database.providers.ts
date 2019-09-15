import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../.env`});
const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
