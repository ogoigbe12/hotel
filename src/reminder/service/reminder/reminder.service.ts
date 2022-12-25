import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bookingDto } from 'src/booking/dto/booking.dto';
import { reminderDto } from 'src/reminder/dto/reminder.dto';
import { Booking } from 'src/typeorm/booking.entities';
import { Reminder } from 'src/typeorm/reminder.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}
  async getReminder() {
    return this.reminderRepository.find();
  }
  async createReminder(id: number, reminderDetails: reminderDto) {
    const newBooking = await this.bookingRepository.findOneBy({ id });
    if (newBooking) reminderDetails.book_remind = newBooking;
    const saveReminder = await this.reminderRepository.save(reminderDetails);
    return saveReminder;
  }
  async deleted(id: number) {
    const deleteOne = await this.reminderRepository.findOneBy({ id: id });
    if (!deleteOne)
      return new HttpException(
        'reminder with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.reminderRepository.delete({ id: id });
  }
}
