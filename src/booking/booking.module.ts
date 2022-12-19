import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/booking.entities';
import { BookingController } from './controller/booking/booking.controller';
import { BookingService } from './service/booking/booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
