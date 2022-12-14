import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/typeorm/employee.entities';
import { Repository } from 'typeorm';
declare module 'express-serve-static-core' {
  interface Request {
    decoded?: any;
  }
}

@Injectable()
export class EmployeeMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Employee) private userRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.baseUrl, req.method);

    const token = req.headers.authorization;
    if (token) {
      const noBearer = token.replace(/Bearer\s/gi, '');
      const decoded = this.jwtService.verify(noBearer, {
        secret: 'process.env.SECRET',
      });
      const user = await this.userRepository.findBy({ email: decoded.id });
      if (!user) return res.status(200).json({ msg: 'invalivid Token' });
      req.decoded = decoded;
      console.log(req.decoded);

      return next();
    }
    return res.status(404).json({ msg: 'authorization token not dound' });
  }
}
