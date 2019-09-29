import { Injectable } from '@nestjs/common';
import { DataProviderInterface } from '../../interfaces/DataProvider.interface';
import { Provider1Service } from '../provider1/provider1.service';
import { Provider2Service } from '../provider2/provider2.service';
import { zip } from 'rxjs';
import { SearchDto } from '../../../equipment/dto/search.dto';
import { EquipmentPriceListDto } from '../../dto/EquipmentPriceList.dto';
import { map } from 'rxjs/operators';
import { EquipmentDetailsDto } from '../../dto/EquipmentDetails.dto';

@Injectable()
export class ExternalDataSourceService {
  private sourceNumberRegExp: RegExp = /[0-9]*_/;
  private dataProviders: DataProviderInterface[];

  constructor(provider1: Provider1Service, provider2: Provider2Service) {
    this.dataProviders = [provider1, provider2];
  }

  getPriceList(query: SearchDto): Promise<EquipmentPriceListDto[]> {
    const response$ = zip(
        ...this.dataProviders.map(dataProvider => dataProvider.search(query)),
    );
    return response$
      .pipe(
        map((dataSets: EquipmentPriceListDto[][]) => [].concat(...dataSets)),
      )
      .toPromise();
  }

  getDetails(sourceId: string, id: number): Promise<EquipmentDetailsDto> {
    const source = this.getSourceNumberFromSourceId(sourceId);
    if (!source) { return null; }
    return this.dataProviders[source].getDetails(id).toPromise();
  }

  private getSourceNumberFromSourceId(sourceId: string): number {
    const matchedCase = sourceId.match(this.sourceNumberRegExp);
    if (!matchedCase) { return null; }
    return parseInt(matchedCase[0].slice(0, -1), 10);
  }
}
