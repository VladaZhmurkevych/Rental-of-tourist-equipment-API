import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {CategoryService} from '../../services/category/category.service';

@Controller('equipment')
export class EquipmentController {

    constructor(private categoryService: CategoryService) {}

    @Get()
    getSingleItem() {
        return 'Hello';
    }

    @Get('categories')
    async getCategories() {
        return await this.categoryService.findAll();
    }

    @Get('all')
    getAllItems() {
        return 'Hello';
    }

    @Post()
    createItem() {
        return 'Hello';
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
