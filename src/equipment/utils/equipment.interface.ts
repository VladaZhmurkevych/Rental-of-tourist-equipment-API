import { Category } from '../entities/category.entity';

export interface IEquipment {
  id?: number | string;

  categoryId?: Category;

  name?: string;

  description?: string;

  rentPricePerHour?: number;

  rentPricePerDay?: number;

  originalPrice?: number;

  mainPhoto?: string;

  source?: number;
}
