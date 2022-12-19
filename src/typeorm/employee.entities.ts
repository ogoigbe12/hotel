import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { expenseCreate } from './expense.entities';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => expenseCreate, (expenses) => expenses.employee)
  expenses: expenseCreate[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;
}
