import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class orderCreate {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('date')
  orderDate: string;

  @Column('float')
  Qty: string;

  @Column('float')
  Cost: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;
}
