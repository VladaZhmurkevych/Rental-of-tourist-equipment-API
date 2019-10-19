import { SearchQuery } from '../interfaces/search.query.interface';
import { Between, In, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

export class SearchQueryBuilder {
  private searchQuery: SearchQuery = {
  };

  addCategoryId(ids: number[]) {
    this.searchQuery.categoryId = In(Array.isArray(ids) ? ids : [ids]);
    return this;
  }

  addName(name: string) {
    this.searchQuery.name = Like(`%${name}%`);
    return this;
  }

  private setRange(field: string, from: number, to: number) {
    if (from && to) {
      this.searchQuery[field] = Between(from, to);
    } else if (from) {
      this.searchQuery[field] = MoreThanOrEqual(from);
    } else if (to) {
      this.searchQuery[field] = LessThanOrEqual(from);
    }
  }

  addPricePerHour(from: number, to: number) {
    this.setRange('rentPricePerHour', from, to);
    return this;
  }

  addPricePerDay(from: number, to: number) {
    this.setRange('rentPricePerDay', from, to);
    return this;
  }

  addOriginalPrice(from: number, to: number) {
    this.setRange('originalPrice', from, to);
    return this;
  }

  getSearchQuery() {
    return this.searchQuery;
  }
}
