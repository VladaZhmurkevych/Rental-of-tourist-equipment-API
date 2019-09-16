import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  getCategoryIdByName(name: string): Promise<number> {
    return this.categoriesRepository.findOne({
      select: ['id'],
      where: { name },
    }).then((category: Category) => category.id);
  }
}
