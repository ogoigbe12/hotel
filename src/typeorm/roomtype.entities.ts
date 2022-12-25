import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entities';

@Entity()
export class roomType {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  roomType: string;

  @Column('text')
  description: string;

  @Column('float')
  cost: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @ManyToOne(() => Room, (room) => room.roomType)
  room: Room;
}
