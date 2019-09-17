import { Injectable } from '@nestjs/common';
import { Equipment } from '../../entities/equipment.entity';
import { EquipmentDto } from '../../dto/equipment.dto';
import { CategoryService } from '../category/category.service';
import { EquipmentRepositoryService } from '../../data_services/equipment.repository.service';

@Injectable()
export class EquipmentService {
  constructor(
    private readonly equipmentRepositoryService: EquipmentRepositoryService,
    private categoryService: CategoryService,
  ) {}

  getOneById(id: number): Promise<Equipment> {
    return this.equipmentRepositoryService.findById(id);
  }

  getAll(): Promise<Equipment[]> {
    return this.equipmentRepositoryService.findAll();
  }

  getMany(): Promise<Equipment[]> {
    return this.equipmentRepositoryService.findMany();
  }

  async addEquipment(equipmentDto: EquipmentDto): Promise<Equipment> {
    const categoryId = await this.categoryService.getCategoryIdByName(
      equipmentDto.categoryName,
    );
    return this.equipmentRepositoryService.createOne(
      equipmentDto,
      categoryId,
    );
  }
}
