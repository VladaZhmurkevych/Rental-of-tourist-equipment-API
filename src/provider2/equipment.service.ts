import { Injectable, Query } from '@nestjs/common';
import { IEquipment } from '../equipment/utils/equipment.interface';
import { Equipment } from './equipment.entity';
import { Connection, EntityManager, Repository } from 'typeorm';
import { calculatePagination } from '../equipment/utils/equipment.helpers';
import { SearchDto } from '../equipment/dto/search.dto';

@Injectable()
export class EquipmentService {
  private readonly itemsPerPage: number = 5000;
  private readonly equipmentRepository: Repository<Equipment>;
  constructor(private readonly entityManager: Connection) {
    this.equipmentRepository = entityManager.getRepository(Equipment);
  }

  async getPriceList({ page }: SearchDto): Promise<IEquipment[]> {
    const { skip, take } = calculatePagination(this.itemsPerPage, page);
    // console.log(' skip, take', skip, take)
    return this.equipmentRepository.find({
      select: [
        'id',
        'name',
        'rentPricePerDay',
        'rentPricePerHour',
        'originalPrice',
      ],
      skip,
      take,
    });
  }

  getDetails(id: string): Promise<IEquipment> {
    return this.equipmentRepository.findOne(id);
  }
}
