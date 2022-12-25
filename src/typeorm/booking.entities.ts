import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entities';
import { Reminder } from './reminder.entities';
import { Room } from './room.entities';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('date')
  bookingDate: string;

  @Column('datetime')
  checkIn: string;

  @Column('datetime')
  checkOut: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;
  book: Reminder[];

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @OneToMany(() => Room, (room) => room.booking)
  room: Room[];

  @OneToMany(() => Customer, (customer) => customer.booking)
  customer: Customer[];

  @OneToOne(() => Reminder)
  @JoinColumn()
  remind: Reminder;
}
