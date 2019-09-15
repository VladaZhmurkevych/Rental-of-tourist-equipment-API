import { Module } from '@nestjs/common';
import {EquipmentController} from './controllers/equipment/equipment.controller';
import {EquipmentService} from './services/equipment/equipment.service';
import {categoriesProviders} from './providers/category.providers';
import {DataBaseModule} from '../data-base/data-base.module';
import {CategoryService} from './services/category/category.service';
import {ConfigModule} from "nestjs-dotenv";

@Module({
    imports: [DataBaseModule, ConfigModule.forRoot()],
    controllers: [EquipmentController],
    providers: [
      EquipmentService,
      ...categoriesProviders,
      CategoryService,
    ],
})
export class EquipmentModule {}
