import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
