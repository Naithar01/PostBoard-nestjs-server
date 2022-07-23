import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  @ApiProperty({
    description: 'User UUID',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'User 이름',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: 'User 비밀번호',
  })
  password: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    description: 'User 생성일',
  })
  create_at: Date;
}
