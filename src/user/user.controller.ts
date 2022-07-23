import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/user.dto';
import { UserEntity } from './Entity/user.entity';
import { LocalAuthGaurd } from './Gaurd/local-auth.gaurd';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUser(): Promise<UserEntity[]> {
    return this.userService.getAllUser();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
