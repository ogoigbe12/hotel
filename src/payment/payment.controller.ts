import { Body, Controller, Post } from '@nestjs/common';
import { Book } from './booking.model';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  checkOut(@Body() body: { book: Book }) {
    try {
      return this.paymentService.checkout(body.book);
    } catch (error) {
      return error;
    }
  }
}
