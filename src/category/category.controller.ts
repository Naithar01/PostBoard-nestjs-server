import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './Entity/category.entity';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryService.getAllCategory();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(id);
  }
}
