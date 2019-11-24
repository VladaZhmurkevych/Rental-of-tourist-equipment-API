import { HttpService, Injectable } from '@nestjs/common';
import {
  AbstractDataProvider,
} from '../../interfaces/DataProvider.interface';
import { EquipmentPriceListDto } from '../../dto/EquipmentPriceList.dto';
import { EquipmentDetailsDto } from '../../dto/EquipmentDetails.dto';
import { map, take, tap } from 'rxjs/operators';
import { SearchDto } from '../../../equipment/dto/search.dto';
import { EquipmentProvider1Dto } from '../../dto/EquipmentProvider1.dto';
import { Observable } from 'rxjs';
import { PROVIDER_1_SEARCH_URL } from '../../../equipment/utils/endpoints';

@Injectable()
export class Provider1Service extends AbstractDataProvider {
  private searchEndpoint: string = PROVIDER_1_SEARCH_URL;
  constructor(private httpService: HttpService) {
    super(1, 9);
  }

  search(query: SearchDto, skip: number = 0): Observable<EquipmentPriceListDto[]> {
    return this.httpService
      .get<EquipmentProvider1Dto[]>(this.searchEndpoint, { params: query })
      .pipe(
        map((response): EquipmentProvider1Dto[] => response.data),
        map((data: EquipmentProvider1Dto[]): EquipmentProvider1Dto[] => data.slice(skip, skip + 100)),
        map((data: EquipmentProvider1Dto[]) =>
          this.mapResponseToEquipmentPriceListDto(data),
        ),
      );
  }

  getDetails(id: number): Observable<EquipmentDetailsDto> {
    const response$ = this.httpService.get<EquipmentProvider1Dto[]>(
      this.searchEndpoint,
      {
        params: {
          id,
        },
      },
    );

    return response$.pipe(
      take(1),
      map((response): EquipmentProvider1Dto[] => response.data),
      map((data: EquipmentProvider1Dto[]): EquipmentProvider1Dto => data[0]),
      map(
        (data: EquipmentProvider1Dto): EquipmentDetailsDto =>
          data ? this.mapResponseToEquipmentDetailsDto(data) : null,
      ),
    );
  }

  mapResponseToEquipmentDetailsDto(
    data: EquipmentProvider1Dto,
  ): EquipmentDetailsDto {
    const mappedResult = new EquipmentDetailsDto();
    mappedResult.id = this.createIdForExternalSourceItem(data.id);
    mappedResult.description = data.description;
    mappedResult.mainPhoto = data.mainPhoto;
    mappedResult.name = data.name;
    mappedResult.originalPrice = data.originalPrice;
    mappedResult.rentPricePerDay = data.rentPricePerDay;
    mappedResult.rentPricePerHour = data.rentPricePerHour;
    mappedResult.source = this.sourceNumber;
    return mappedResult;
  }

  mapResponseToEquipmentPriceListDto(
    data: EquipmentProvider1Dto[],
  ): EquipmentPriceListDto[] {
    return data.map((equipment: EquipmentProvider1Dto) => {
      const mappedResult = new EquipmentPriceListDto();
      mappedResult.id = this.createIdForExternalSourceItem(equipment.id);
      mappedResult.name = equipment.name;
      mappedResult.originalPrice = equipment.originalPrice;
      mappedResult.rentPricePerDay = equipment.rentPricePerDay;
      mappedResult.rentPricePerHour = equipment.rentPricePerHour;
      mappedResult.source = this.sourceNumber;
      return mappedResult;
    });
  }
}
