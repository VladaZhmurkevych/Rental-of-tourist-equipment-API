import { CacheModule, Module } from '@nestjs/common';
import { EquipmentController } from './controllers/equipment/equipment.controller';
import { EquipmentService } from './services/equipment/equipment.service';
import { categoriesProvider } from './providers/category.providers';
import { DatabaseModule } from '../database/database.module';
import { CategoryService } from './services/category/category.service';
import { equipmentsProvider } from './providers/equipment.provider';
import { EquipmentRepositoryService } from './data_services/equipment.repository.service';
import { CategoryRepositoryService } from './data_services/category.repository.service';
import { ExternalDataSourceModule } from '../external-data-source/external-data-source.module';

@Module({
  imports: [DatabaseModule, ExternalDataSourceModule],
  controllers: [EquipmentController],
  providers: [
    categoriesProvider,
    equipmentsProvider,
    EquipmentRepositoryService,
    CategoryRepositoryService,
    CategoryService,
    EquipmentService,
  ],
  exports: [EquipmentRepositoryService],
})
export class EquipmentModule {}
