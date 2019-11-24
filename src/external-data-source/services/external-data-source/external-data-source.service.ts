import { Injectable } from '@nestjs/common';
import { DataProviderInterface } from '../../interfaces/DataProvider.interface';
import { Provider1Service } from '../provider1/provider1.service';
import { Provider2Service } from '../provider2/provider2.service';
import { zip } from 'rxjs';
import { SearchDto } from '../../../equipment/dto/search.dto';
import { EquipmentPriceListDto } from '../../dto/EquipmentPriceList.dto';
import { map, tap } from 'rxjs/operators';
import { EquipmentDetailsDto } from '../../dto/EquipmentDetails.dto';
import { DatabaseService } from '../database/database.service';
import { calculateItemsPerService, createPageItemsCountCacheKey } from '../../../equipment/utils/equipment.helpers';
import { EquipmentCacheService } from '../../../equipment/services/cache/cache.service';

@Injectable()
export class ExternalDataSourceService {
  private sourceNumberRegExp: RegExp = /[0-9]*_/;
  private dataProviders: DataProviderInterface[];
  private cacheService: EquipmentCacheService;

  constructor(
    private provider1: Provider1Service,
    private provider2: Provider2Service,
    private databaseService: DatabaseService,
  ) {
    this.cacheService =  EquipmentCacheService.getInstance();
    this.dataProviders = [databaseService, provider1, provider2];
  }

  getPriceList(query: SearchDto): Promise<EquipmentPriceListDto[]> {
    const page = query.page || 1;
    const response$ = zip(
      ...this.dataProviders.map(dataProvider =>
        dataProvider.checkCacheAndSearch(query),
      ),
    );
    return response$
      .pipe(
        map((dataSets: EquipmentPriceListDto[][]) => {
          return []
            .concat(...dataSets)
            .sort(
              (a: EquipmentPriceListDto, b: EquipmentPriceListDto) =>
                -a.rentPricePerHour + b.rentPricePerHour,
            )
            .slice(0, 100);
        }),
        tap((data: EquipmentPriceListDto[]) => {
          const prevPageDataCacheKey = createPageItemsCountCacheKey(query, page - 1);
          const prevPageData = this.cacheService.get(prevPageDataCacheKey);
          const itemsPerService = calculateItemsPerService(data, this.dataProviders.length, prevPageData);
          const currentPageDataCacheKey = createPageItemsCountCacheKey(query, page);
          this.cacheService.set(currentPageDataCacheKey, itemsPerService);
          // console.log('itemsPerService', itemsPerService);
        }),
      )
      .toPromise();

  }

  getDetails(sourceId: string): Promise<EquipmentDetailsDto> {
    const [source, id] = this.getSourceNumberAndItemIdFromSourceId(sourceId);
    if (!source) {
      return null;
    }
    return this.dataProviders[source].getDetails(id).toPromise();
  }

  private getSourceNumberAndItemIdFromSourceId(sourceId: string): number[] {
    const matchedCase = sourceId.match(this.sourceNumberRegExp);
    if (!matchedCase) {
      return null;
    }
    return sourceId.split('_').map(_ => parseInt(_, 10));
  }
}
