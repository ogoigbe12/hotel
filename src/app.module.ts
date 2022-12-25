import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './typeorm/employee.entities';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './typeorm/customer.entities';
import { ItemsModule } from './items/items.module';
import { ItemsCreate } from './typeorm/items.entities';
import { ExpenseModule } from './expense/expense.module';
import { expenseCreate } from './typeorm/expense.entities';
import { OrderModule } from './order/order.module';
import { orderCreate } from './typeorm/order.entities';
import { ReminderModule } from './reminder/reminder.module';
import { BookingModule } from './booking/booking.module';
import { RoomModule } from './room/room.module';
import { RoomtypeModule } from './roomtype/roomtype.module';
import { Booking } from './typeorm/booking.entities';
import { Room } from './typeorm/room.entities';
import { roomType } from './typeorm/roomtype.entities';
import { Reminder } from './typeorm/reminder.entities';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      // connectTimeout: 30,
      entities: [
        Employee,
        Customer,
        ItemsCreate,
        expenseCreate,
        orderCreate,
        Booking,
        Room,
        roomType,
        Reminder,
      ],
      synchronize: true,
    }),
    EmployeeModule,
    CustomerModule,
    ItemsModule,
    ExpenseModule,
    OrderModule,
    ReminderModule,
    BookingModule,
    RoomModule,
    RoomtypeModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
