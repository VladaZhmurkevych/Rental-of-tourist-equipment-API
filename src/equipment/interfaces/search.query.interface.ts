import { FindManyOptions, FindOperator } from 'typeorm';

export interface SearchQuery extends FindManyOptions {
  categoryId?: FindOperator<number[]>;
  name?: FindOperator<string>;
  rentPricePerHour?: FindOperator<number>;
  rentPricePerDay?: FindOperator<number>;
  originalPrice?: FindOperator<number>;
}
