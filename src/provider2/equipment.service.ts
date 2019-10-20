import { Injectable } from '@nestjs/common';
import { IEquipment } from '../equipment/utils/equipment.interface';
import { Equipment } from './equipment.entity';
import { Connection, EntityManager, Repository } from 'typeorm';

@Injectable()
export class EquipmentService {
  private readonly equipmentRepository: Repository<Equipment>;
  constructor(private readonly entityManager: Connection) {
    this.equipmentRepository = entityManager.getRepository(Equipment);
  }

  async getPriceList(): Promise<IEquipment[]> {
    await new Promise(resolve => {
      setTimeout(resolve, 5000);
    });
    return this.equipmentRepository.find({
      select: [
        'id',
        'name',
        'rentPricePerDay',
        'rentPricePerHour',
        'originalPrice',
      ],
    });
  }

  getDetails(id: string): Promise<IEquipment> {
    return this.equipmentRepository.findOne(id);
  }
}
