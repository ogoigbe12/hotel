import { IsNotEmpty } from 'class-validator';
import { Booking } from 'src/typeorm/booking.entities';

export class roomDto {
  @IsNotEmpty()
  roomNumber: number;

  description: string;

  booking: Booking;
}
