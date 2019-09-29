import { IsNumberString, Matches } from 'class-validator';

export class SingleItemParamsDto {
  @Matches(/^[0-9]*(_[0-9]*)?$/)
  readonly id: string;
}
