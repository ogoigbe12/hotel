import { IsNotEmpty } from 'class-validator';
import { Booking } from 'src/typeorm/booking.entities';
import { ItemsCreate } from 'src/typeorm/items.entities';
import { orderCreate } from 'src/typeorm/order.entities';
import { DeepPartial } from 'typeorm';

export class orderDto {
  @IsNotEmpty()
  orderDate: number;

  Qty: string;

  @IsNotEmpty()
  Cost: string;

  items: ItemsCreate;

  booking: Booking;
}
