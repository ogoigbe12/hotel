import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/typeorm/employee.entities';
import { EmployeeDto } from 'src/employee/Dtos/employee.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private userRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}
  async createUser(userDetails: EmployeeDto) {
    const findEamil = await this.userRepository.findBy({
      email: userDetails.email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    userDetails.password = hashedPassword;
    if (findEamil.length === 0)
      return await this.userRepository.save(userDetails);
  }

  async login(userDetails: EmployeeDto) {
    const userLogin = await this.userRepository.findOneBy({
      email: userDetails.email,
    });
    if (userLogin) {
      const passwordCheck = await bcrypt.compare(
        userDetails.password,
        userLogin.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: userLogin.id,
          email: userLogin.email,
        });
        return { token: token };
      }
      return { err: 'incorrect password', status: HttpStatus.BAD_REQUEST };
    }
    return {
      err: 'employee with email not found',
      status: HttpStatus.NOT_FOUND,
    };
  }
  async getUsers() {
    return await this.userRepository.find({});
  }
  async getUserById(id: number): Promise<Employee> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async DeleteUser(id: number) {
    const findUser = await this.userRepository.findOneBy({ id: id });
    if (!findUser)
      return new HttpException(
        'user with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.userRepository.delete({ id: id });
  }
}
