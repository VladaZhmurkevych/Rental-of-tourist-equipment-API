import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { CategoryRepositoryService } from '../../data_services/category.repository.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoriesRepositoryService: CategoryRepositoryService,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepositoryService.findAll();
  }

  getCategoryByName(name: string): Promise<Category> {
    return this.categoriesRepositoryService.findByName(name);
  }

  getCategoryById(id: number): Promise<Category> {
    return this.categoriesRepositoryService.findById(id);
  }
}
