import { User } from '@prisma/client';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  async getMe(@GetUser() user: User) {
    return user;
  }
}
