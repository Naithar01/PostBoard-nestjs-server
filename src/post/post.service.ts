import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './DTO/post.dto';
import { PostEntity } from './Entity/post.entity';
import { UserEntity } from 'src/user/Entity/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private PostRepository: Repository<PostEntity>,
  ) {}

  async getAll(): Promise<PostEntity[]> {
    return await this.PostRepository.find();
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    if (user) {
      const { title, content } = createPostDto;
      // Post에 작성자 User로 넣어줄 코드
      const NewPost = {
        id: uuid(),
        author: user.username,
        title,
        content,
        create_at: new Date(),
        user,
      };

      await this.PostRepository.save(NewPost);
      return NewPost;
    }
    throw new HttpException('Error', 400);
  }

  async deletePost(id: string): Promise<void> {
    await this.PostRepository.delete({ id: id });
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const { title, content } = updatePostDto;
    const UpdatedPost = await this.PostRepository.findOne({
      where: {
        id: id,
      },
    });

    UpdatedPost.title = title;
    UpdatedPost.content = content;

    await this.PostRepository.save(UpdatedPost);

    return UpdatedPost;
  }

  async getPostById(id: string): Promise<PostEntity> {
    return await this.PostRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
