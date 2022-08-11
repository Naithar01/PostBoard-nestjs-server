import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './Entity/post.entity';
import { UserEntity } from 'src/user/Entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
