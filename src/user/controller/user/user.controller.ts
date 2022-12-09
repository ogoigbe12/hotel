import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from 'src/user/Dtos/user.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUser() {
    const users = await this.userService.getUsers();
    if (users.length > 0) return users;
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getuserById(@Param('id') id: number) {
    const getId = await this.userService.getUserById(id);
    if (!getId) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return getId;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleteUser = await this.userService.DeleteUser(id);
    if (deleteUser) return deleteUser;
    throw new HttpException(
      'you cannot perform this action',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() userDto: UserDto) {
    const newUser = await this.userService.createUser(userDto);
    if (newUser) return { msg: 'Account created', redirect: '/login' };
    return new HttpException(
      'user with email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }
  @Post('login')
  async login(@Body() userDto: UserDto) {
    const newLogin = await this.userService.login(userDto);
    if (newLogin.token) return { msg: 'user signed in', token: newLogin.token };
    if (newLogin.err) throw new HttpException(newLogin.err, newLogin.status);
  }
}
