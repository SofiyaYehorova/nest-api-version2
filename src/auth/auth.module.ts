import { Module } from '@nestjs/common';

import { AuthControllers } from './auth.controllers';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthControllers],
  providers: [AuthService],
})
export class AuthModule {}
