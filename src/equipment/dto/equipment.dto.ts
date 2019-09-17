import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

export class EquipmentDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly categoryName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiModelPropertyOptional()
  @IsNumber()
  readonly rentPricePerHour?: number;

  @ApiModelPropertyOptional()
  @IsNumber()
  readonly rentPricePerDay?: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly originalPrice: number;

  @ApiModelPropertyOptional()
  @IsString()
  readonly mainPhoto?: string;
}
