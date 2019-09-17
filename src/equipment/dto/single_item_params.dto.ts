import { IsNumberString } from 'class-validator';

export class SingleItemParamsDto {
  @IsNumberString()
  readonly id: number;
}
