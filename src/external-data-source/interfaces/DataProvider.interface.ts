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
import { calculateCacheTtl } from '../../equipment/utils/equipment.helpers';

export interface DataProviderInterface {
  checkCacheAndSearch(query: SearchDto);
  search(query: SearchDto): Observable<EquipmentPriceListDto[]>;
  getDetails(id: number): Observable<EquipmentDetailsDto>;
  mapResponseToEquipmentPriceListDto(data: unknown): EquipmentPriceListDto[];
  mapResponseToEquipmentDetailsDto(data: unknown): EquipmentDetailsDto;
}

export abstract class AbstractDataProvider implements DataProviderInterface {
  protected constructor(num: number, updateTime: number) {
    this.sourceNumber = num;
    this.cacheService = new EquipmentCacheService();
    this.updateTime = updateTime;
  }
  protected updateTime: number;
  protected cacheService: EquipmentCacheService;
  protected sourceNumber: number;
  public checkCacheAndSearch(query: SearchDto) {
    const cache = this.cacheService.get(
      `${this.sourceNumber}${JSON.stringify(query)}`,
    );
    if (cache) {
      return of(cache);
    }

    const searchRequest$ = this.search(query).pipe(
      startWith(null),
      take(2),
    );

    const searchRequestSubscription: Subscription = searchRequest$.subscribe(
      data => {
        if (data) {
          this.cacheService.set(
            `${this.sourceNumber}${JSON.stringify(query)}`,
            data,
            calculateCacheTtl(this.updateTime),
          );
        }
      },
    );

    return combineLatest(searchRequest$, timer(1, 1000)).pipe(
      skip(1),
      take(1),
      map(([search]) => search),
    );
  }
  abstract search(query: SearchDto): Observable<EquipmentPriceListDto[]>;
  abstract getDetails(id: number): Observable<EquipmentDetailsDto>;
  abstract mapResponseToEquipmentDetailsDto(data: unknown): EquipmentDetailsDto;
  abstract mapResponseToEquipmentPriceListDto(
    data: unknown,
  ): EquipmentPriceListDto[];
  protected createIdForExternalSourceItem(id: number): string {
    return `${this.sourceNumber}_${id}`;
  }
}
