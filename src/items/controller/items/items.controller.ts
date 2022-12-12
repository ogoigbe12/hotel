import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilterItem } from 'src/items/Dto/filter.item.dto';
import { itemsDto } from 'src/items/Dto/items.dto';
import { ItemsService } from 'src/items/service/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post('new')
  @UsePipes(new ValidationPipe())
  async newItem(@Body() itemData: itemsDto) {
    const items = await this.itemsService.itemCreate(itemData);
    if (items) return { msg: 'item created' };
    return new HttpException('item already exit', HttpStatus.BAD_REQUEST);
  }
  @Patch(':id')
  async expensePatched(@Param('id') id: number, @Body() expenseData: itemsDto) {
    const updated = await this.itemsService.itemUpdated(id, expenseData);
    if (!updated)
      throw new HttpException('expense does not exits', HttpStatus.BAD_REQUEST);
    return updated;
  }
  @Get()
  async getItem(@Query() filterDto: FilterItem) {
    if (filterDto) {
      const filter = await this.itemsService.getFilter(filterDto);
      return filter;
    } else {
      const allItem = await this.itemsService.getItem();
      return allItem;
    }
  }
  @Get(':id')
  async getItemWithId(@Param('id') id: number) {
    const getItem = await this.itemsService.getItemById(id);
    if (!getItem)
      throw new HttpException('Item was not found', HttpStatus.NOT_FOUND);
    return getItem;
  }
  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    const deleted = await this.itemsService.deleteItem(id);
    return deleted;
  }
}
