import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { expenseCreate } from 'src/typeorm/expense.entities';
import { ExpenseController } from './controller/expense/expense.controller';
import { ExpenseService } from './service/expense/expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([expenseCreate])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule { }
