import {Controller, Delete, Get, Post, Put} from '@nestjs/common';

@Controller('equipment')
export class EquipmentController {

    @Get()
    getSingleItem() {
        return 'Hello';
    }

    @Get("all")
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
