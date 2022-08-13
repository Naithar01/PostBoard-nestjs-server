import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/user/decorator/get-user-decorator';
import { UserEntity } from 'src/user/Entity/user.entity';
import { JwtAuthGuard } from 'src/user/Gaurd/jwt-auth-guard';
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
  @UseGuards(JwtAuthGuard)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: UserEntity,
    @Query('category') category: string,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user, category);
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
  ): Promise<PostEntity> {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }
}
