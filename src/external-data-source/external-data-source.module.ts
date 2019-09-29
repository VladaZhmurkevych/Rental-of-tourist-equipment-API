import { HttpModule, Module } from '@nestjs/common';
import { ExternalDataSourceService } from './services/external-data-source/external-data-source.service';
import { Provider1Service } from './services/provider1/provider1.service';
import { Provider2Service } from './services/provider2/provider2.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalDataSourceService, Provider1Service, Provider2Service],
  exports: [ExternalDataSourceService],
})
export class ExternalDataSourceModule {}
