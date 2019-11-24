import { SearchDto } from '../dto/search.dto';
import { SearchQueryBuilder } from './search.builder';
import {
  EmptySpecification,
  IdSpecification,
  NameSpecification,
  PriceMaxSpecification,
  PriceMinSpecification,
  Specification,
} from './specification';
import { Equipment } from '../entities/equipment.entity';
import { IEquipment } from './equipment.interface';
import { DAY } from './constants';
import { EquipmentPriceListDto } from '../../external-data-source/dto/EquipmentPriceList.dto';

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

export const mapSearchDtoToFindSpecification = (
  search: SearchDto,
): Specification<IEquipment> => {
  let specification: Specification<IEquipment> = new EmptySpecification();
  if (search.id) {
    specification = specification.and(new IdSpecification(search.id));
  }
  if (search.name) {
    specification = specification.and(new NameSpecification(search.name));
  }
  if (search.originalPriceTo) {
    specification = specification.and(
      new PriceMaxSpecification(search.originalPriceTo, 'originalPrice'),
    );
  }
  if (search.originalPriceFrom) {
    specification = specification.and(
      new PriceMinSpecification(search.originalPriceFrom, 'originalPrice'),
    );
  }
  if (search.rentPricePerDayFrom) {
    specification = specification.and(
      new PriceMinSpecification(search.rentPricePerDayFrom, 'rentPricePerDay'),
    );
  }
  if (search.rentPricePerDayTo) {
    specification = specification.and(
      new PriceMaxSpecification(search.rentPricePerDayTo, 'rentPricePerDay'),
    );
  }
  if (search.rentPricePerHourFrom) {
    specification = specification.and(
      new PriceMinSpecification(
        search.rentPricePerHourFrom,
        'rentPricePerHour',
      ),
    );
  }
  if (search.rentPricePerHourTo) {
    specification = specification.and(
      new PriceMaxSpecification(search.rentPricePerHourTo, 'rentPricePerHour'),
    );
  }
  return specification;
};

export const calculateCacheTtl = (updateHour: number) => {
  const updateTime = updateHour * 60 * 60 * 1000;
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const timeInMs = (hour * 60 * 60 + min * 60 + sec) * 1000;
  return (
    Date.now() +
    (timeInMs > updateTime
      ? DAY - timeInMs + updateTime
      : updateTime - timeInMs)
  );
};

export interface PaginationData {
  skip: number;
  take: number;
}

export const calculatePagination = (
  itemsPerPage: number,
  page: number = 1,
): PaginationData => ({
  take: itemsPerPage,
  skip: (page - 1) * itemsPerPage,
});

export const calculateItemsPerService = (
  data: EquipmentPriceListDto[],
  providersCount: number,
  prevPageData,
): number[] => data
  .reduce((acc, item) => {
    const source = item.source;
    acc[source] = acc[source] + 1;
    return acc;
  }, prevPageData || new Array(providersCount).fill(0));

export const queryWithoutPaging = (query: SearchDto) => {
  const { page, ...rest } = query;
  return rest;
};

export const createPageItemsCountCacheKey = (query: SearchDto, page) =>
  `page${page}${JSON.stringify(queryWithoutPaging(query))}`;

export const createDataRequestCacheKey = (source: number, query: SearchDto, skip: number = 0) =>
  `${source}${JSON.stringify(queryWithoutPaging(query))}${skip}`;
