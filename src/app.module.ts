import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { ExternalDataSourceModule } from './external-data-source/external-data-source.module';

@Module({
  imports: [ExternalDataSourceModule, EquipmentModule],
  exports: [ExternalDataSourceModule, EquipmentModule],
})
export class AppModule {}
