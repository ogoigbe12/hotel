import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from 'src/typeorm/reminder.entities';
import { ReminderController } from './controller/reminder/reminder.controller';
import { ReminderService } from './service/reminder/reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder])],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
