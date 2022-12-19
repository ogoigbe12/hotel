import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderCreate } from 'src/typeorm/order.entities';
import { OrderController } from './controller/order/order.controller';
import { OrderService } from './service/order/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([orderCreate])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
