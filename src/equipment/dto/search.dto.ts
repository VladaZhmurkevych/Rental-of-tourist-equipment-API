import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  rentPricePerHourFrom?: number;

  @IsOptional()
  @IsNumberString()
  rentPricePerHourTo?: number;

  @IsOptional()
  @IsNumberString()
  rentPricePerDayFrom?: number;

  @IsOptional()
  @IsNumberString()
  rentPricePerDayTo?: number;

  @IsOptional()
  @IsNumberString()
  originalPriceFrom?: number;

  @IsOptional()
  @IsNumberString()
  originalPriceTo?: number;

  @IsOptional()
  categoryId?: number[];
}
