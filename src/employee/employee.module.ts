import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeService } from './service/empolyee/employee.service';
import { EmployeeController } from './controller/employee/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/typeorm/employee.entities';
import { EmployeeMiddleware } from './middleware/user/employee.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      secret: 'process.env.SECRET',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmployeeMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.ALL });
  }
}
