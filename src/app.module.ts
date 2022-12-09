import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Typeorm/user.entities';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './Typeorm/customer.entities';
import { ItemsModule } from './items/items.module';

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
      entities: [User, Customer],
      synchronize: true,
    }),
    UserModule,
    CustomerModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
