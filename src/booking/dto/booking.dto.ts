import { IsNotEmpty } from 'class-validator';
import { orderCreate } from 'src/typeorm/order.entities';

export class bookingDto {
  @IsNotEmpty()
  bookingDate: string;

  @IsNotEmpty()
  checkIn: string;

  checkOut: string;

  order: orderCreate;
}
