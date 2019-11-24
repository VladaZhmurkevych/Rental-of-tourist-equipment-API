import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { ExternalDataSourceModule } from './external-data-source/external-data-source.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [ExternalDataSourceModule, EquipmentModule, AuthModule, BookingModule],
  exports: [ExternalDataSourceModule, EquipmentModule],
})
export class AppModule {}
