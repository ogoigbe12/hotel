import { IsNotEmpty } from 'class-validator';
import { Employee } from 'src/typeorm/employee.entities';

export class expensesDto {
  @IsNotEmpty()
  expenseType: string;

  @IsNotEmpty()
  expenseName: string;

  expenseDescription: string;

  @IsNotEmpty()
  expenseAmount: number;

  employee: Employee;
}
