import { Injectable } from '@nestjs/common';
import { Equipment } from '../../entities/equipment.entity';
import { EquipmentDto } from '../../dto/equipment.dto';
import { CategoryService } from '../category/category.service';
import { EquipmentRepositoryService } from '../../data_services/equipment.repository.service';
import { EquipmentUpdateDto } from '../../dto/equipment_update.dto';
import { ObjectLiteral, QueryFailedError } from 'typeorm';
import { SearchDto } from '../../dto/search.dto';
import { mapSearchDtoToFindOperators } from '../../utils/equipment.helpers';
import { CategoryError } from '../../utils/category.error';
import { ExternalDataSourceService } from '../../../external-data-source/services/external-data-source/external-data-source.service';
import { IEquipment } from '../../utils/equipment.interface';

@Injectable()
export class EquipmentService {
  constructor(
    private equipmentRepositoryService: EquipmentRepositoryService,
    private categoryService: CategoryService,
    private externalDataSourceService: ExternalDataSourceService,
  ) {}

  getOneById(id: string): Promise<IEquipment> {
    const isFromExternalSource = id.includes('_');
    return isFromExternalSource
      ? this.externalDataSourceService.getDetails(id)
      : this.equipmentRepositoryService.findById(id);
  }

  search(search: SearchDto): Promise<Equipment[]> {
    return this.externalDataSourceService.getPriceList(search).then((response) => [].concat(...response));
  }

  async deleteOne(id: string): Promise<{ status: string; affected?: number }> {
    const deleteResult = await this.equipmentRepositoryService.deleteById(id);
    return { status: 'success', affected: deleteResult.affected };
  }

  async updateOne(
    updateData: EquipmentUpdateDto,
    id: string,
  ): Promise<{ status: string; entity: ObjectLiteral }> {
    try {
      await this.equipmentRepositoryService.updateOne(id, updateData);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new CategoryError();
      } else {
        throw e;
      }
    }
    const updatedEntity = await this.equipmentRepositoryService.findById(id);
    return { status: 'success', entity: updatedEntity };
  }

  async addEquipment(equipmentDto: EquipmentDto): Promise<Equipment> {
    const category = await this.categoryService.getCategoryByName(
      equipmentDto.categoryName,
    );
    if (!category) {
      throw new CategoryError();
    }
    return this.equipmentRepositoryService.createOne(equipmentDto, category);
  }
}
