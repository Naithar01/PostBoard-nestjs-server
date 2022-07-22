import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './DTO/post.dto';
import { PostEntity } from './Entity/post.entity';
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

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { title, content, author } = createPostDto;

    const NewPost: PostEntity = {
      id: uuid(),
      author,
      title,
      content,
      create_at: new Date(),
    };

    await this.PostRepository.save(NewPost);
    return NewPost;
  }

  async deletePost(id: string): Promise<void> {
    await this.PostRepository.delete({ id: id });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
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
}
