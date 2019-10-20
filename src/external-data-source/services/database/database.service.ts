import { HttpService, Injectable } from '@nestjs/common';
import { AbstractDataProvider } from '../../interfaces/DataProvider.interface';
import { EquipmentPriceListDto } from '../../dto/EquipmentPriceList.dto';
import { EquipmentDetailsDto } from '../../dto/EquipmentDetails.dto';
import { map, take, tap } from 'rxjs/operators';
import { SearchDto } from '../../../equipment/dto/search.dto';
import { EquipmentProvider1Dto } from '../../dto/EquipmentProvider1.dto';
import { from, Observable, of } from 'rxjs';
import { PROVIDER_1_SEARCH_URL } from '../../../equipment/utils/endpoints';
import { EquipmentRepositoryService } from '../../../equipment/data_services/equipment.repository.service';
import { mapSearchDtoToFindOperators } from '../../../equipment/utils/equipment.helpers';
import { Equipment } from '../../../equipment/entities/equipment.entity';

@Injectable()
export class DatabaseService extends AbstractDataProvider {
  constructor(
    private httpService: HttpService,
    private equipmentRepositoryService: EquipmentRepositoryService,
  ) {
    super(0, 9);
  }

  search(search: SearchDto): Observable<EquipmentPriceListDto[]> {
    const searchQuery = mapSearchDtoToFindOperators(search);
    return from(this.equipmentRepositoryService.findMany(searchQuery)).pipe(
      map(
        (data: Equipment[]): EquipmentPriceListDto[] => {
          return data.map(item => ({ ...item, source: 0 }));
        },
      ),
    );
  }

  getDetails(id: number): Observable<EquipmentDetailsDto> {
    return from(this.equipmentRepositoryService.findById(id)).pipe(
      map((data: Equipment) => ({ ...data, source: 0 })),
    );
  }

  mapResponseToEquipmentDetailsDto(
    data: EquipmentDetailsDto,
  ): EquipmentDetailsDto {
    return data;
  }

  mapResponseToEquipmentPriceListDto(
    data: EquipmentPriceListDto[],
  ): EquipmentPriceListDto[] {
    return data;
  }
}
