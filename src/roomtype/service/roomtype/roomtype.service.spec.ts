import { Test, TestingModule } from '@nestjs/testing';
import { RoomtypeService } from './roomtype.service';

describe('RoomtypeService', () => {
  let service: RoomtypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomtypeService],
    }).compile();

    service = module.get<RoomtypeService>(RoomtypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
