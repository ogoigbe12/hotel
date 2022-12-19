import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class roomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomType: string;

  @Column('text')
  description: string;

  @Column('float')
  cost: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;
}
