import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/typeorm/room.entities';
import { roomType } from 'src/typeorm/roomtype.entities';
import { RoomtypeController } from './controller/roomtype/roomtype.controller';
import { RoomtypeService } from './service/roomtype/roomtype.service';

@Module({
  imports: [TypeOrmModule.forFeature([roomType, Room])],
  controllers: [RoomtypeController],
  providers: [RoomtypeService],
})
export class RoomtypeModule {}
