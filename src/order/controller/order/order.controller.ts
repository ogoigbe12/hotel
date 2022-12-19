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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { orderDto } from 'src/order/dto/order.dto';
import { OrderService } from 'src/order/service/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post(':id/items')
  @UsePipes(new ValidationPipe())
  async orderCreated(@Body() orderData: orderDto, @Param('id') id: number) {
    const order = await this.orderService.createOrder(id, orderData);
    if (order) return { msg: 'order made with item' };
    throw new HttpException(
      'sorry cannot parform action',
      HttpStatus.BAD_REQUEST,
    );
  }
  @Patch(':id')
  async orderPatched(@Param('id') id: number, @Body() orderData: orderDto) {
    const updated = await this.orderService.updateOrder(id, orderData);
    if (!updated)
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    return updated;
  }
  @Get()
  async getAllOrder() {
    const allOrder = this.orderService.getOrders();
    if (allOrder) return allOrder;
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    const getOneOrder = await this.orderService.getOrderById(id);
    if (!getOneOrder)
      throw new HttpException('order does not exit', HttpStatus.NOT_FOUND);
    return getOneOrder;
  }
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    const deleted = await this.orderService.deleteOrder(id);
    return deleted;
  }
}
