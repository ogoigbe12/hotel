import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bookingDto } from 'src/booking/dto/booking.dto';
import { Booking } from 'src/typeorm/booking.entities';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(bookingDetails: bookingDto) {
    const newBooking = await this.bookingRepository.findOneBy({
      checkIn: bookingDetails.checkIn,
    });
    if (!newBooking) {
      const bookingToSave = await this.bookingRepository.save(bookingDetails);
      return bookingToSave;
    }
  }

  async updateBooking(id: number, bookingDetails: bookingDto) {
    const newUpdate = await this.bookingRepository.findOne({
      where: { id: id },
      relations: { remind: true },
    });
    if (newUpdate) {
      return this.bookingRepository.update(
        { id: id },
        {
          bookingDate: bookingDetails.bookingDate,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
        },
      );
    }
  }
  async getBooking() {
    return this.bookingRepository.find({
      relations: ['room', 'customer'],
    });
  }
  async getBookingReminder() {
    return this.bookingRepository.find({ relations: { remind: true } });
  }
  async getbookReminderById(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { id: id },
      relations: { remind: true },
    });
  }
  async getBookingById(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { id: id },
      relations: { room: true, customer: true },
    });
  }
  async deleteBooking(id: number) {
    const deleteOne = await this.bookingRepository.findOne({
      where: { id: id },
      relations: { room: true, customer: true },
    });
    if (!deleteOne)
      return new HttpException(
        'booking with id was delete',
        HttpStatus.NOT_FOUND,
      );
    return this.bookingRepository.delete({ id: id });
  }
  async deleteReminder(id: number) {
    const deleteOne = await this.bookingRepository.findOne({
      where: { id: id },
      relations: { remind: true },
    });
    if (!deleteOne)
      return new HttpException(
        'booking with id was delete',
        HttpStatus.NOT_FOUND,
      );
    return this.bookingRepository.delete({ id: id });
  }
}
