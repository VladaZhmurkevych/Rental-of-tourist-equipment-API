import { Controller, Get, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { SearchDto } from '../equipment/dto/search.dto';

@Controller('')
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
  ) {}

  @Get('search')
  search(@Query() query: SearchDto) {
    return this.equipmentService.getFilteredItems(query);
  }
}
