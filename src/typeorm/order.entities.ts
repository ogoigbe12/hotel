import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemsCreate } from './items.entities';

@Entity()
export class orderCreate {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('date')
  orderDate: number;

  @Column('float')
  Qty: string;

  @Column('float')
  Cost: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @ManyToOne(() => ItemsCreate, (items) => items.order)
  items: ItemsCreate;
}
