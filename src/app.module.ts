import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [EquipmentModule],
  exports: [EquipmentModule],
})
export class AppModule {}
