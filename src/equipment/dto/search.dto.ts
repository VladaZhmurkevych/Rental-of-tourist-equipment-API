import { IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Matches(/^[0-9]*(_[0-9]*)?$/)
  id?: string;

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
  page?: number;

  @IsOptional()
  @IsNumberString()
  originalPriceFrom?: number;

  @IsOptional()
  @IsNumberString()
  originalPriceTo?: number;

  @IsOptional()
  categoryId?: number[];
}
