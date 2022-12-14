import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entities';

@Entity()
export class expenseCreate {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  expenseType: string;

  @Column('text')
  expenseName: string;

  expenseDate: number;
  @Column('text')
  expenseDescription: string;

  @Column()
  expenseAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @OneToOne(() => Employee)
  @JoinColumn()
  employees: Employee;
}
