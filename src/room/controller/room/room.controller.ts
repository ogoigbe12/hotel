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
import { roomDto } from 'src/room/dto/room.dto';
import { RoomService } from 'src/room/service/room/room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Post(':id/booking')
  @UsePipes(new ValidationPipe())
  async createdRoom(@Body() roomData: roomDto, @Param('id') id: number) {
    const newRoom = await this.roomService.createRoom(id, roomData);
    if (newRoom) return { msg: 'room request was created with booking id' };
    throw new HttpException(
      'sorry cannot perform action',
      HttpStatus.BAD_REQUEST,
    );
  }
  @Patch(':id')
  async roomPatched(@Param('id') id: number, @Body() roomData: roomDto) {
    const updated = await this.roomService.updateRoom(id, roomData);

    if (!updated)
      throw new HttpException('room not found', HttpStatus.NOT_FOUND);
    return updated;
  }
  @Get()
  async allAllRoom() {
    const allRoom = this.roomService.getRoom();
    if (allRoom) return allRoom;
    throw new HttpException('room not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getRoomById(@Param('id') id: number) {
    const oneRoom = await this.roomService.getRoomById(id);
    if (!oneRoom)
      throw new HttpException('room does not exit', HttpStatus.NOT_FOUND);
    return oneRoom;
  }
  @Delete(':id')
  async deleteRoom(@Param('id') id: number) {
    const deleted = await this.roomService.deleteRoom(id);
    return deleted;
  }
}
