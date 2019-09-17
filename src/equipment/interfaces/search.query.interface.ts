import {FindOperator} from 'typeorm';

export interface SearchQuery {
  categoryId?: FindOperator<number[]>;
  name?: FindOperator<string>;
  rentPricePerHour?: FindOperator<number>;
  rentPricePerDay?: FindOperator<number>;
  originalPrice?: FindOperator<number>;
}
