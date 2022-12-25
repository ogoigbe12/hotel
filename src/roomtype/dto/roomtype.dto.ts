import { IsNotEmpty } from 'class-validator';
import { Room } from 'src/typeorm/room.entities';

export class roomTypeDto {
  @IsNotEmpty()
  roomType: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  cost: number;

  room: Room;
}
