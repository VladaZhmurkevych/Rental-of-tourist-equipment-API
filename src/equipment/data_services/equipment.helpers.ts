import { SearchDto } from '../dto/search.dto';
import {
  FindOperator,
  In,
  Like,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';

export class SearchQueryBuilder {
  private categoryId: FindOperator<number[]>;
  private name: FindOperator<string>;
  private rentPricePerHour: FindOperator<number>;
  private rentPricePerDay: FindOperator<number>;
  private originalPrice: FindOperator<number>;

  addCategoryId(ids: number[]) {
    this.categoryId = In(ids);
  }

  addName(name: string) {
    this.name = Like(name);
  }

  private setRange(field: FindOperator<number>, from: number, to: number) {
    if (from && to) {
      field = Between(from, to);
    } else if (from) {
      field = MoreThanOrEqual(from);
    } else {
      field = LessThanOrEqual(from);
    }
  }

  addPricePerHour(from: number, to: number) {
    this.setRange(this.rentPricePerHour, from, to);
  }

  addPricePerDay(from: number, to: number) {
    this.setRange(this.rentPricePerDay, from, to);
  }

  addOriginalPrice(from: number, to: number) {
    this.setRange(this.originalPrice, from, to);
  }

  getSearchQuery() {
    return {
      categoryId: this.categoryId,
      name: this.name,
      description: this.description,
      rentPricePerHour: this.rentPricePerHour,
      rentPricePerDay: this.rentPricePerDay,
      originalPrice: this.originalPrice,
    };
  }
}

export const mapSearchDtoToFindOperators = (search: SearchDto) => {
  const searchQueryBuilder = new SearchQueryBuilder();
  if (search.categoryId) {
    searchQueryBuilder.addCategoryId(search.categoryId);
  }
  if (search.name) {
    searchQueryBuilder.addName(search.name);
  }
  if (search.rentPerHourPrice) {
    searchQueryBuilder.addPricePerHour(search.rentPerHourDay.from, search.rentPerHourDay.to);
  }
  if (search.rentPerHourDay) {
    searchQueryBuilder.addPricePerDay(search.rentPerHourDay.from, search.rentPerHourDay.to);
  }
  if (search.originalPrice) {
    searchQueryBuilder.addOriginalPrice(search.rentPerHourDay.from, search.rentPerHourDay.to);
  }
  return searchQueryBuilder.getSearchQuery()
};
