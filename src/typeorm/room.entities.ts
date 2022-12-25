import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entities';
import { roomType } from './roomtype.entities';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('int')
  roomNumber: number;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @ManyToOne(() => Booking, (booking) => booking.room)
  booking: Booking;

  @OneToMany(() => roomType, (roomType) => roomType.room)
  roomType: roomType[];
}
