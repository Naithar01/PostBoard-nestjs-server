import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './DTO/post.dto';
import { PostEntity } from './Entity/post.entity';
import { PostService } from './post.service';

@ApiTags('Post')
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

  @Delete(':id')
  async deletePost(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.postService.deletePost(id);
    return;
  }

  @Patch(':id')
  updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }
}
