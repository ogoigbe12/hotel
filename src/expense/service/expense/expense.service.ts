import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { expensesDto } from 'src/expense/dto/expense.dto';
import { expenseCreate } from 'src/typeorm/expense.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(expenseCreate)
    private expenseRepository: Repository<expenseCreate>,
  ) {}
  async expenseCreated(expenseDetails: expensesDto) {
    const expenseNew = await this.expenseRepository.findOneBy({
      expenseName: expenseDetails.expenseName,
    });

    if (!expenseNew) {
      const expenseToSave = await this.expenseRepository.save(expenseDetails);
      return expenseToSave;
    }
  }
  async updateExpense(id: number, expenseDetails: expensesDto) {
    const newExpense = await this.expenseRepository.update(
      {
        id: id,
      },
      expenseDetails,
    );
    return newExpense;
  }
  async getExpense() {
    return this.expenseRepository.find({});
  }
  async getExpenseById(id: number): Promise<expenseCreate> {
    return await this.expenseRepository.findOneBy({ id: id });
  }
  async deleteExpense(id: number) {
    const deleteOne = await this.expenseRepository.findOneBy({ id: id });
    if (!deleteOne)
      return new HttpException(
        'expense with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.expenseRepository.delete({ id: id });
  }
}
