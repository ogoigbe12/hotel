import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
