import { IsNotEmpty } from 'class-validator';

export class bookingDto {
  @IsNotEmpty()
  bookingDate: string;

  @IsNotEmpty()
  checkIn: string;

  @IsNotEmpty()
  checkOut: string;
}
