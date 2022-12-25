import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/booking.entities';
import { Customer } from 'src/typeorm/customer.entities';
import { CustomerController } from './controller/customer/customer.controller';
import { CustomerService } from './service/customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Booking])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
