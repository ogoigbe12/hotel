import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { roomDto } from 'src/room/dto/room.dto';
import { Booking } from 'src/typeorm/booking.entities';
import { Room } from 'src/typeorm/room.entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  async createRoom(id: number, roomDetails: roomDto): Promise<Room> {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (booking) roomDetails.booking = booking;
    const savedRoom = await this.roomRepository.save(roomDetails);
    return savedRoom;
  }
  async updateRoom(id: number, roomDetails: roomDto) {
    const newRoom = await this.roomRepository.findOne({
      where: { id: id },
      relations: { booking: true },
    });
    if (newRoom) {
      return this.roomRepository.update(
        { id: id },
        {
          roomNumber: roomDetails.roomNumber,
          description: roomDetails.description,
        },
      );
    }
  }
  async getRoom() {
    return await this.roomRepository.find({ relations: ['booking'] });
  }
  async getRoomById(id: number): Promise<Room> {
    return await this.roomRepository.findOne({
      where: { id: id },
      relations: { booking: true },
    });
  }
  async deleteRoom(id: number) {
    const deleteOne = await this.roomRepository.findOne({
      where: { id: id },
      relations: { booking: true },
    });
    if (!deleteOne)
      return new HttpException(
        'room with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.roomRepository.delete({ id: id });
  }
}
