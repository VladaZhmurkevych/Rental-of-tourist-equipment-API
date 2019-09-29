import { Injectable } from '@nestjs/common';
import { IEquipment } from '../equipment/utils/equipment.interface';

@Injectable()
export class EquipmentService {
  private equipment: IEquipment[] = [
    {
      id: 1,
      name: 'Name 1 from provider 2',
      description: 'Description',
      rentPricePerDay: 10,
      rentPricePerHour: 1,
      mainPhoto: '',
      originalPrice: 230,
    },
    {
      id: 2,
      name: 'Name 2 from provider 2',
      description: 'Description 2',
      rentPricePerDay: 17,
      rentPricePerHour: 6,
      mainPhoto: '',
      originalPrice: 240,
    },
  ];

  getPriceList(): IEquipment[] {
    return this.equipment;
  }

  getDetails(id: string): IEquipment {
    return this.equipment.find((equipment) => equipment.id === id);
  }
}
