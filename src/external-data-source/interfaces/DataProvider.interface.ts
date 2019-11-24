import { EquipmentPriceListDto } from '../dto/EquipmentPriceList.dto';
import { EquipmentDetailsDto } from '../dto/EquipmentDetails.dto';
import { SearchDto } from '../../equipment/dto/search.dto';
import {
  Observable,
  of,
  interval,
  merge,
  combineLatest,
  timer,
  Subscription,
} from 'rxjs';
import { EquipmentCacheService } from '../../equipment/services/cache/cache.service';
import { filter, map, skip, startWith, take, tap } from 'rxjs/operators';
import {
  calculateCacheTtl, createDataRequestCacheKey,
  createPageItemsCountCacheKey,
} from '../../equipment/utils/equipment.helpers';

export interface DataProviderInterface {
  checkCacheAndSearch(query: SearchDto);
  search(query: SearchDto, skip: number): Observable<EquipmentPriceListDto[]>;
  getDetails(id: number): Observable<EquipmentDetailsDto>;
  mapResponseToEquipmentPriceListDto(data: unknown): EquipmentPriceListDto[];
  mapResponseToEquipmentDetailsDto(data: unknown): EquipmentDetailsDto;
}

export abstract class AbstractDataProvider implements DataProviderInterface {
  protected constructor(num: number, updateTime: number) {
    this.sourceNumber = num;
    this.cacheService = EquipmentCacheService.getInstance();
    this.updateTime = updateTime;
  }
  protected updateTime: number;
  protected cacheService: EquipmentCacheService;
  protected sourceNumber: number;
  public checkCacheAndSearch(query: SearchDto) {
    let skipItems = 0;

    if (query.page) {
      const prevPageDataCacheKey = createPageItemsCountCacheKey(query, query.page - 1);
      const prevPageCacheData = this.cacheService.get(prevPageDataCacheKey);
      skipItems = prevPageCacheData ? prevPageCacheData[this.sourceNumber] : 0;
      if (!prevPageCacheData && query.page && query.page > 1) { return of([]); }
    }

    const cacheKey = createDataRequestCacheKey(this.sourceNumber, query, skipItems);
    const cache = this.cacheService.get(cacheKey) as any[];

    if (cache) {
      return of(cache);
    }

    const searchRequest$ = this.search(query, skipItems).pipe(
      startWith(null),
      take(2),
    );

    const searchRequestSubscription: Subscription = searchRequest$.subscribe(
      data => {
        if (data) {
          this.cacheService.set(
            cacheKey,
            data,
            calculateCacheTtl(this.updateTime),
          );
        }
      },
    );

    return combineLatest(searchRequest$, timer(1, 500)).pipe(
      skip(1),
      take(1),
      map(([search]) => search || []),
    );
  }

  abstract search(query: SearchDto, skip: number): Observable<EquipmentPriceListDto[]>;
  abstract getDetails(id: number): Observable<EquipmentDetailsDto>;
  abstract mapResponseToEquipmentDetailsDto(data: unknown): EquipmentDetailsDto;
  abstract mapResponseToEquipmentPriceListDto(
    data: unknown,
  ): EquipmentPriceListDto[];
  protected createIdForExternalSourceItem(id: number): string {
    return `${this.sourceNumber}_${id}`;
  }
}
