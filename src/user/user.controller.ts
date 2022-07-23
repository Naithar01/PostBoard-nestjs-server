import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './Entity/user.entity';
import { LocalAuthGaurd } from './Gaurd/local-auth.gaurd';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser(): Promise<UserEntity[]> {
    return await this.userService.getAllUser();
  }

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
