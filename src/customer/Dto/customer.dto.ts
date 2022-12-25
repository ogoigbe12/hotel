import { IsNotEmpty } from 'class-validator';
import { Booking } from 'src/typeorm/booking.entities';

export class CustomerDto {
  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  contactNo: number;

  @IsNotEmpty()
  gender: string;

  booking: Booking;
}
