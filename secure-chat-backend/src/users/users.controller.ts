import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('getId/:name')
  createUserId(@Param('name') name: string) {
    return this.usersService.createUserId(name);
  }
}
