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
  return Date.now() + (timeInMs > updateTime ? DAY - timeInMs + updateTime : updateTime - timeInMs);
};
