import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entities';

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

  @OneToOne(() => User)
  @JoinColumn()
  users: User;
}
