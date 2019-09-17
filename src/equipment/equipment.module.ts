import { Module } from '@nestjs/common';
import { EquipmentController } from './controllers/equipment/equipment.controller';
import { EquipmentService } from './services/equipment/equipment.service';
import { categoriesProvider } from './providers/category.providers';
import { DatabaseModule } from '../database/database.module';
import { CategoryService } from './services/category/category.service';
import { equipmentsProvider } from './providers/equipment.provider';
import { EquipmentRepositoryService } from './data_services/equipment.repository.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EquipmentController],
  providers: [
    categoriesProvider,
    equipmentsProvider,
    EquipmentRepositoryService,
    CategoryService,
    EquipmentService,
  ],
})
export class EquipmentModule {}
