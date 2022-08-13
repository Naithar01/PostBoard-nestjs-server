import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from 'src/post/Entity/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  @ApiProperty({
    description: 'Category UUID',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Category 이름',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Category 생성일',
  })
  create_at: Date;

  @OneToMany(() => PostEntity, (post) => post.category, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    description: 'Category 로 작성된 Post',
  })
  posts?: PostEntity[];
}
