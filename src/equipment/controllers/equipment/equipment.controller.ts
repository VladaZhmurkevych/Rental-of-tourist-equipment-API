import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    try {
      return await this.categoryService.findAll();
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getSingleItem(@Param() params: SingleItemParamsDto) {
    try {
      return await this.equipmentService.getOneById(params.id);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async searchItems(@Query() searchQuery: SearchDto) {
    try {
      return await this.equipmentService.search(searchQuery);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createItem(@Body() equipmentDto: EquipmentDto) {
    try {
      return await this.equipmentService.addEquipment(equipmentDto);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteItem(@Param() params: SingleItemParamsDto) {
    try {
      return await this.equipmentService.deleteOne(params.id);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateItem(
    @Param() params: SingleItemParamsDto,
    @Body() equipmentUpdateDto: EquipmentUpdateDto,
  ) {
    try {
      return await this.equipmentService.updateOne(
        equipmentUpdateDto,
        params.id,
      );
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
