import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthControllers } from './auth.controllers';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthControllers],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
