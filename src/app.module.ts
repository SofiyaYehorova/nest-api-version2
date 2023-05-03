import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetsModule } from './pets/pets.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, PetsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
