import { EquipmentPriceListDto } from '../dto/EquipmentPriceList.dto';
import { EquipmentDetailsDto } from '../dto/EquipmentDetails.dto';
import { SearchDto } from '../../equipment/dto/search.dto';
import { Observable } from 'rxjs';

export interface DataProviderInterface {
  search(query: SearchDto): Observable<EquipmentPriceListDto[]>;
  getDetails(id: number): Observable<EquipmentDetailsDto>;
  mapResponseToEquipmentPriceListDto(data: unknown): EquipmentPriceListDto[];
  mapResponseToEquipmentDetailsDto(data: unknown): EquipmentDetailsDto;
}

export abstract class AbstractDataProvider implements DataProviderInterface {
  protected constructor(num: number) {
    this.sourceNumber = num;
  }
  protected sourceNumber: number;
  abstract search(query: SearchDto): Observable<EquipmentPriceListDto[]>;
  abstract getDetails(id: number): Observable<EquipmentDetailsDto>;
  abstract mapResponseToEquipmentDetailsDto(data: unknown): EquipmentDetailsDto;
  abstract mapResponseToEquipmentPriceListDto(data: unknown): EquipmentPriceListDto[];
  protected createIdForExternalSourceItem(id: number): string {
    return `${this.sourceNumber}_${id}`;
  }
}
