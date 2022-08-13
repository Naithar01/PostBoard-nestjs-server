import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './Entity/post.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryEntity } from 'src/category/Entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity])],
  providers: [PostService, CategoryService],
  controllers: [PostController],
})
export class PostModule {}
