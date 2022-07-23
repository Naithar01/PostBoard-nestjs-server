import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
