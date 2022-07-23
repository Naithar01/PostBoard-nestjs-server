import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User 이름',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'User 비밀번호',
  })
  password: string;
}
