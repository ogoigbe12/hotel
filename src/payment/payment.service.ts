import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { Book } from './booking.model';
@Injectable()
export class PaymentService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.PAYMENT_KEY, {
      apiVersion: '2022-11-15',
    });
  }
  checkout(book: Book) {
    const totalPrice = book.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    return this.stripe.paymentIntents.create({
      amount: totalPrice * 1,
      currency: 'usd',
      payment_method_types: ['card'],
    });
  }
}
