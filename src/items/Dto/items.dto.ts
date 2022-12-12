import { IsNotEmpty } from 'class-validator';

export class itemsDto {
  @IsNotEmpty()
  itemType: string;

  @IsNotEmpty()
  itemName: string;

  @IsNotEmpty()
  itemCost: number;

  itemDetails: string;
}
