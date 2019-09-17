import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export class EquipmentUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly categoryId: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly rentPricePerHour?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly rentPricePerDay?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly originalPrice: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly mainPhoto?: string;
}
