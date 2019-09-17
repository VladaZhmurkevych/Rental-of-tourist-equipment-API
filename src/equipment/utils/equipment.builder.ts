import { Equipment } from '../entities/equipment.entity';
import { Category } from '../entities/category.entity';

export class EquipmentBuilder {
  private readonly equipment: Equipment = null;

  constructor() {
    this.equipment = new Equipment();
  }

  addName(name: string): EquipmentBuilder {
    this.equipment.name = name;
    return this;
  }

  addDescription(text: string): EquipmentBuilder {
    this.equipment.description = text;
    return this;
  }

  addCategory(category: Category): EquipmentBuilder {
    this.equipment.category = category;
    return this;
  }

  addRentPricePerHour(price: number): EquipmentBuilder {
    this.equipment.rentPricePerHour = price;
    return this;
  }

  addRentPricePerDay(price: number): EquipmentBuilder {
    this.equipment.rentPricePerDay = price;
    return this;
  }

  addRentOriginalPrice(price: number): EquipmentBuilder {
    this.equipment.originalPrice = price;
    return this;
  }

  addMainPhoto(url: string): EquipmentBuilder {
    this.equipment.mainPhoto = url;
    return this;
  }

  getEquipment(): Equipment {
    return this.equipment;
  }
}
