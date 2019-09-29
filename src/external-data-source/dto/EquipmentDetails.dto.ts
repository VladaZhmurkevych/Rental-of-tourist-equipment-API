import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EquipmentDetailsDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  rentPricePerHour?: number;

  @IsNumber()
  rentPricePerDay?: number;

  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  @IsString()
  mainPhoto?: string;

  source: number;
}
