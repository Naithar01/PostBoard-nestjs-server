import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './DTO/post.dto';
import { PostEntity } from './Entity/post.entity';
import { PostService } from './post.service';
import { v4 as uuid } from 'uuid';

@Controller('api/post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPost(): Promise<PostEntity[]> {
    return this.postService.getAll();
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.createPost(createPostDto);
  }
}
