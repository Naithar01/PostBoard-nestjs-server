import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    type: String,
    description: 'Post 작성자',
  })
  author: string;

  @ApiProperty({
    type: String,
    description: 'Post 제목',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Post 내용',
  })
  content: string;
}
