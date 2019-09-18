import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { EquipmentDto } from '../../dto/equipment.dto';
import { SingleItemParamsDto } from '../../dto/single_item_params.dto';
import { EquipmentUpdateDto } from '../../dto/equipment_update.dto';
import { SearchDto } from '../../dto/search.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(
    private categoryService: CategoryService,
    private equipmentService: EquipmentService,
  ) {}

  @Get('categories')
  async getCategories() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async getSingleItem(@Param() params: SingleItemParamsDto) {
    return await this.equipmentService.getOneById(params.id);
  }

  @Get()
  async searchItems(@Query() searchQuery: SearchDto) {
    return await this.equipmentService.search(searchQuery);
  }

  @Post()
  async createItem(@Body() equipmentDto: EquipmentDto) {
    return await this.equipmentService.addEquipment(equipmentDto);
  }

  @Delete(':id')
  async deleteItem(@Param() params: SingleItemParamsDto) {
    return await this.equipmentService.deleteOne(params.id);
  }

  @Put(':id')
  async updateItem(
    @Param() params: SingleItemParamsDto,
    @Body() equipmentUpdateDto: EquipmentUpdateDto,
  ) {
    return await this.equipmentService.updateOne(
      equipmentUpdateDto,
      params.id,
    );
  }
}
