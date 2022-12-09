import { IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  contactNo: number;

  @IsNotEmpty()
  gender: string;
}
