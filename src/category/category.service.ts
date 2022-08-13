import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Entity/category.entity';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto } from './DTO/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategory(): Promise<CategoryEntity[]> {
    return await this.CategoryRepository.find({
      relations: ['post'],
    });
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    return await this.CategoryRepository.findOne({ where: { name: name } });
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    return await this.CategoryRepository.findOne({ where: { id: id } });
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const { name } = createCategoryDto;
    const NewCategory: CategoryEntity = {
      id: uuid(),
      name,
      create_at: new Date(),
    };
    await this.CategoryRepository.save(NewCategory);

    return NewCategory;
  }
}
