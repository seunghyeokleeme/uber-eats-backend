import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { JWT_OPTIONS } from './jwt.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  hello() {
    console.log('hello');
  }
}
