import { Connection, createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../.env` });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME })

export class DataBaseConnection {
  private readonly connection: Promise<Connection> = null;
  private static instance: DataBaseConnection = null;

  private constructor() {
    this.connection = createConnection({
      type: 'postgres',
      host: '10.0.2.2',
      port: parseInt(DB_PORT, 10),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    });
  }

  static getInstance(): DataBaseConnection {
    if (!DataBaseConnection.instance) {
      DataBaseConnection.instance = new DataBaseConnection();
    }
    return DataBaseConnection.instance;
  }

  getConnection(): Promise<Connection> {
    return this.connection;
  }
}
