import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { bookingDto } from 'src/booking/dto/booking.dto';
import { BookingService } from 'src/booking/service/booking/booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @Post('book')
  @UsePipes(new ValidationPipe())
  async newBooking(@Body() bookingData: bookingDto) {
    const booking = await this.bookingService.createBooking(bookingData);
    if (booking) return { msg: 'booking created' };
    return new HttpException('booking already exit', HttpStatus.BAD_REQUEST);
  }
  @Patch(':id')
  async patchedBooking(
    @Body() bookingData: bookingDto,
    @Param('id') id: number,
  ) {
    const updated = await this.bookingService.updateBooking(id, bookingData);
    if (!updated)
      throw new HttpException('customer does not exit', HttpStatus.BAD_REQUEST);
    return updated;
  }
  @Get()
  async getAllBooking() {
    const allBooking = this.bookingService.getBooking();
    if (allBooking) return allBooking;
    throw new HttpException('booking not found', HttpStatus.NOT_FOUND);
  }
  @Get('remind')
  async getRemindBooking() {
    const allBooking = this.bookingService.getBookingReminder();
    if (allBooking) return allBooking;
    throw new HttpException('booking not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id/remind')
  async getRemindById(@Param('id') id: number) {
    const getRemind = await this.bookingService.getbookReminderById(id);
    if (!getRemind)
      throw new HttpException(
        'relation id has be deleted',
        HttpStatus.NOT_FOUND,
      );
    return getRemind;
  }
  @Get(':id')
  async getBookingById(@Param('id') id: number) {
    const getBooking = await this.bookingService.getBookingById(id);
    if (!getBooking)
      throw new HttpException('booking has be deleted', HttpStatus.NOT_FOUND);
    return getBooking;
  }
  @Delete(':id')
  async deleted(@Param('id') id: number) {
    const deletedBooking = await this.bookingService.deleteBooking(id);
    return deletedBooking;
  }
  @Delete(':id/remind')
  async delete(@Param('id') id: number) {
    const deleteRemind = await this.bookingService.deleteReminder(id);
    return deleteRemind;
  }
}
