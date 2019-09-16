import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Equipment } from '../../entities/equipment.entity';
import { EquipmentDto } from '../../dto/equipment.dto';
import { EquipmentBuilder } from './equipment.builder';
import { CategoryService } from '../category/category.service';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('EQUIPMENTS_REPOSITORY')
    private readonly equipmentRepository: Repository<Equipment>,
    private categoryService: CategoryService,
  ) {}

  getOneById(id: number): Promise<Equipment> {
    return this.equipmentRepository.findOne(id);
  }

  getAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  getMany(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  async addEquipment(equipmentDto: EquipmentDto): Promise<Equipment> {
    const categoryId = await this.categoryService.getCategoryIdByName(
      equipmentDto.categoryName,
    );
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
      equipmentBuilder.addRentPricePerDay(equipmentDto.rentPricePerHour);
    }
    if (equipmentDto.mainPhoto) {
      equipmentBuilder.addMainPhoto(equipmentDto.mainPhoto);
    }
    const equipment = equipmentBuilder.getEquipment();
    return this.equipmentRepository.save(equipment);
  }
}
