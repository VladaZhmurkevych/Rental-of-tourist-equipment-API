import { Equipment } from '../entities/equipment.entity';

export class EquipmentBuilder {
  private readonly equipment = null;

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

  addCategory(categoryId: number): EquipmentBuilder {
    this.equipment.categoryId = categoryId;
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
