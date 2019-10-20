import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './equipment.entity';
import { Connection } from 'typeorm';
dotenv.config({ path: `${__dirname}/../../.env.provider1` });

const {
  DB_HOST_PROVIDER1,
  DB_PORT_PROVIDER1,
  DB_USER_PROVIDER1,
  DB_PASSWORD_PROVIDER1,
  DB_NAME_PROVIDER1,
} = process.env;

console.log(
  DB_HOST_PROVIDER1,
  DB_PORT_PROVIDER1,
  DB_USER_PROVIDER1,
  DB_PASSWORD_PROVIDER1,
  DB_NAME_PROVIDER1,
);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: 'provider1',
        type: 'postgres',
        host: DB_HOST_PROVIDER1,
        port: parseInt(DB_PORT_PROVIDER1, 10),
        username: DB_USER_PROVIDER1,
        password: DB_PASSWORD_PROVIDER1,
        database: DB_NAME_PROVIDER1,
        entities: [Equipment],
        synchronize: true,
      }),
    }),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class Provider1Module {}
