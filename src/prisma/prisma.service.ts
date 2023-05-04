import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { configs } from '../common/configs';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: configs.DATABASE_URL,
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([this.pets.deleteMany(), this.user.deleteMany()]);
  }
}
