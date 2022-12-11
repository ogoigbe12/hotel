import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Typeorm/user.entities';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './Typeorm/customer.entities';
import { ItemsModule } from './items/items.module';
// import { ItemsEntity } from './Typeorm/items.entities';
import { BookingModule } from './booking/booking.module';
import { Booking } from './Typeorm/booking.entity';
import { RoomModule } from './room/room.module';
import { Room } from './Typeorm/room.entity';
import { Items } from './Typeorm/item.entity';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [User, Customer, Items, Booking, Room],
      synchronize: true,
    }),
    UserModule,
    CustomerModule,
    ItemsModule,
    BookingModule,
    RoomModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
