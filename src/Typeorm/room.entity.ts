import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
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
}
