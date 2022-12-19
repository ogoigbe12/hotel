import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { orderCreate } from './order.entities';

@Entity()
export class ItemsCreate {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  itemType: string;

  @Column('text')
  itemName: string;

  @Column()
  itemCost: number;

  @Column('text')
  itemDetails: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @OneToMany(() => orderCreate, (order) => order.items)
  order: orderCreate[];
}
