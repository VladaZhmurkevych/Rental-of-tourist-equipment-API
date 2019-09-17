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
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { EquipmentDto } from '../../dto/equipment.dto';
import { GetSingleItemParamsDto } from '../../dto/get_single_item_params.dto';

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
  async getSingleItem(@Param() params: GetSingleItemParamsDto) {
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
  async getAllItems() {
    try {
      return await this.equipmentService.getAll();
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

  @Delete()
  deleteItem() {
    try {
      return 'Hello';
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  updateItem() {
    try {
      return 'Hello';
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
