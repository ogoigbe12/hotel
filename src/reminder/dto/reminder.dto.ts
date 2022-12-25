import { IsNotEmpty } from 'class-validator';
import { Booking } from 'src/typeorm/booking.entities';
import { DeepPartial } from 'typeorm';

export class reminderDto {
  @IsNotEmpty()
  reminderType: string;

  @IsNotEmpty()
  reminderDetails: string;

  @IsNotEmpty()
  due: string;

  book_remind: Booking;
}
