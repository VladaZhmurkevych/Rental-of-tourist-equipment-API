import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { ExternalDataSourceService } from './services/external-data-source/external-data-source.service';
import { Provider1Service } from './services/provider1/provider1.service';
import { Provider2Service } from './services/provider2/provider2.service';
import { DatabaseService } from './services/database/database.service';
import { EquipmentModule } from '../equipment/equipment.module';

@Module({
  imports: [HttpModule, forwardRef(() => EquipmentModule)],
  providers: [ExternalDataSourceService, Provider1Service, Provider2Service, DatabaseService],
  exports: [ExternalDataSourceService],
})
export class ExternalDataSourceModule {}
