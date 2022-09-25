import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Routes, Services } from '../utils';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Get('logout')
  logout() {}
}
