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

  @IsNotEmpty()
  @IsNumber()
  readonly rentPricePerHour?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly rentPricePerDay?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly originalPrice: number;

  @IsNotEmpty()
  @IsString()
  readonly mainPhoto?: string;
}
