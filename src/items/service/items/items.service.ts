import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterItem } from 'src/items/Dto/filter.item.dto';
import { itemsDto } from 'src/items/Dto/items.dto';
import { ItemsCreate } from 'src/typeorm/items.entities';
// import { ItemsEntity } from 'src/Typeorm/items.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsCreate)
    private itemRepository: Repository<ItemsCreate>,
  ) {}
  async itemCreate(detailItem: itemsDto) {
    const item = await this.itemRepository.findOneBy({
      itemName: detailItem.itemName,
    });
    if (!item) {
      const itemToSave = await this.itemRepository.save(detailItem);
      return itemToSave;
    }
  }
  async itemUpdated(id: number, valideteItem: itemsDto) {
    const newExpense = await this.itemRepository.update(
      {
        id: id,
      },
      valideteItem,
    );
    return newExpense;
  }
  async getFilter(filterDTO: FilterItem): Promise<ItemsCreate[]> {
    const { itemName, search } = filterDTO;
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
  async getItemById(id: number): Promise<ItemsCreate> {
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
