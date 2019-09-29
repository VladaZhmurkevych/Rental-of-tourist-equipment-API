import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../entities/category.entity';

export class EquipmentUpdateDto {
  @IsOptional()
  @IsNumberString()
  readonly category: Category;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumberString()
  readonly rentPricePerHour?: number;

  @IsOptional()
  @IsNumberString()
  readonly rentPricePerDay?: number;

  @IsOptional()
  @IsNumberString()
  readonly originalPrice: number;

  @IsOptional()
  @IsString()
  readonly mainPhoto?: string;
}
