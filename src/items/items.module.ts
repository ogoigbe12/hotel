import { Module } from '@nestjs/common';
import { ItemsController } from './controller/items/items.controller';
import { ItemsService } from './service/items/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
