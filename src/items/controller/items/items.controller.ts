import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
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

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createNew(@Body() itemData: itemsDto) {
    const newItem = await this.itemsService.createItem(itemData);
    if (newItem) return { msg: 'item created' };
    return new HttpException('item already exit', HttpStatus.BAD_REQUEST);
  }
  @Get()
  async getAllItem(@Query() filterItemDto: FilterItem) {
    if (Object.keys(filterItemDto).length) {
      const filterItem = await this.itemsService.filterItem(filterItemDto);
      return filterItem;
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
