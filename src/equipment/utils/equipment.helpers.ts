import { SearchDto } from '../dto/search.dto';
import { SearchQueryBuilder } from './search.builder';
import {
  EmptySpecification, IdSpecification,
  NameSpecification,
  PriceMaxSpecification,
  PriceMinSpecification,
  Specification
} from './specification';
import { Equipment } from '../entities/equipment.entity';
import { IEquipment } from './equipment.interface';

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
      new PriceMaxSpecification(search.originalPriceTo, 'originalPriceTo'),
    );
  }
  if (search.originalPriceFrom) {
    specification = specification.and(
      new PriceMinSpecification(search.originalPriceFrom, 'originalPriceFrom'),
    );
  }
  if (search.rentPricePerDayFrom) {
    specification = specification.and(
      new PriceMinSpecification(
        search.rentPricePerDayFrom,
        'rentPricePerDayFrom',
      ),
    );
  }
  if (search.rentPricePerDayTo) {
    specification = specification.and(
      new PriceMaxSpecification(search.rentPricePerDayTo, 'rentPricePerDayTo'),
    );
  }
  if (search.rentPricePerHourFrom) {
    specification = specification.and(
      new PriceMinSpecification(
        search.rentPricePerHourFrom,
        'rentPricePerHourFrom',
      ),
    );
  }
  if (search.rentPricePerHourTo) {
    specification = specification.and(
      new PriceMaxSpecification(
        search.rentPricePerHourTo,
        'rentPricePerHourTo',
      ),
    );
  }
  return specification;
};
