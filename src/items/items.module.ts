import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from 'src/Typeorm/items.entities';
import { ItemsController } from './controller/items/items.controller';
import { ItemsService } from './service/items/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Items])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
