import { IsNotEmpty } from 'class-validator';

export class roomDto {
  @IsNotEmpty()
  roomNumber: number;

  @IsNotEmpty()
  description: string;
}
