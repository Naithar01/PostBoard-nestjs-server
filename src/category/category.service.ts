import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategory(): Promise<CategoryEntity[]> {
    return await this.CategoryRepository.find();
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    return await this.CategoryRepository.findOne({ where: { name: name } });
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    return await this.CategoryRepository.findOne({ where: { id: id } });
  }
}
