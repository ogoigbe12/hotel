import { IsNotEmpty } from 'class-validator';
import { ItemsCreate } from 'src/typeorm/items.entities';

export class orderDto {
  @IsNotEmpty()
  orderDate: number;

  Qty: string;

  @IsNotEmpty()
  Cost: string;

  items: ItemsCreate;
}
