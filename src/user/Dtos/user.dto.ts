import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  // @IsNotEmptyObject()
  password: string;
}
