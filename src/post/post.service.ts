import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './Entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private PostRepository: Repository<PostEntity>,
  ) {}

  async getAll(): Promise<PostEntity[]> {
    return await this.PostRepository.find();
  }
}
