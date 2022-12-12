import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderCreate } from 'src/typeorm/order.entities';

@Module({
  imports: [TypeOrmModule.forFeature([orderCreate])],
})
export class OrderModule { }
