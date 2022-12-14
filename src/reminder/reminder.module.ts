import { Module } from '@nestjs/common';
import { ReminderController } from './controller/reminder/reminder.controller';
import { ReminderService } from './service/reminder/reminder.service';

@Module({
  controllers: [ReminderController],
  providers: [ReminderService]
})
export class ReminderModule {}
