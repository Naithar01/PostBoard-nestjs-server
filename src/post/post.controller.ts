import { Controller, Get } from '@nestjs/common';
import { PostEntity } from './Entity/post.entity';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPost(): Promise<PostEntity[]> {
    return this.postService.getAll();
  }
}
