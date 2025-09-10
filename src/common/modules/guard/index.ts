import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends PassportStrategy(BasicStrategy) {
  constructor() {
    super();
  }

  validate(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      return { username };
    }
    return null;
  }
}
