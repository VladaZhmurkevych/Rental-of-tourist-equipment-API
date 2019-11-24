import { Controller, Get, Param, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { SingleItemParamsDto } from '../equipment/dto/single_item_params.dto';
import { SearchDto } from '../equipment/dto/search.dto';

@Controller('')
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
  ) {}

  @Get('price-list')
  getEquipmentPriceList(@Query() query: SearchDto) {
    return this.equipmentService.getPriceList(query);
  }

  @Get('details/:id')
  getEquipmentDetails(@Param() params: SingleItemParamsDto) {
    return this.equipmentService.getDetails(params.id);
  }
}
