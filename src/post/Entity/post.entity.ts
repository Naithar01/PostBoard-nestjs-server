import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'timestamp' })
  create_at: Date;
}
