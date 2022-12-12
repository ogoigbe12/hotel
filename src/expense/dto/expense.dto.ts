import { IsNotEmpty } from 'class-validator';

export class expensesDto {
  @IsNotEmpty()
  expenseType: string;

  @IsNotEmpty()
  expenseName: string;

  expenseDescription: string;

  @IsNotEmpty()
  expenseAmount: number;
}
