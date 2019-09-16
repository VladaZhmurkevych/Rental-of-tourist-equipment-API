import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CategoryService} from '../../services/category/category.service';
import {EquipmentService} from '../../services/equipment/equipment.service';
import {EquipmentDto} from '../../dto/equipment.dto';

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
    async getSingleItem(@Param('id') id: number) {
        return await this.equipmentService.getOneById(id);
    }

    @Get()
    async getAllItems() {
        return await this.equipmentService.getAll();
    }

    @Post()
    async createItem(@Body() equipmentDto: EquipmentDto) {
        return await this.equipmentService.addEquipment(equipmentDto);
    }

    @Delete()
    deleteItem() {
        return 'Hello';
    }

    @Put()
    updateItem() {
        return 'Hello';
    }
}
