import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentCharacteristicsService } from './equipment-characteristics.service';

describe('EquipmentCharacteristicsService', () => {
  let service: EquipmentCharacteristicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentCharacteristicsService],
    }).compile();

    service = module.get<EquipmentCharacteristicsService>(EquipmentCharacteristicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
