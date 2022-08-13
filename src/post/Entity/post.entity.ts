import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/category/Entity/category.entity';
import { UserEntity } from 'src/user/Entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  @ApiProperty({
    description: 'Post UUID',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Post 작성자',
  })
  author: string;

  @Column()
  @ApiProperty({
    description: 'Post 제목',
  })
  title: string;

  @Column()
  @ApiProperty({
    description: 'Post 내용',
  })
  content: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    description: 'Post 작성일',
  })
  create_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.post, { onDelete: 'SET NULL' })
  @ApiProperty({
    description: 'Post 작성자 정보',
  })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.post, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    description: 'Post 의 Category',
  })
  category: CategoryEntity;
}
