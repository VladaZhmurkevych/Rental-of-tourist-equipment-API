import { SearchDto } from '../dto/search.dto';
import { SearchQueryBuilder } from './search.builder';

export const mapSearchDtoToFindOperators = (search: SearchDto) => {
  const searchQueryBuilder = new SearchQueryBuilder();

  searchQueryBuilder
    .addOriginalPrice(search.originalPriceFrom, search.originalPriceTo)
    .addPricePerDay(search.rentPricePerDayFrom, search.rentPricePerDayTo)
    .addPricePerHour(search.rentPricePerHourFrom, search.rentPricePerHourTo);

  if (search.categoryId) {
    searchQueryBuilder.addCategoryId(search.categoryId);
  }
  if (search.name) {
    searchQueryBuilder.addName(search.name);
  }

  return searchQueryBuilder.getSearchQuery();
};
