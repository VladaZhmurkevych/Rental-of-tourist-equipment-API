import { IsNumberString } from 'class-validator';

export class GetSingleItemParamsDto {
  @IsNumberString()
  readonly id: number;
}
