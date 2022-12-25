import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { reminderDto } from 'src/reminder/dto/reminder.dto';
import { ReminderService } from 'src/reminder/service/reminder/reminder.service';

@Controller('reminder')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}
  @Post(':id/booking')
  @UsePipes(new ValidationPipe())
  async createType(@Body() reminderData: reminderDto, @Param('id') id: number) {
    const typeNew = await this.reminderService.createReminder(id, reminderData);
    if (typeNew) return { msg: 'booking created with reminder' };
    throw new HttpException('cannot perform action', HttpStatus.BAD_REQUEST);
  }
  @Get()
  async roomType() {
    const all = await this.reminderService.getReminder();
    if (all) return all;
    throw new HttpException('reminder not found', HttpStatus.NOT_FOUND);
  }
  @Delete(':id')
  async deleteRemind(@Param('id') id: number) {
    const oneDelete = await this.reminderService.deleted(id);
    return oneDelete;
  }
}
