import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './Entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.UserRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
