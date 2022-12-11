import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/Typeorm/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
})
export class BookingModule {}
