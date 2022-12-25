import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entities';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  customerName: string;

  @Column()
  address: string;

  @Column('bigint')
  contactNo: number;

  @Column()
  gender: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @ManyToOne(() => Booking, (booking) => booking.customer)
  booking: Booking;
}
