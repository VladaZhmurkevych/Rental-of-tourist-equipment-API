import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Equipment } from './equipment.entity';
import { Connection, createConnection } from 'typeorm';
dotenv.config({ path: `${__dirname}/../../.env.provider2` });

const {
  DB_HOST_PROVIDER2,
  DB_PORT_PROVIDER2,
  DB_USER_PROVIDER2,
  DB_PASSWORD_PROVIDER2,
  DB_NAME_PROVIDER2,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: 'provider2',
        type: 'postgres',
        host: DB_HOST_PROVIDER2,
        port: parseInt(DB_PORT_PROVIDER2, 10),
        username: DB_USER_PROVIDER2,
        password: DB_PASSWORD_PROVIDER2,
        database: DB_NAME_PROVIDER2,
        entities: [Equipment],
        synchronize: true,
      }),
    }),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class Provider2Module {}
