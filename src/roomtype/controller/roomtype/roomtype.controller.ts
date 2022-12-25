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
import { roomTypeDto } from 'src/roomtype/dto/roomtype.dto';
import { RoomtypeService } from 'src/roomtype/service/roomtype/roomtype.service';

@Controller('roomtype')
export class RoomtypeController {
  constructor(private roomTypeService: RoomtypeService) {}
  @Post(':id/room')
  @UsePipes(new ValidationPipe())
  async createType(@Body() roomTypeData: roomTypeDto, @Param('id') id: number) {
    const typeNew = await this.roomTypeService.createRoomType(id, roomTypeData);
    if (typeNew) return { msg: 'roomType was created with room id' };
    throw new HttpException('cannot perform action', HttpStatus.BAD_REQUEST);
  }
  @Patch(':id')
  async roomPatched(
    @Param('id') id: number,
    @Body() roomTypeData: roomTypeDto,
  ) {
    const updated = await this.roomTypeService.updateRoomType(id, roomTypeData);
    if (!updated)
      throw new HttpException('room not found', HttpStatus.NOT_FOUND);
    return updated;
  }
  @Get()
  async roomType() {
    const all = await this.roomTypeService.getRoomType();
    if (all) return all;
    throw new HttpException('roomType not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    const oneRoomType = await this.roomTypeService.getOneroomType(id);
    if (!oneRoomType)
      throw new HttpException('roomType does not exit', HttpStatus.NOT_FOUND);
    return oneRoomType;
  }
  @Delete(':id')
  async deleteRoomType(@Param('id') id: number) {
    const roomType = await this.roomTypeService.deleteRoomType(id);
    return roomType;
  }
}
