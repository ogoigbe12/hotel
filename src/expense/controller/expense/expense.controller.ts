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
import { expensesDto } from 'src/expense/dto/expense.dto';
import { ExpenseService } from 'src/expense/service/expense/expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async newExpense(@Param('id') id: number, @Body() expenseData: expensesDto) {
    const expense = await this.expenseService.expenseCreated(id, expenseData);
    if (expense) return { msg: 'expense created' };
    return new HttpException('expense already exits', HttpStatus.BAD_REQUEST);
  }
  @Patch(':id')
  async expensePatched(
    @Param('id') id: number,
    @Body() expenseData: expensesDto,
  ) {
    const updated = await this.expenseService.updateExpense(id, expenseData);
    if (!updated)
      throw new HttpException('expense does not exits', HttpStatus.BAD_REQUEST);
    return updated;
  }
  @Get()
  async getAllExpense() {
    const allExpense = this.expenseService.getExpense();
    if (allExpense) return allExpense;
    throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getExpenseById(@Param('id') id: number) {
    const getOneExpense = await this.expenseService.getExpenseById(id);
    if (!getOneExpense)
      throw new HttpException('expense does not exits', HttpStatus.NOT_FOUND);
    return getOneExpense;
  }
  @Delete(':id')
  async deleteExpense(@Param('id') id: number) {
    const deleted = await this.expenseService.deleteExpense(id);
    return deleted;
  }
  @Post(':id/employee')
  @UsePipes(new ValidationPipe())
  async expenseCreated(
    @Body() expenseData: expensesDto,
    @Param('id') id: number,
  ) {
    const expense = await this.expenseService.createExpense(id, expenseData);
    if (expense) return { msg: 'relation created' };
    throw new HttpException('relation does not exit', HttpStatus.BAD_REQUEST);
  }
}
