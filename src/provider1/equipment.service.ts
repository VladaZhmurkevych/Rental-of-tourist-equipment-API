import { Injectable } from '@nestjs/common';
import { SearchDto } from '../equipment/dto/search.dto';
import {
  mapSearchDtoToFindOperators,
} from '../equipment/utils/equipment.helpers';
import { IEquipment } from '../equipment/utils/equipment.interface';
import { Connection, Repository } from 'typeorm';
import { Equipment } from './equipment.entity';

@Injectable()
export class EquipmentService {
  private readonly equipmentRepository: Repository<Equipment>;
  constructor(private readonly entityManager: Connection) {
    this.equipmentRepository = entityManager.getRepository(Equipment);
  }

  async getFilteredItems(search: SearchDto): Promise<IEquipment[]> {
    await new Promise(resolve => {
      const delay = Math.random() * 5 * 1000; // random delay up to 20 seconds
      // console.log(delay);
      setTimeout(resolve, delay); // random delay up to 20 seconds
    });
    const searchQuery = mapSearchDtoToFindOperators(search);
    return this.equipmentRepository.find(searchQuery);
  }
}
