import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderDto } from 'src/order/dto/order.dto';
import { ItemsCreate } from 'src/typeorm/items.entities';
import { orderCreate } from 'src/typeorm/order.entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(orderCreate)
    private orderRepository: Repository<orderCreate>,
    @InjectRepository(ItemsCreate)
    private itemRepository: Repository<ItemsCreate>,
  ) {}
  async createOrder(id: number, orderDetails: orderDto): Promise<orderCreate> {
    const item = await this.itemRepository.findOneBy({ id });
    if (item) orderDetails.items = item;
    const savedOrder = await this.orderRepository.save(orderDetails);
    return savedOrder;
  }
  async updateOrder(id: number, orderDetails: orderDto) {
    const newOrder = await this.orderRepository.findOne({
      where: { id: id },
      relations: { items: true },
    });
    if (newOrder) {
      return this.orderRepository.update(
        { id: id },
        {
          orderDate: orderDetails.orderDate,
          Qty: orderDetails.Qty,
          Cost: orderDetails.Cost,
        },
      );
    }
  }
  async getOrders() {
    return await this.orderRepository.find({ relations: ['items'] });
  }
  async getOrderById(id: number): Promise<orderCreate> {
    return await this.orderRepository.findOne({
      where: { id: id },
      relations: { items: true },
    });
  }
  async deleteOrder(id: number) {
    const deleteOne = await this.orderRepository.findOne({
      where: { id: id },
      relations: { items: true },
    });
    if (!deleteOne)
      return new HttpException(
        'order with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.orderRepository.delete({ id: id });
  }
}
