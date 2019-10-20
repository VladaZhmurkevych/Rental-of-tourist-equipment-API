import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IEquipment } from '../../equipment/utils/equipment.interface';

export class EquipmentPriceListDto implements IEquipment {
  @IsNotEmpty()
  id: string | number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  rentPricePerHour?: number;

  @IsNumber()
  rentPricePerDay?: number;

  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  source: number;
}
