import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/booking.entities';
import { Reminder } from 'src/typeorm/reminder.entities';
import { ReminderController } from './controller/reminder/reminder.controller';
import { ReminderService } from './service/reminder/reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder, Booking])],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
