import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { roomTypeDto } from 'src/roomtype/dto/roomtype.dto';
import { Room } from 'src/typeorm/room.entities';
import { roomType } from 'src/typeorm/roomtype.entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoomtypeService {
  constructor(
    @InjectRepository(roomType)
    private roomTypeRepository: Repository<roomType>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async createRoomType(
    id: number,
    roomTypeDetails: roomTypeDto,
  ): Promise<roomType> {
    const newRoomType = await this.roomRepository.findOneBy({ id });
    if (newRoomType) roomTypeDetails.room = newRoomType;
    const saveRoomType = await this.roomTypeRepository.save(roomTypeDetails);
    return saveRoomType;
  }
  async updateRoomType(id: number, roomTypeDetails: roomTypeDto) {
    const newUpdate = await this.roomTypeRepository.findOne({
      where: { id: id },
      relations: { room: true },
    });
    if (newUpdate) {
      return this.roomTypeRepository.update(
        { id: id },
        {
          roomType: roomTypeDetails.roomType,
          cost: roomTypeDetails.cost,
          description: roomTypeDetails.description,
        },
      );
    }
  }
  async getRoomType() {
    return await this.roomTypeRepository.find({ relations: ['room'] });
  }
  async getOneroomType(id: number) {
    return await this.roomTypeRepository.findOne({
      where: { id: id },
      relations: { room: true },
    });
  }
  async deleteRoomType(id: number) {
    const deleteOne = await this.roomTypeRepository.findOne({
      where: { id: id },
      relations: { room: true },
    });
    if (deleteOne)
      return new HttpException(
        'roomType id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.roomTypeRepository.delete({ id: id });
  }
}
