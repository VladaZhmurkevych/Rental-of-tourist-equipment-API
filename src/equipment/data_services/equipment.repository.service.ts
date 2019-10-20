import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult, LessThan } from 'typeorm';
import { EquipmentBuilder } from '../utils/equipment.builder';
import { EquipmentDto } from '../dto/equipment.dto';
import { Equipment } from '../entities/equipment.entity';
import { EquipmentUpdateDto } from '../dto/equipment_update.dto';
import { Category } from '../entities/category.entity';
import { EquipmentCacheService } from '../services/cache/cache.service';

@Injectable()
export class EquipmentRepositoryService {
  constructor(
    @Inject('EQUIPMENTS_REPOSITORY')
    private readonly equipmentRepository: Repository<Equipment>,
    private readonly cacheService: EquipmentCacheService,
  ) {}

  findById(id: string | number): Promise<Equipment> {
    return this.equipmentRepository.findOne(id, { relations: ['category'] });
  }

  findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find({ relations: ['category'] });
  }

  async findMany(searchQuery): Promise<Equipment[]> {
    return this.equipmentRepository.find({
      where: {
        ...searchQuery,
      },
    });
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.equipmentRepository.delete(id);
  }

  updateOne(id: string, updateData: EquipmentUpdateDto): Promise<UpdateResult> {
    return this.equipmentRepository.update(id, updateData);
  }

  async createOne(
    equipmentDto: EquipmentDto,
    category: Category,
  ): Promise<Equipment> {
    const equipmentBuilder = new EquipmentBuilder();

    equipmentBuilder
      .addName(equipmentDto.name)
      .addCategory(category)
      .addRentOriginalPrice(equipmentDto.originalPrice)
      .addDescription(equipmentDto.description);

    if (equipmentDto.rentPricePerDay) {
      equipmentBuilder.addRentPricePerDay(equipmentDto.rentPricePerDay);
    }
    if (equipmentDto.rentPricePerHour) {
      equipmentBuilder.addRentPricePerHour(equipmentDto.rentPricePerHour);
    }
    if (equipmentDto.mainPhoto) {
      equipmentBuilder.addMainPhoto(equipmentDto.mainPhoto);
    }
    const equipment = equipmentBuilder.getEquipment();
    return this.equipmentRepository.save(equipment);
  }
}
