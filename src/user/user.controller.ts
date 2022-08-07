import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/user.dto';
import { UserEntity } from './Entity/user.entity';
import { JwtAuthGuard } from './Gaurd/jwt-auth-guard';
import { LocalAuthGaurd } from './Gaurd/local-auth-guard';
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
  async login(@Request() req): Promise<{ access_token: string }> {
    return await this.userService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    this.userService.deleteUser(id);
    return;
  }
}
