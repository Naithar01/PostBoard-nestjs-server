import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategy/local.strategy';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
  providers: [UserService, LocalStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
