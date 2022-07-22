import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    await this.postService.deletePost(id);
    return res.status(200).json();
  }

  @Patch(':id')
  updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, updatePostDto);
  }
}
