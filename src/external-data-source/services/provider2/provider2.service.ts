import { HttpService, Injectable } from '@nestjs/common';
import { AbstractDataProvider } from '../../interfaces/DataProvider.interface';
import { EquipmentPriceListDto } from '../../dto/EquipmentPriceList.dto';
import { EquipmentDetailsDto } from '../../dto/EquipmentDetails.dto';
import { map, take } from 'rxjs/operators';
import { SearchDto } from '../../../equipment/dto/search.dto';
import { PriceListProvider2Dto } from '../../dto/PriceListProvider2.dto';
import { ProductDetailsProvider2Dto } from '../../dto/ProductDetailsProvider2.dto';
import { EquipmentProvider1Dto } from '../../dto/EquipmentProvider1.dto';
import { Observable } from 'rxjs';
import { mapSearchDtoToFindSpecification } from '../../../equipment/utils/equipment.helpers';
import { IEquipment } from '../../../equipment/utils/equipment.interface';
import { PROVIDER_2_DETAILS_URL, PROVIDER_2_PRICE_LIST_URL } from '../../../equipment/utils/endpoints';

@Injectable()
export class Provider2Service extends AbstractDataProvider {
  private priceListEndpoint: string = PROVIDER_2_PRICE_LIST_URL;
  private productDetailsEndpoint: string = PROVIDER_2_DETAILS_URL;
  constructor(private httpService: HttpService) {
    super(2);
  }

  search(query: SearchDto): Observable<EquipmentPriceListDto[]> {
    const response$ = this.httpService.get<PriceListProvider2Dto[]>(
      this.priceListEndpoint,
    );

    return response$.pipe(
      take(1),
      map((response): PriceListProvider2Dto[] => {
        return response.data;
      }),
      map((data: PriceListProvider2Dto[]) =>
        this.filterPriceList(query, data),
      ),
      map((data: PriceListProvider2Dto[]) =>
        this.mapResponseToEquipmentPriceListDto(data),
      ),
    );
  }

  private filterPriceList(
    query: SearchDto,
    equipmentList: PriceListProvider2Dto[],
  ): PriceListProvider2Dto[] {
    const specification = mapSearchDtoToFindSpecification(query);
    return equipmentList.filter((item: IEquipment) =>
      specification.isSatisfiedBy(item),
    );
  }

  getDetails(id: number): Observable<EquipmentDetailsDto> {
    const response$ = this.httpService.get<ProductDetailsProvider2Dto>(
      this.productDetailsEndpoint + id,
    );

    return response$.pipe(
      take(1),
      map((response): ProductDetailsProvider2Dto => response.data),
      map((data: ProductDetailsProvider2Dto) =>
        this.mapResponseToEquipmentDetailsDto(data),
      ),
    );
  }

  mapResponseToEquipmentPriceListDto(
    data: PriceListProvider2Dto[],
  ): EquipmentPriceListDto[] {
    return data.map((equipment: EquipmentProvider1Dto) => {
      const mappedResult = new EquipmentPriceListDto();
      mappedResult.id = this.createIdForExternalSourceItem(equipment.id);
      mappedResult.rentPricePerDay = equipment.rentPricePerDay;
      mappedResult.originalPrice = equipment.originalPrice;
      mappedResult.name = equipment.name;
      mappedResult.rentPricePerHour = equipment.rentPricePerHour;
      return mappedResult;
    });
  }

  mapResponseToEquipmentDetailsDto(
    data: ProductDetailsProvider2Dto,
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
}
