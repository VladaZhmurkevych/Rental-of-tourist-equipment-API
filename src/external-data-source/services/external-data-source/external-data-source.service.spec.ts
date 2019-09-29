import { Test, TestingModule } from '@nestjs/testing';
import { ExternalDataSourceService } from './external-data-source.service';

describe('ExternalDataSourceService', () => {
  let service: ExternalDataSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalDataSourceService],
    }).compile();

    service = module.get<ExternalDataSourceService>(ExternalDataSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
