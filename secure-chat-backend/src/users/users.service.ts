import { Injectable } from '@nestjs/common';
import { generate } from 'shortid';
@Injectable()
export class UsersService {
  createUserId(username: string): string {
    return `${username}-${generate()}`;
  }
}
