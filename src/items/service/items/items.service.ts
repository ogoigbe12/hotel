import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterItem } from 'src/items/Dto/filter.item.dto';
import { itemsDto } from 'src/items/Dto/items.dto';
import { Items } from 'src/Typeorm/item.entity';
// import { ItemsEntity } from 'src/Typeorm/items.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private itemRepository: Repository<Items>,
  ) {}
  async createItem(itemDetails: itemsDto) {
    const newItem = await this.itemRepository.findOneBy({
      itemName: itemDetails.itemName,
    });
    if (!newItem) {
      const itemToSave = await this.itemRepository.save(itemDetails);
      return itemToSave;
    }
  }
  async filterItem(filterItemDto: FilterItem): Promise<Items[]> {
    const { itemName, search } = filterItemDto;
    let items = await this.getItem();

    if (search) {
      items = items.filter(
        (item) =>
          item.itemType.includes(search) || item.itemDetails.includes(search),
      );
    }
    if (itemName) {
      items = items.filter((item) => item.itemName === itemName);
    }
    return items;
  }
  async getItem() {
    return this.itemRepository.find({});
  }
  async getItemById(id: number): Promise<Items> {
    return await this.itemRepository.findOneBy({ id: id });
  }
  async deleteItem(id: number) {
    const deleteOne = await this.itemRepository.findOneBy({ id: id });
    if (!deleteOne)
      return new HttpException(
        'Item with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.itemRepository.delete({ id: id });
  }
}
