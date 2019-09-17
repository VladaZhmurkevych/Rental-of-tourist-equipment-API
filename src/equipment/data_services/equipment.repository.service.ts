import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EquipmentBuilder } from './equipment.builder';
import { EquipmentDto } from '../dto/equipment.dto';
import { Equipment } from '../entities/equipment.entity';

@Injectable()
export class EquipmentRepositoryService {
  constructor(
    @Inject('EQUIPMENTS_REPOSITORY')
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  findById(id: number): Promise<Equipment> {
    return this.equipmentRepository.findOne(id);
  }

  findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  findMany(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  async createOne(equipmentDto: EquipmentDto, categoryId: number): Promise<Equipment> {
    const equipmentBuilder = new EquipmentBuilder();

    equipmentBuilder
      .addName(equipmentDto.name)
      .addCategory(categoryId)
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
