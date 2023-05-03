import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { configs } from '../../common/configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configs.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hash;
    return user;
  }
}
