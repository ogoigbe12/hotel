import { Module } from '@nestjs/common';
import { RoomService } from './service/room/room.service';
import { RoomController } from './controller/room/room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/typeorm/room.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
