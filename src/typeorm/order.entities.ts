import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class orderCreate {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  itemType: string;

  @Column()
  itemName: string;

  @Column()
  itemCost: number;

  @Column()
  itemDetails: string;
}
