import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsCreate } from 'src/typeorm/items.entities';
import { orderCreate } from 'src/typeorm/order.entities';
import { ItemsController } from './controller/items/items.controller';
import { ItemsService } from './service/items/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsCreate, orderCreate])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
