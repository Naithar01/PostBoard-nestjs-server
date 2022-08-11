import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategy/local.strategy';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey1',
      signOptions: { expiresIn: 24 * 60 * 60 * 1000 },
    }),
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
