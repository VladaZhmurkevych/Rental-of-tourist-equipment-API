import { Injectable } from '@nestjs/common';
import { SearchDto } from '../equipment/dto/search.dto';
import { Equipment } from '../equipment/entities/equipment.entity';
import { mapSearchDtoToFindSpecification } from '../equipment/utils/equipment.helpers';
import { IEquipment } from '../equipment/utils/equipment.interface';

@Injectable()
export class EquipmentService {
  private equipment: IEquipment[] = [
    {
      id: 1,
      name: 'Name 1 from provider 1',
      description: 'Description',
      rentPricePerDay: 10,
      rentPricePerHour: 1,
      mainPhoto: '',
      originalPrice: 230,
    },
    {
      id: 2,
      name: 'Name 2 from provider 1',
      description: 'Description 2',
      rentPricePerDay: 17,
      rentPricePerHour: 6,
      mainPhoto: '',
      originalPrice: 240,
    },
  ];

  getFilteredItems(search: SearchDto) {
    const specification = mapSearchDtoToFindSpecification(search);
    return this.equipment.filter(specification.isSatisfiedBy);
  }
}
