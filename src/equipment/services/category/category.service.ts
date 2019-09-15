import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CATEGORIES_REPOSITORY')
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoriesRepository.find();
    }
}
