import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class EmployeeDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  // expensesId: number;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
