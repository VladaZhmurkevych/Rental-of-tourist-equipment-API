import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentCharacteristicsController } from './equipment-characteristics.controller';

describe('EquipmentCharacteristics Controller', () => {
  let controller: EquipmentCharacteristicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentCharacteristicsController],
    }).compile();

    controller = module.get<EquipmentCharacteristicsController>(EquipmentCharacteristicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
