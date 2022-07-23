import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/user.dto';
import { UserEntity } from './Entity/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async getAllUser(): Promise<UserEntity[]> {
    return await this.UserRepository.find();
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.UserRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ id: string; username: string; create_at: Date } | null> {
    const user = await this.findUserByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password } = createUserDto;

    const NewUser: UserEntity = {
      id: uuid(),
      username,
      password,
      create_at: new Date(),
    };

    await this.UserRepository.save(NewUser);

    return NewUser;
  }
}
