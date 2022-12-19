import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  reminderType: string;

  @Column('text')
  reminderDetails: string;

  @Column('datetime')
  due: number;
}
