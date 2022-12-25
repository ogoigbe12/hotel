import { IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entities';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  reminderType: string;

  @Column('text')
  reminderDetails: string;

  @Column('datetime')
  due: string;

  // @OneToMany(() => Booking, (book_remind) => book_remind.reminder)
  // book_remind: Booking[];

  // @OneToOne(() => Booking)
  // @JoinColumn()
  // booking: Booking;
}
