import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/booking.entities';
import { Customer } from 'src/typeorm/customer.entities';
import { Reminder } from 'src/typeorm/reminder.entities';
import { Room } from 'src/typeorm/room.entities';
import { BookingController } from './controller/booking/booking.controller';
import { BookingService } from './service/booking/booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, Customer, Reminder])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
