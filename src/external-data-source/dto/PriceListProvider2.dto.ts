import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IEquipment } from '../../equipment/utils/equipment.interface';

export class PriceListProvider2Dto implements IEquipment {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly rentPricePerHour?: number;

  @IsNumber()
  readonly rentPricePerDay?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly originalPrice: number;
}
