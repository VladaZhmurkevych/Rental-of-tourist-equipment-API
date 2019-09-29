import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { SingleItemParamsDto } from '../equipment/dto/single_item_params.dto';

@Controller('')
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
  ) {}

  @Get('price-list')
  getEquipmentPriceList() {
    return this.equipmentService.getPriceList();
  }

  @Get('details/:id')
  getEquipmentDetails(@Param() params: SingleItemParamsDto) {
    return this.equipmentService.getDetails(params.id);
  }
}
