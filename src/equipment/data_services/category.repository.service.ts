import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepositoryService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findByName(name: string): Promise<Category> {
    return this.categoriesRepository.findOne({ name });
  }

  findById(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id);
  }
}
