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
import { EmployeeDto } from 'src/employee/Dtos/employee.dto';
import { EmployeeService } from 'src/employee/service/empolyee/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}
  @Get()
  async getUser() {
    const users = await this.employeeService.getUsers();
    if (users.length > 0) return users;
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getuserById(@Param('id') id: number) {
    const getId = await this.employeeService.getUserById(id);
    if (!getId) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return getId;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleteUser = await this.employeeService.DeleteUser(id);
    if (deleteUser) return deleteUser;
    throw new HttpException(
      'you cannot perform this action',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() employeeDto: EmployeeDto) {
    const newUser = await this.employeeService.createUser(employeeDto);
    if (newUser) return { msg: 'Account created', redirect: '/login' };
    return new HttpException(
      'user with email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }
  @Post('login')
  async login(@Body() employeeDto: EmployeeDto) {
    const newLogin = await this.employeeService.login(employeeDto);
    if (newLogin.token) return { msg: 'user signed in', token: newLogin.token };
    if (newLogin.err) throw new HttpException(newLogin.err, newLogin.status);
  }
}
