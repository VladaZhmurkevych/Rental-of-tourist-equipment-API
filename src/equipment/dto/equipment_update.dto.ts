import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EquipmentUpdateDto {
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly rentPricePerHour?: number;

  @IsOptional()
  @IsNumber()
  readonly rentPricePerDay?: number;

  @IsOptional()
  @IsNumber()
  readonly originalPrice: number;

  @IsOptional()
  @IsString()
  readonly mainPhoto?: string;
}
