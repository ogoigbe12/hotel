import { IsNotEmpty } from 'class-validator';

export class reminderDto {
  @IsNotEmpty()
  reminderType: string;

  @IsNotEmpty()
  reminderDetails: string;
}
