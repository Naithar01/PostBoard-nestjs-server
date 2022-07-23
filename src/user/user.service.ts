import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/user.dto';
import { UserEntity } from './Entity/user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

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

    if (user) {
      const compare_passwort = await bcrypt.compare(password, user.password);

      if (compare_passwort) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password } = createUserDto;
    const hash_passwort = await bcrypt.hash(password, process.env.BCRYPT_SALT);
    const NewUser: UserEntity = {
      id: uuid(),
      username,
      password: hash_passwort,
      create_at: new Date(),
    };

    await this.UserRepository.save(NewUser);

    return NewUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.UserRepository.delete({ id: id });
  }
}
