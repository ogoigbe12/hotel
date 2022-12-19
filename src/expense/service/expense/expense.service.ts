import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { expensesDto } from 'src/expense/dto/expense.dto';
import { Employee } from 'src/typeorm/employee.entities';
import { expenseCreate } from 'src/typeorm/expense.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(expenseCreate)
    private expenseRepository: Repository<expenseCreate>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  async expenseCreated(id: number, expenseDetails: expensesDto) {
    const expenseNew = await this.expenseRepository.findOneBy({
      expenseName: expenseDetails.expenseName,
    });
    if (!expenseNew) {
      const expensToSave = await this.expenseRepository.save(expenseDetails);
      return expensToSave;
    }
  }
  async updateExpense(id: number, expenseDetails: expensesDto) {
    const newExpense = await this.expenseRepository.findOne({
      where: { id: id },
      relations: { employee: true },
    });
    if (newExpense) {
      return this.expenseRepository.update(
        { id: id },
        {
          expenseType: expenseDetails.expenseType,
          expenseName: expenseDetails.expenseName,
          expenseAmount: expenseDetails.expenseAmount,
        },
      );
    }
  }
  async getExpense() {
    return this.expenseRepository.find({ relations: ['employee'] });
  }
  async getExpenseById(id: number): Promise<expenseCreate> {
    return await this.expenseRepository.findOne({
      where: { id: id },
      relations: { employee: true },
    });
  }
  async deleteExpense(id: number) {
    const deleteOne = await this.expenseRepository.findOne({
      where: { id: id },
      relations: { employee: true },
    });
    if (!deleteOne)
      return new HttpException(
        'expense with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.expenseRepository.delete({ id: id });
  }
  async createExpense(
    id: number,
    expenseDetails: expensesDto,
  ): Promise<expenseCreate> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (employee) expenseDetails.employee = employee;
    const savdExpenses = await this.expenseRepository.save(expenseDetails);
    return savdExpenses;
  }
}
