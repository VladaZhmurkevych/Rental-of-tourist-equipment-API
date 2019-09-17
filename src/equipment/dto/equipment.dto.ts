import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class EquipmentDto {
  @IsNotEmpty()
  @IsString()
  readonly categoryName: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly rentPricePerHour?: number;

  @IsNumber()
  readonly rentPricePerDay?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly originalPrice: number;

  @IsString()
  readonly mainPhoto?: string;
}
