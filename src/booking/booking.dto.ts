import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class BookingDto {
  @IsNotEmpty()
  @IsNumber()
  // tslint:disable-next-line:variable-name
  readonly item: number;

  @IsNotEmpty()
  @IsNumber()
  // tslint:disable-next-line:variable-name
  readonly user: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @IsNotEmpty()
  @IsString()
  readonly endDate: string;
}
