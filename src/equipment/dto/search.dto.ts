export interface Range {
  from?: number;
  to?: number;
}

export class SearchDto {
  name?: string;
  rentPerHourPrice?: Range;
  rentPerHourDay?: Range;
  originalPrice?: Range;
  categoryId: number[];
}
