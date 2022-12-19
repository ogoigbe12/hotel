import { IsNotEmpty } from 'class-validator';

export class orderDto {
  @IsNotEmpty()
  orderDate: string;

  @IsNotEmpty()
  Qty: string;

  @IsNotEmpty()
  cost: string;
}
