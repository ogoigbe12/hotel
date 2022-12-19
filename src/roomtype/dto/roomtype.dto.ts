import { IsNotEmpty } from 'class-validator';

export class roomTypeDto {
  @IsNotEmpty()
  roomType: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  cost: number;
}
