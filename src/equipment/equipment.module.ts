import { Module } from '@nestjs/common';
import {EquipmentController} from "./controllers/equipment/equipment.controller";
import {EquipmentService} from "./services/equipment/equipment.service";

@Module({
    controllers: [EquipmentController],
    providers: [EquipmentService],
})
export class EquipmentModule {}
