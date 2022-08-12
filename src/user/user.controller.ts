import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/user.dto';
import { UserEntity } from './Entity/user.entity';
import { JwtAuthGuard } from './Gaurd/jwt-auth-guard';
import { LocalAuthGaurd } from './Gaurd/local-auth-guard';
import { UserService } from './user.service';
import { GetUser } from './decorator/get-user-decorator';

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
  async login(
    @Res() res: Response,
    @GetUser() user: UserEntity,
  ): Promise<Response<any, Record<string, any>>> {
    const { username, id } = user as UserEntity;
    const jwt = await this.userService.loginUser(username, id);
    res.setHeader('Authorization', 'Bearer ' + jwt.access_token);
    res.cookie('jwt', jwt.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    return res.status(201).json(jwt);
  }

  @Post('logout')
  async logout(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.status(200).json(true);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: UserEntity): UserEntity {
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    this.userService.deleteUser(id);
    return;
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }
}
