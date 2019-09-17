import { IsNumber, IsOptional, IsString } from 'class-validator';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export class EquipmentUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

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
  @IsNumber()
  readonly rentPricePerHour?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly rentPricePerDay?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly originalPrice: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly mainPhoto?: string;
}
