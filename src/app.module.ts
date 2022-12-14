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
      entities: [Employee, Customer, ItemsCreate, expenseCreate, orderCreate],
      synchronize: true,
    }),
    EmployeeModule,
    CustomerModule,
    ItemsModule,
    ExpenseModule,
    OrderModule,
    ReminderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
