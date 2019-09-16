import { Module } from '@nestjs/common';
import {EquipmentController} from './controllers/equipment/equipment.controller';
import {EquipmentService} from './services/equipment/equipment.service';
import {categoriesProvider} from './providers/category.providers';
import {DataBaseModule} from '../data-base/data-base.module';
import {CategoryService} from './services/category/category.service';
import {ConfigModule} from 'nestjs-dotenv';
import {equipmentsProvider} from './providers/equipment.provider';

@Module({
    imports: [DataBaseModule, ConfigModule.forRoot()],
    controllers: [EquipmentController],
    providers: [
      categoriesProvider,
      equipmentsProvider,
      CategoryService,
      EquipmentService,
    ],
})
export class EquipmentModule {}
