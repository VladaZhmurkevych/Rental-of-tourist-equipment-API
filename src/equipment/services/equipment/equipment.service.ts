import { Injectable } from '@nestjs/common';
import { Equipment } from '../../entities/equipment.entity';
import { EquipmentDto } from '../../dto/equipment.dto';
import { CategoryService } from '../category/category.service';
import { EquipmentRepositoryService } from '../../data_services/equipment.repository.service';
import { EquipmentUpdateDto } from '../../dto/equipment_update.dto';
import { ObjectLiteral } from 'typeorm';
import { SearchDto } from '../../dto/search.dto';
import { mapSearchDtoToFindOperators } from '../../utils/equipment.helpers';
import { CategoryError } from '../../utils/category.error';

@Injectable()
export class EquipmentService {
  constructor(
    private equipmentRepositoryService: EquipmentRepositoryService,
    private categoryService: CategoryService,
  ) {}

  getOneById(id: number): Promise<Equipment> {
    return this.equipmentRepositoryService.findById(id);
  }

  search(search: SearchDto): Promise<Equipment[]> {
    const searchQuery = mapSearchDtoToFindOperators(search);
    return this.equipmentRepositoryService.findMany(searchQuery);
  }

  async deleteOne(id: number): Promise<{ status: string; affected?: number }> {
    const deleteResult = await this.equipmentRepositoryService.deleteById(id);
    return { status: 'success', affected: deleteResult.affected };
  }

  async updateOne(
    updateData: EquipmentUpdateDto,
    id: number,
  ): Promise<{ status: string; entity: ObjectLiteral }> {
    await this.equipmentRepositoryService.updateOne(id, updateData);
    const updatedEntity = await this.equipmentRepositoryService.findById(id);
    return { status: 'success', entity: updatedEntity };
  }

  async addEquipment(equipmentDto: EquipmentDto): Promise<Equipment> {
    const category = await this.categoryService.getCategoryByName(
      equipmentDto.categoryName,
    );
    if (!category) { throw new CategoryError(); }
    return this.equipmentRepositoryService.createOne(equipmentDto, category);
  }
}
